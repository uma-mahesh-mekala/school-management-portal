import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  STUDENT: 'ROLE_STUDENT'
} as const;

export const PAGINATION_DEFAULTS = {
  DEFAULT_PAGE: 0,
  DEFAULT_SIZE: 10
} as const;

export const REDIS_KEYS = {
  COURSE_CATALOG_PREFIX: 'courses:catalog',
  STUDENT_ENROLLED_PREFIX: 'student:enrolled',
  PROFESSORS_PREFIX: 'professors',
  STUDENTS_PREFIX: 'students'
} as const;

export const REDIS_TTL = {
  COURSE_CATALOG: 600, // 10 minutes
  STUDENT_ENROLLED: 1800 // 30 minutes
} as const;

async function appConstantsPlugin(fastify: FastifyInstance) {
  fastify.decorate('constants', {
    ROLES,
    PAGINATION_DEFAULTS,
    REDIS_KEYS,
    REDIS_TTL
  });
}

export default fastifyPlugin(appConstantsPlugin, {
  name: 'app-constants-plugin'
});
