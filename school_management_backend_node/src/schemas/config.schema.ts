export const configSchema = {
  type: 'object',
  required: ['PORT', 'HOST', 'DATABASE_URL', 'JWT_SECRET', 'REDIS_HOST', 'REDIS_PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: '8080'
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0'
    },
    DATABASE_URL: {
      type: 'string'
    },
    JWT_SECRET: {
      type: 'string'
    },
    JWT_EXPIRATION: {
      type: 'string',
      default: '3600000'
    },
    REDIS_HOST: {
      type: 'string',
      default: '127.0.0.1'
    },
    REDIS_PORT: {
      type: 'string',
      default: '6379'
    }
  }
};
