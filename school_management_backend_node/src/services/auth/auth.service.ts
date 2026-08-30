import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';

export class AuthService {
  constructor(private fastify: FastifyInstance) { }

  async login(email: string, password: string) {
    this.fastify.log.trace(`login:service - starts`);

    const appUser = await this.fastify.prisma.appUser.findFirst({
      where: { email }
    });

    if (!appUser) {
      this.fastify.log.trace(`login:service - user not found`);

      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.INVALID_USERNAME_PASSWORD);
      return {
        statusCode: 401,
        body: error
      };
    }

    const isMatch = await bcrypt.compare(password, appUser.password);
    if (!isMatch) {
      this.fastify.log.trace(`login:service - password is invalid`);
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.INVALID_USERNAME_PASSWORD);
      return {
        statusCode: 401,
        body: error
      };
    }

    const accessToken = this.fastify.jwt.sign({
      email: appUser.email,
      role: appUser.role,
      expiresAt: new Date().getTime() + 15*60*1000
    });

    return { statusCode: 200, body: { accessToken } };
  }

  async createUser(email: string, rawPassword: string, role: string) {
    const appUser = await this.fastify.prisma.appUser.findFirst({
      where: { email }
    });

    if (appUser) {
      const error = await this.fastify.getErrorMessage(this.fastify.errorConstants.USER_ALREADY_EXISTS);
      return {
        statusCode: 400,
        body: error
      };
    }
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const user = await this.fastify.prisma.appUser.create({
      data: {
        email,
        password: hashedPassword,
        role
      }
    });

    return {
      statusCode: 201,
      body: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  }
}
