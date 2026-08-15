import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ProfessorService, ProfessorRequestDTO } from '../services/professor/professor.service.js';

export function createProfessorHandlers(fastify: FastifyInstance) {
  const professorService = new ProfessorService(fastify);

  return {
    async addProfessor(req: FastifyRequest, reply: FastifyReply) {
      const requestBody = req.body as ProfessorRequestDTO;
      const {statusCode, body} = await professorService.addProfessor(requestBody);
      return reply.status(statusCode).send(body);
    },

    async getAllProfessors(req: FastifyRequest, reply: FastifyReply) {
      const query = req.query as { page?: string; size?: string };
      const page = parseInt(query.page || '0', 10);
      const size = parseInt(query.size || '10', 10);

      const {statusCode, body} = await professorService.getAllProfessors(page, size);
      return reply.status(statusCode).send(body);
    },

    async getProfessorById(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { professorId: string };
      const professorId = parseInt(params.professorId, 10);

      const {statusCode, body} = await professorService.getProfessorById(professorId);
      return reply.status(statusCode).send(body);
    },

    async updateProfessor(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { professorId: string };
      const professorId = parseInt(params.professorId, 10);
      const requestBody = req.body as ProfessorRequestDTO;

      const {statusCode, body} = await professorService.updateProfessor(professorId, requestBody);
      return reply.status(statusCode).send(body);
    },

    async deleteProfessor(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { professorId: string };
      const professorId = parseInt(params.professorId, 10);

      await professorService.deleteProfessor(professorId);
      return reply.status(204).send({
        message: "Professor deleted successfully"
      });
    }
  };
}
