import { PrismaClient } from '@prisma/client';
import { FastifyRedis } from '@fastify/redis';

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
  username: string;
  role: string;
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
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorizeRoles: (...allowedRoles: string[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
