import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyAutoload from '@fastify/autoload';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildApp() {
  const fastify = Fastify({
    logger: true,
    ajv: {
      customOptions: {
        allErrors: true,
        removeAdditional: true,
        coerceTypes: true,
        useDefaults: true
      }
    }
  });

  // CORS Configuration
  await fastify.register(fastifyCors, {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  });

  // Register JWT core plugin
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'super-super-super-super-super-secret-key'
  });

  // Autoload all plugins inside src/plugins
  await fastify.register(fastifyAutoload, {
    dir: path.join(__dirname, 'plugins')
  });

  return fastify;
}

async function start() {
  try {
    const app = await buildApp();
    await app.ready();

    const port = parseInt(app.config.PORT || '8080', 10);
    const host = app.config.HOST || '0.0.0.0';

    await app.listen({ port, host });
    app.log.info(`Server running on http://${host}:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  start();
}

export { buildApp };
