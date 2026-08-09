import { FastifyInstance } from 'fastify';
import { buildPagingResult } from '../../utils/pagination.js';

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

    return professor;
  }

  async getAllProfessors(page: number = 0, size: number = 10) {
    const skip = page * size;
    const [professors, totalElements] = await Promise.all([
      this.fastify.prisma.professor.findMany({
        skip,
        take: size,
        orderBy: { firstName: 'asc' }
      }),
      this.fastify.prisma.professor.count()
    ]);

    return buildPagingResult(professors, totalElements, page, size);
  }

  async getProfessorById(id: number) {
    const professor = await this.fastify.prisma.professor.findUnique({
      where: { id }
    });

    if (!professor) {
      const err = new Error('Professor not found') as any;
      err.statusCode = 404;
      throw err;
    }

    return professor;
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

    return updated;
  }

  async deleteProfessor(id: number) {
    try {
      await this.fastify.prisma.professor.delete({
        where: { id }
      });
    } catch (error) {
      const err = new Error('Professor not found') as any;
      err.statusCode = 404;
      throw err;
    }
  }
}
