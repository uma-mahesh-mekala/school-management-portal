import { FastifyInstance } from 'fastify';
import { createAuthHandlers } from './auth.handler.js';
import { createStudentHandlers } from './student.handler.js';
import { createProfessorHandlers } from './professor.handler.js';
import { createCourseHandlers } from './course.handler.js';

export function createServiceHandlers(fastify: FastifyInstance) {
  return {
    ...createAuthHandlers(fastify),
    ...createStudentHandlers(fastify),
    ...createProfessorHandlers(fastify),
    ...createCourseHandlers(fastify)
  };
}
