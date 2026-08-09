import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

async function hooksPlugin(fastify: FastifyInstance) {
  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    const schema = request.routeOptions.schema as any;
    const allowedRoles = schema?.['x-roles'] as string[] | undefined;

    // If route specifies x-roles in swagger.yaml, enforce Auth + RBAC automatically
    if (allowedRoles && allowedRoles.length > 0) {
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.status(401).send({ status: 401, message: 'Unauthorized' });
      }

      const user = request.user as { username: string; role: string };
      if (!user || !user.role || !allowedRoles.includes(user.role)) {
        return reply.status(403).send({ status: 403, message: 'Access Denied: Insufficient Privileges' });
      }
    }
  });
}

export default fastifyPlugin(hooksPlugin, {
  name: 'hooks-plugin',
  dependencies: ['app-config-plugin', 'auth-plugin']
});
