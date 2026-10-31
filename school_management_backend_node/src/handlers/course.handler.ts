import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CourseService, CourseRequestDTO } from '../services/course/course.service.js';

export function createCourseHandlers(fastify: FastifyInstance) {
  const courseService = new CourseService(fastify);

  return {
    async addCourse(req: FastifyRequest, reply: FastifyReply) {
      const requestBody = req.body as CourseRequestDTO;
      const {statusCode, body} = await courseService.addCourse(requestBody);
      return reply.status(statusCode).send(body);
    },

    async getAllCourses(req: FastifyRequest, reply: FastifyReply) {
      const query = req.query as { search?: string; page?: string; size?: string };
      const page = parseInt(query.page || '0', 10);
      const size = parseInt(query.size || '10', 10);

      const {statusCode, body} = await courseService.fetchAllCourses(query.search, page, size);
      return reply.status(statusCode).send(body);
    },

    async getCourseById(req: FastifyRequest, reply: FastifyReply) {
      const {courseId} = req.params as { courseId: string };

      const {statusCode, body} = await courseService.findById(parseInt(courseId));
      return reply.status(statusCode).send(body);
    },

    async updateCourse(req: FastifyRequest, reply: FastifyReply) {
      const {courseId} = req.params as { courseId: string };
      const requesBbody = req.body as CourseRequestDTO;

      const {statusCode, body} = await courseService.updateCourse(parseInt(courseId), requesBbody);
      return reply.status(statusCode).send(body);
    },

    async deleteCourse(req: FastifyRequest, reply: FastifyReply) {
      const {courseId} = req.params as { courseId: string };

      await courseService.deleteCourse(parseInt(courseId));
      return reply.status(204).send({
        message: `Course deleted successfully`
      });
    }
  };
}
