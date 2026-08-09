import { FastifyInstance } from 'fastify';
import { Prisma, Course, StudentCourse } from '@prisma/client';
import { AuthService } from '../auth/auth.service.js';
import { buildPagingResult } from '../../utils/pagination.js';
import { ROLES, REDIS_KEYS, REDIS_TTL } from '../../configs/app.constants.js';

export interface StudentRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  dateOfJoining: string;
}

export class StudentService {
  private authService: AuthService;

  constructor(private fastify: FastifyInstance) {
    this.authService = new AuthService(fastify);
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

      return newStudent;
    });

    return this.formatStudentDTO(student);
  }

  async getAllStudents(page: number = 0, size: number = 10) {
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
    return buildPagingResult(content, totalElements, page, size);
  }

  async getStudentById(id: number) {
    const student = await this.fastify.prisma.student.findUnique({
      where: { id }
    });

    if (!student) {
      const err = new Error('Student not found') as any;
      err.statusCode = 404;
      throw err;
    }

    return this.formatStudentDTO(student);
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

    return this.formatStudentDTO(updated);
  }

  async deleteStudent(id: number) {
    try {
      await this.fastify.prisma.student.delete({
        where: { id }
      });
    } catch (error) {
      const err = new Error('Student not found') as any;
      err.statusCode = 404;
      throw err;
    }
  }

  async enrollStudentInCourse(email: string, courseId: number) {
    const student = await this.fastify.prisma.student.findUnique({
      where: { email }
    });

    if (!student) {
      const err = new Error('Student not found') as any;
      err.statusCode = 404;
      throw err;
    }

    const course = await this.fastify.prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      const err = new Error('Course not found') as any;
      err.statusCode = 404;
      throw err;
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
  }

  async unEnrollStudentInCourse(email: string, courseId: number) {
    const student = await this.fastify.prisma.student.findUnique({
      where: { email }
    });

    if (!student) {
      const err = new Error('Student not found') as any;
      err.statusCode = 404;
      throw err;
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
  }

  async getCoursesForStudent(email: string, search?: string, page: number = 0, size: number = 10) {
    const student = await this.fastify.prisma.student.findUnique({
      where: { email },
      include: {
        courses: true
      }
    });

    if (!student) {
      const err = new Error('Student not found') as any;
      err.statusCode = 404;
      throw err;
    }

    let enrolledCourseIds: Set<number>;

    // Try fetching from Redis first
    const redisKey = `${REDIS_KEYS.STUDENT_ENROLLED_PREFIX}:${student.id}`;
    if (this.fastify.redis) {
      const cachedIds = await this.fastify.redis.smembers(redisKey);
      if (cachedIds && cachedIds.length > 0) {
        enrolledCourseIds = new Set(cachedIds.map(id => parseInt(id, 10)));
      } else {
        enrolledCourseIds = new Set(student.courses.map((c: StudentCourse) => c.courseId));
        if (enrolledCourseIds.size > 0) {
          await this.fastify.redis.sadd(redisKey, ...Array.from(enrolledCourseIds).map(id => id.toString()));
          await this.fastify.redis.expire(redisKey, REDIS_TTL.STUDENT_ENROLLED);
        }
      }
    } else {
      enrolledCourseIds = new Set(student.courses.map((c: StudentCourse) => c.courseId));
    }

    const skip = page * size;
    const whereClause = search && search.trim() !== ''
      ? { courseName: { contains: search, mode: 'insensitive' as const } }
      : {};

    const [courses, totalElements] = await Promise.all([
      this.fastify.prisma.course.findMany({
        where: whereClause,
        skip,
        take: size,
        orderBy: { courseName: 'asc' }
      }),
      this.fastify.prisma.course.count({ where: whereClause })
    ]);

    const content = courses.map((course: Course) => ({
      id: course.id,
      courseName: course.courseName,
      credits: Number(course.credits),
      enrolled: enrolledCourseIds.has(course.id)
    }));

    return buildPagingResult(content, totalElements, page, size);
  }

  private formatStudentDTO(student: any) {
    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      dateOfBirth: student.dateOfBirth instanceof Date ? student.dateOfBirth.toISOString().split('T')[0] : student.dateOfBirth,
      dateOfJoining: student.dateOfJoining instanceof Date ? student.dateOfJoining.toISOString().split('T')[0] : student.dateOfJoining
    };
  }
}
