import { FastifyInstance } from 'fastify';
import { Course } from '@prisma/client';
import { buildPagingResult } from '../../utils/pagination.js';
import { REDIS_KEYS, REDIS_TTL } from '../../configs/app.constants.js';

export interface CourseRequestDTO {
  courseName: string;
  credits: number;
}

export class CourseService {
  constructor(private fastify: FastifyInstance) {}

  async addCourse(dto: CourseRequestDTO) {
    const rawName = dto.courseName.trim();
    const capitalizedName = rawName
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');

    // Check if course already exists (case-insensitive)
    const existing = await this.fastify.prisma.course.findFirst({
      where: { courseName: { equals: capitalizedName, mode: 'insensitive' as const } }
    });

    if (existing) {
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.COURSE_ALREADY_EXISTS);
      return { statusCode: 400, body: error };
    }

    const course = await this.fastify.prisma.course.create({
      data: {
        courseName: capitalizedName,
        credits: dto.credits
      }
    });

    this.fastify.invalidateCache(REDIS_KEYS.COURSE_CATALOG_PREFIX);
    return { statusCode: 200, body: {
      id: course.id,
      courseName: course.courseName,
      credits: Number(course.credits)
    }};
  }

  async fetchAllCourses(search?: string, page: number = 0, size: number = 10) {
    this.fastify.log.trace("fetchAllCourses:service - starts")
    const cacheKey = `${REDIS_KEYS.COURSE_CATALOG_PREFIX}:${search || 'all'}:p:${page}:s:${size}`;

    if (this.fastify.cacheClient) {
      this.fastify.log.trace(`searching courses for ${cacheKey} in cache`);
      const cached = await this.fastify.cacheClient.get(cacheKey);
      if (cached) {
        this.fastify.log.trace(`cachehit:data found in cache`)
        return {
          statusCode: 200,
          body: JSON.parse(cached)
        }
      }
    }

    const skip = page * size;
    const whereClause = search && search.trim() !== ''
      ? { courseName: { contains: search, mode: 'insensitive' as const } }
      : {};

    this.fastify.log.trace("cachemiss: searching for data in DB")  
    const [courses, totalElements] = await Promise.all([
      this.fastify.prisma.course.findMany({
        where: whereClause,
        skip,
        take: size,
        orderBy: { courseName: 'asc' }
      }),
      this.fastify.prisma.course.count({ where: whereClause })
    ]);

    const formattedContent = courses.map((course: Course) => ({
      id: course.id,
      courseName: course.courseName,
      credits: Number(course.credits)
    }));

    const result = buildPagingResult(formattedContent, totalElements, page, size);

    this.fastify.cacheClient.set(cacheKey, JSON.stringify(result)) 

    return { statusCode: 200, body: result };
  }

  async findById(id: number) {
    const course = await this.fastify.prisma.course.findUnique({
      where: { id }
    });

    if (!course) {
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.COURSE_NOT_FOUND);
      return { statusCode: 404, body: error };
    }

    return { statusCode: 200, body: {
      id: course.id,
      courseName: course.courseName,
      credits: Number(course.credits)
    }};
  }

  async updateCourse(id: number, dto: CourseRequestDTO) {
    const updated = await this.fastify.prisma.course.update({
      where: { id },
      data: {
        courseName: dto.courseName,
        credits: dto.credits
      }
    });

    this.fastify.invalidateCache(REDIS_KEYS.COURSE_CATALOG_PREFIX);
    return { statusCode: 200, body: {
      id: updated.id,
      courseName: updated.courseName,
      credits: Number(updated.credits)
    }};
  }

  async deleteCourse(id: number) {
    try {
      await this.fastify.prisma.course.delete({
        where: { id }
      });
      this.fastify.invalidateCache(REDIS_KEYS.COURSE_CATALOG_PREFIX);
    } catch (error) {
      const e = await this.fastify.getErrorMessage(this.fastify.errorConstants.COURSE_NOT_FOUND);
      return { statusCode: 404, body: e };
    }
  }
}
