import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

async function authPlugin(fastify: FastifyInstance) {
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ status: 401, message: 'Unauthorized' });
    }
  });

  fastify.decorate('authorizeRoles', (...allowedRoles: string[]) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        const user = request.user as { username: string; role: string };

        if (!user || !user.role || !allowedRoles.includes(user.role)) {
          return reply.status(403).send({ status: 403, message: 'Access Denied: Insufficient Privileges' });
        }
      } catch (err) {
        return reply.status(401).send({ status: 401, message: 'Unauthorized' });
      }
    };
  });
}

export default fastifyPlugin(authPlugin, {
  name: 'auth-plugin'
});
