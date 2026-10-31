import fastifyPlugin from 'fastify-plugin';
import fastifyEnv from '@fastify/env';
import { FastifyInstance } from 'fastify';
import { configSchema } from '../schemas/config.schema.js';

async function appConfigPlugin(fastify: FastifyInstance) {
  const options = {
    schema: configSchema,
    dotenv: true,
    data: process.env,
    confKey: 'config'
  };

  await fastify.register(fastifyEnv, options);
}

export default fastifyPlugin(appConfigPlugin, {
  name: 'app-config-plugin'
});
