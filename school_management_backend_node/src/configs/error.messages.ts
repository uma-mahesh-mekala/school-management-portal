import fastify, { FastifyInstance } from "fastify";
import { ErrorConstants } from "./error.constants";

const ErrorMessages = [
    {
        code: ErrorConstants.INVALID_USERNAME_PASSWORD,
        message: "Invalid username or password"
    }
]

export default ErrorMessages