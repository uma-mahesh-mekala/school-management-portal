import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export const ErrorConstants = {
    UNKNOWN_ERROR: '10000',
    INTERNAL_SERVER_ERROR: '10001',
    ROUTE_NOT_FOUND: '10002',
    USER_ALREADY_EXISTS: '10003',
    INVALID_USERNAME_PASSWORD: '10004'
    ,COURSE_ALREADY_EXISTS: '10005',
    COURSE_NOT_FOUND: '10006',
    STUDENT_NOT_FOUND: '10007',
    PROFESSOR_NOT_FOUND: '10008'
} as const;

async function errorConstantsPlugin(fastify: FastifyInstance) {
    fastify.decorate('errorConstants', ErrorConstants);
}

export default fastifyPlugin(errorConstantsPlugin, {
    name: 'error-constants-plugin'
});

