import fastifyPlugin from 'fastify-plugin';
import openapiGlue from 'fastify-openapi-glue';
import { FastifyInstance } from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServiceHandlers } from '../handlers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function openapiPlugin(fastify: FastifyInstance) {
  const specPath = path.join(__dirname, '../swagger-definitions/swagger.yaml');
  const serviceHandlers = createServiceHandlers(fastify);

  const options = {
    specification: specPath,
    serviceHandlers: serviceHandlers,
    ajvOptions: {
      allErrors: true,
      removeAdditional: true,
      coerceTypes: true,
      useDefaults: true
    }
  };

  await fastify.register(openapiGlue, options);
}

export default fastifyPlugin(openapiPlugin, {
  name: 'openapi-plugin',
  dependencies: ['app-config-plugin', 'prisma-plugin', 'auth-plugin', 'hooks-plugin']
});
