import { FastifyInstance } from "fastify";
import ErrorMessages from "../configs/error.messages.js";
import fastifyPlugin from "fastify-plugin";

const ErrorMessagePlugin = async (fastify: FastifyInstance) => {
    fastify.decorate('getErrorMessage', async (errorCode: string) => {
        const errorMessage = ErrorMessages.find((error) => error.code === errorCode);

        if (errorMessage) return errorMessage

        return ErrorMessages.find(error => error.code === "100000")
    })
}

export default fastifyPlugin(ErrorMessagePlugin)