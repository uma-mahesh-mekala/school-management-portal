import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Prisma } from '@prisma/client';

async function errorHandlerPlugin(fastify: FastifyInstance) {
  // Catch 404 Route Not Found errors
  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(404).send({
      status: 404,
      message: `Route ${request.method}:${request.url} not found`
    });
  });

  // Catch unexpected application errors, schema validation errors, and Prisma errors
  fastify.setErrorHandler((error: any, request: FastifyRequest, reply: FastifyReply) => {
    fastify.log.error(error);

    // Handle Fastify Inbuilt Schema Validation Errors (Ajv)
    if (error.validation) {
      return reply.status(400).send({
        status: 400,
        message: error.message
      });
    }

    // Handle Prisma Specific Errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return reply.status(409).send({
          status: 409,
          message: `Unique constraint failed on field: ${error.meta?.target}`
        });
      }
      if (error.code === 'P2025') {
        return reply.status(404).send({
          status: 404,
          message: 'Record not found'
        });
      }
    }

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    return reply.status(statusCode).send({
      status: statusCode,
      message
    });
  });
}

export default fastifyPlugin(errorHandlerPlugin, {
  name: 'error-handler-plugin'
});
