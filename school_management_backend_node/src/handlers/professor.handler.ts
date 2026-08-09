import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ProfessorService, ProfessorRequestDTO } from '../services/professor/professor.service.js';

export function createProfessorHandlers(fastify: FastifyInstance) {
  const professorService = new ProfessorService(fastify);

  return {
    async addProfessor(req: FastifyRequest, reply: FastifyReply) {
      const body = req.body as ProfessorRequestDTO;
      const professor = await professorService.addProfessor(body);
      return reply.status(201).send(professor);
    },

    async getAllProfessors(req: FastifyRequest, reply: FastifyReply) {
      const query = req.query as { page?: string; size?: string };
      const page = parseInt(query.page || '0', 10);
      const size = parseInt(query.size || '10', 10);

      const result = await professorService.getAllProfessors(page, size);
      return reply.status(200).send(result);
    },

    async getProfessorById(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { professorId: string };
      const professorId = parseInt(params.professorId, 10);

      const professor = await professorService.getProfessorById(professorId);
      return reply.status(200).send(professor);
    },

    async updateProfessor(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { professorId: string };
      const professorId = parseInt(params.professorId, 10);
      const body = req.body as ProfessorRequestDTO;

      const updated = await professorService.updateProfessor(professorId, body);
      return reply.status(200).send(updated);
    },

    async deleteProfessor(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { professorId: string };
      const professorId = parseInt(params.professorId, 10);

      await professorService.deleteProfessor(professorId);
      return reply.status(204).send();
    }
  };
}
