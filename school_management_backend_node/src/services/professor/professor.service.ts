import { FastifyInstance } from 'fastify';
import { buildPagingResult } from '../../utils/pagination.js';
import { REDIS_KEYS } from '../../configs/app.constants.js';

export interface ProfessorRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
}

export class ProfessorService {
  constructor(private fastify: FastifyInstance) {}

  async addProfessor(dto: ProfessorRequestDTO) {
    const professor = await this.fastify.prisma.professor.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        department: dto.department,
        designation: dto.designation
      }
    });

    this.fastify.invalidateCache("professors")
    return { statusCode: 200, body: professor };
  }

  async getAllProfessors(page: number = 0, size: number = 10) {
    const cacheKey = `${REDIS_KEYS.PROFESSORS_PREFIX}:p:${page}:s:${size}`;

    if(this.fastify.cacheClient.has('cacheKey')) {
      this.fastify.log.trace("getAllProfessors:service - cachehit");
      const professors = this.fastify.cacheClient.get(cacheKey);
      return {
        statusCode: 200,
        body: JSON.parse(professors),
      }
    }

    this.fastify.log.trace(`getAllProfessors:service - cachemiss searching in DB`)
    const skip = page * size;
    const [professors, totalElements] = await Promise.all([
      this.fastify.prisma.professor.findMany({
        skip,
        take: size,
        orderBy: { firstName: 'asc' }
      }),
      this.fastify.prisma.professor.count()
    ]);

    const formatted = professors.map((prof: any) => ({
      id: prof.id,
      firstName: prof.firstName,
      lastName: prof.lastName,
      email: prof.email,
      department: prof.department,
      designation: prof.designation,
      fullName: `${prof.firstName || ''} ${prof.lastName || ''}`.trim()
    }));

    const result = buildPagingResult(formatted, totalElements, page, size)
    this.fastify.cacheClient.set(cacheKey, JSON.stringify(result))
    return { statusCode: 200, body: result };
  }

  async getProfessorById(id: number) {
    const professor = await this.fastify.prisma.professor.findUnique({
      where: { id }
    });

    if (!professor) {
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.PROFESSOR_NOT_FOUND);
      return { statusCode: 404, body: error };
    }
    return { statusCode: 200, body: professor };
  }

  async updateProfessor(id: number, dto: ProfessorRequestDTO) {
    const updated = await this.fastify.prisma.professor.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        department: dto.department,
        designation: dto.designation
      }
    });

    this.fastify.invalidateCache("professors")

    return { statusCode: 200, body: updated };
  }

  async deleteProfessor(id: number) {
    try {
      await this.fastify.prisma.professor.delete({
        where: { id }
      });

      this.fastify.invalidateCache("professors")

    } catch (error) {
      const e = await this.fastify.getErrorMessage(this.fastify.errorConstants.PROFESSOR_NOT_FOUND);
      return { statusCode: 404, body: e };
    }
    return { statusCode: 200, body: { success: true } };
  }
}
