import { PrismaClient } from '@prisma/client';
import { FastifyRedis } from '@fastify/redis';
import { NodeCache } from '@cacheable/node-cache';

export interface AppConfig {
  PORT: string;
  HOST: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
}

export interface UserPayload {
  email: string;
  role: string;
  expiresAt: number;
}

export interface Constants {
  ROLES: {
    ADMIN: string;
    STUDENT: string;
  };
  PAGINATION_DEFAULTS: {
    DEFAULT_PAGE: number;
    DEFAULT_SIZE: number;
  };
  REDIS_KEYS: {
    COURSE_CATALOG_PREFIX: string;
    STUDENT_ENROLLED_PREFIX: string;
  };
  REDIS_TTL: {
    COURSE_CATALOG: number;
    STUDENT_ENROLLED: number;
  };
}

export interface ErrorConstants {
  UNKNOWN_ERROR: string;
  INTERNAL_SERVER_ERROR: string;
  ROUTE_NOT_FOUND: string;
  INVALID_USERNAME_PASSWORD: string;
  USER_ALREADY_EXISTS: string;
  COURSE_ALREADY_EXISTS: string;
  COURSE_NOT_FOUND: string;
  STUDENT_NOT_FOUND: string;
  PROFESSOR_NOT_FOUND: string;
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: UserPayload;
    user: UserPayload;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    config: AppConfig;
    prisma: PrismaClient;
    redis: FastifyRedis;
    cacheClient?: NodeCache;
    constants: Constants;
    errorConstants: ErrorConstants;
    getErrorMessage: (errorCode: string) => Promise<{ code: string; message: string } | undefined>;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorizeRoles: (...allowedRoles: string[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    invalidateCache: (pattern?: string) => void;
  }
}
