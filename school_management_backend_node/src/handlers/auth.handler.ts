import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/auth/auth.service.js';

export function createAuthHandlers(fastify: FastifyInstance) {
  const authService = new AuthService(fastify);

  return {
    async login(req: FastifyRequest, reply: FastifyReply) {
      const {email, password} = req.body as { email: string; password: string };
      const {statusCode, body} = await authService.login(email, password);
      return reply.status(statusCode).send(body);
    },

    async registerUser(req: FastifyRequest, reply: FastifyReply) {
      const { email, password, role } = req.body as { email: string; password: string; role: string };
      const {statusCode, body} = await authService.createUser(email, password, role);
      return reply.status(statusCode).send(body);
    },

    async validateToken(req: FastifyRequest, reply: FastifyReply) {
      await req.jwtVerify();
      return reply.status(200).send();
    }
  };
}
