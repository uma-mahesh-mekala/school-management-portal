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
    const course = await this.fastify.prisma.course.create({
      data: {
        courseName: dto.courseName,
        credits: dto.credits
      }
    });

    await this.invalidateCache();
    return {
      id: course.id,
      courseName: course.courseName,
      credits: Number(course.credits)
    };
  }

  async fetchAllCourses(search?: string, page: number = 0, size: number = 10) {
    const cacheKey = `${REDIS_KEYS.COURSE_CATALOG_PREFIX}:${search || 'all'}:p:${page}:s:${size}`;

    if (this.fastify.redis) {
      const cached = await this.fastify.redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
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

    const formattedContent = courses.map((course: Course) => ({
      id: course.id,
      courseName: course.courseName,
      credits: Number(course.credits)
    }));

    const result = buildPagingResult(formattedContent, totalElements, page, size);

    if (this.fastify.redis) {
      await this.fastify.redis.set(cacheKey, JSON.stringify(result), 'EX', REDIS_TTL.COURSE_CATALOG);
    }

    return result;
  }

  async findById(id: number) {
    const course = await this.fastify.prisma.course.findUnique({
      where: { id }
    });

    if (!course) {
      const err = new Error('Course not found') as any;
      err.statusCode = 404;
      throw err;
    }

    return {
      id: course.id,
      courseName: course.courseName,
      credits: Number(course.credits)
    };
  }

  async updateCourse(id: number, dto: CourseRequestDTO) {
    const updated = await this.fastify.prisma.course.update({
      where: { id },
      data: {
        courseName: dto.courseName,
        credits: dto.credits
      }
    });

    await this.invalidateCache();
    return {
      id: updated.id,
      courseName: updated.courseName,
      credits: Number(updated.credits)
    };
  }

  async deleteCourse(id: number) {
    try {
      await this.fastify.prisma.course.delete({
        where: { id }
      });
      await this.invalidateCache();
    } catch (error) {
      const err = new Error('Course not found') as any;
      err.statusCode = 404;
      throw err;
    }
  }

  private async invalidateCache() {
    if (this.fastify.redis) {
      const keys = await this.fastify.redis.keys(`${REDIS_KEYS.COURSE_CATALOG_PREFIX}:*`);
      if (keys.length > 0) {
        await this.fastify.redis.del(...keys);
      }
    }
  }
}
