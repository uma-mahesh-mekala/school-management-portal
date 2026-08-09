import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';

export class AuthService {
  constructor(private fastify: FastifyInstance) {}

  async login(loginRequest: { username?: string; password?: string }) {
    const username = loginRequest.username!;
    const password = loginRequest.password!;

    const appUser = await this.fastify.prisma.appUser.findUnique({
      where: { username }
    });

    if (!appUser) {
      const err = new Error('Invalid username or password') as any;
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, appUser.password);
    if (!isMatch) {
      const err = new Error('Invalid username or password') as any;
      err.statusCode = 401;
      throw err;
    }

    const accessToken = this.fastify.jwt.sign({
      username: appUser.username,
      role: appUser.role
    });

    return { accessToken };
  }

  async createUser(username: string, rawPassword: string, role: string) {
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const user = await this.fastify.prisma.appUser.create({
      data: {
        username,
        password: hashedPassword,
        role
      }
    });

    return {
      id: user.id,
      username: user.username,
      role: user.role
    };
  }
}
