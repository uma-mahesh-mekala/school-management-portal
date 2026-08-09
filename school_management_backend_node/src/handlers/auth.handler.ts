import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/auth/auth.service.js';

export function createAuthHandlers(fastify: FastifyInstance) {
  const authService = new AuthService(fastify);

  return {
    async login(req: FastifyRequest, reply: FastifyReply) {
      const body = req.body as { username?: string; password?: string };
      const result = await authService.login(body);
      return reply.status(200).send(result);
    },

    async registerUser(req: FastifyRequest, reply: FastifyReply) {
      const body = req.body as { username: string; password: string; role: string };
      const newUser = await authService.createUser(body.username, body.password, body.role);
      return reply.status(201).send(newUser);
    },

    async validateToken(req: FastifyRequest, reply: FastifyReply) {
      await req.jwtVerify();
      return reply.status(200).send();
    }
  };
}
