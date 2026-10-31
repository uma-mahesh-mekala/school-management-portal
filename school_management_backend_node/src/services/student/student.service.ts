import { FastifyInstance } from 'fastify';
import { Prisma, Course, StudentCourse } from '@prisma/client';
import { AuthService } from '../auth/auth.service.js';
import { buildPagingResult } from '../../utils/pagination.js';
import { ROLES, REDIS_KEYS, REDIS_TTL } from '../../configs/app.constants.js';
import { CourseService } from '../course/course.service.js';

export interface StudentRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  dateOfJoining: string;
}

export class StudentService {
  private authService: AuthService;
  private courseService: CourseService;

  constructor(private fastify: FastifyInstance) {
    this.authService = new AuthService(fastify);
    this.courseService = new CourseService(fastify);
  }

  async addStudent(dto: StudentRequestDTO) {
    const student = await this.fastify.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newStudent = await tx.student.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          dateOfBirth: new Date(dto.dateOfBirth),
          dateOfJoining: new Date(dto.dateOfJoining)
        }
      });

      // Automatically create AppUser for student
      await this.authService.createUser(dto.email, 'Welcome@123', ROLES.STUDENT);

      this.fastify.invalidateCache("students")
      return newStudent;
    });

    return { statusCode: 200, body: this.formatStudentDTO(student) };
  }

  async getAllStudents(page: number = 0, size: number = 10) {
    this.fastify.log.trace(`getAllStudents: service - starts`)

    const cacheKey = `${REDIS_KEYS.STUDENTS_PREFIX}:p:${page}:s:${size}`

    if(this.fastify.cacheClient.has(cacheKey)) {
      this.fastify.log.trace(`getAllStudents:service - cachehit`);
      const students = this.fastify.cacheClient.get(cacheKey);
      return {
        statusCode: 200,
        body: JSON.parse(students)
      }
    }

    this.fastify.log.trace(`getAllStudents:service - cachemiss fetching from DB`);
    const skip = page * size;
    const [students, totalElements] = await Promise.all([
      this.fastify.prisma.student.findMany({
        skip,
        take: size,
        orderBy: { firstName: 'asc' }
      }),
      this.fastify.prisma.student.count()
    ]);

    const content = students.map((s: any) => this.formatStudentDTO(s));
    const result = buildPagingResult(content, totalElements, page, size);

    this.fastify.cacheClient.set(cacheKey, JSON.stringify(result));
    return { statusCode: 200, body: result };
  }

  async getStudentById(id: number) {
    const student = await this.fastify.prisma.student.findUnique({
      where: { id }
    });

    if (!student) {
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.STUDENT_NOT_FOUND);
      return {
        statusCode: 404,
        body: error
      };
    }

    return { statusCode: 200, body: this.formatStudentDTO(student) };
  }

  async updateStudent(id: number, dto: StudentRequestDTO) {
    const updated = await this.fastify.prisma.student.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        dateOfBirth: new Date(dto.dateOfBirth),
        dateOfJoining: new Date(dto.dateOfJoining)
      }
    });

    this.fastify.invalidateCache("students")

    return { statusCode: 200, body: this.formatStudentDTO(updated) };
  }

  async deleteStudent(id: number) {
    try {
      await this.fastify.prisma.student.delete({
        where: { id }
      });

      this.fastify.invalidateCache("students")

    } catch (error) {
      const e = await this.fastify.getErrorMessage(this.fastify.errorConstants.STUDENT_NOT_FOUND);
      return {
        statusCode: 404,
        body: e
      };
    }
    return { statusCode: 200, body: { success: true } };
  }

  async enrollStudentInCourse(email: string, courseId: number) {
    const student = await this.fastify.prisma.student.findUnique({
      where: { email }
    });

    if (!student) {
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.STUDENT_NOT_FOUND);
      return { statusCode: 404, body: error };
    }

    const course = await this.fastify.prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.COURSE_NOT_FOUND);
      return { statusCode: 404, body: error };
    }

    await this.fastify.prisma.studentCourse.upsert({
      where: {
        studentId_courseId: {
          studentId: student.id,
          courseId
        }
      },
      create: {
        studentId: student.id,
        courseId
      },
      update: {}
    });

    // Redis cache update for student enrolled set
    if (this.fastify.redis) {
      const redisKey = `${REDIS_KEYS.STUDENT_ENROLLED_PREFIX}:${student.id}`;
      await this.fastify.redis.sadd(redisKey, courseId.toString());
      await this.fastify.redis.expire(redisKey, REDIS_TTL.STUDENT_ENROLLED);
    }
    return { statusCode: 200, body: { success: true } };
  }

  async unEnrollStudentInCourse(email: string, courseId: number) {
    const student = await this.fastify.prisma.student.findUnique({
      where: { email }
    });

    if (!student) {
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.STUDENT_NOT_FOUND);
      return { statusCode: 404, body: error };
    }

    await this.fastify.prisma.studentCourse.deleteMany({
      where: {
        studentId: student.id,
        courseId
      }
    });

    // Redis cache update
    if (this.fastify.redis) {
      const redisKey = `${REDIS_KEYS.STUDENT_ENROLLED_PREFIX}:${student.id}`;
      await this.fastify.redis.srem(redisKey, courseId.toString());
    }
    return { statusCode: 200, body: { success: true } };
  }

  async getCoursesForStudent(email: string, search?: string, page: number = 0, size: number = 10) {
    const student = await this.fastify.prisma.student.findUnique({
      where: { email },
      include: {
        courses: true
      }
    });

    if (!student) {
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.STUDENT_NOT_FOUND);
      return { statusCode: 404, body: error };
    }

    let enrolledCourseIds: Set<number>;

    // Try fetching from Redis first
    const cacheKey = `${REDIS_KEYS.STUDENT_ENROLLED_PREFIX}:${student.id}`;
    if (this.fastify.cacheClient) {
      this.fastify.log.trace(`getCoursesForStudents:service - searching in cache for ${cacheKey}`)
      const cachedIds: string[] = await this.fastify.cacheClient.get(cacheKey);
      if (cachedIds && cachedIds.length > 0) {
        this.fastify.log.trace(`getCoursesForStudents:service - cachehit for ${cacheKey}`)

        enrolledCourseIds = new Set(cachedIds.map(id => parseInt(id, 10)));
      } else {
        this.fastify.log.trace(`getCoursesForStudents:service - cachemiss for ${cacheKey}`)

        enrolledCourseIds = new Set(student.courses.map((c: StudentCourse) => c.courseId));
        if (enrolledCourseIds.size > 0) {
          await this.fastify.cacheClient.set(cacheKey, [...Array.from(enrolledCourseIds).map(id => id.toString())]);
        }
      }
    } else {
      enrolledCourseIds = new Set(student.courses.map((c: StudentCourse) => c.courseId));
    }

    const courses = await this.courseService.fetchAllCourses(search, page, size);
    const {totalElements} = courses.body;

    const content = courses.body.content.map((course: Course) => ({
      id: course.id,
      courseName: course.courseName,
      credits: Number(course.credits),
      enrolled: enrolledCourseIds.has(course.id)
    }));

    return { statusCode: 200, body: buildPagingResult(content, totalElements, page, size) };
  }

  private formatStudentDTO(student: any) {
    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      fullName: `${student.firstName} ${student.lastName}`.trim(),
      dateOfBirth: student.dateOfBirth instanceof Date ? student.dateOfBirth.toISOString().split('T')[0] : student.dateOfBirth,
      dateOfJoining: student.dateOfJoining instanceof Date ? student.dateOfJoining.toISOString().split('T')[0] : student.dateOfJoining
    };
  }
}
