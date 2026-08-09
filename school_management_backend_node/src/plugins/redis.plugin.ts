import fastifyPlugin from 'fastify-plugin';
import fastifyRedis from '@fastify/redis';
import { FastifyInstance } from 'fastify';

async function redisPlugin(fastify: FastifyInstance) {
  const host = fastify.config.REDIS_HOST || '127.0.0.1';
  const port = parseInt(fastify.config.REDIS_PORT || '6379', 10);

  await fastify.register(fastifyRedis, {
    host,
    port,
    closeClient: true
  });
}

export default fastifyPlugin(redisPlugin, {
  name: 'redis-plugin',
  dependencies: ['app-config-plugin']
});
