import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { genSalt, hash, compare } from 'bcrypt';

const bCryptPlugin = async(fastify: FastifyInstance) => {

    const saltRounds = 5;
    
    const generateHashPassword = async(plainTextPassword: string) => {
        const hashPassword = await hash(plainTextPassword, saltRounds);

        return hashPassword;
    }

    const comparePassord = async(plainTextPassword: string, hashPassword: string) => {
        const isValid = await compare(plainTextPassword, hashPassword);

        return isValid;
    }  

    fastify.decorate('generateHashPassword', generateHashPassword);
    fastify.decorate('comparePassword', comparePassord );

}

export default fastifyPlugin(bCryptPlugin);

