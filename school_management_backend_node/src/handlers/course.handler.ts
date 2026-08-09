import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CourseService, CourseRequestDTO } from '../services/course/course.service.js';

export function createCourseHandlers(fastify: FastifyInstance) {
  const courseService = new CourseService(fastify);

  return {
    async addCourse(req: FastifyRequest, reply: FastifyReply) {
      const body = req.body as CourseRequestDTO;
      const course = await courseService.addCourse(body);
      return reply.status(201).send(course);
    },

    async getAllCourses(req: FastifyRequest, reply: FastifyReply) {
      const query = req.query as { search?: string; page?: string; size?: string };
      const page = parseInt(query.page || '0', 10);
      const size = parseInt(query.size || '10', 10);

      const result = await courseService.fetchAllCourses(query.search, page, size);
      return reply.status(200).send(result);
    },

    async getCourseById(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { courseId: string };
      const courseId = parseInt(params.courseId, 10);

      const course = await courseService.findById(courseId);
      return reply.status(200).send(course);
    },

    async updateCourse(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { courseId: string };
      const courseId = parseInt(params.courseId, 10);
      const body = req.body as CourseRequestDTO;

      const updated = await courseService.updateCourse(courseId, body);
      return reply.status(200).send(updated);
    },

    async deleteCourse(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { courseId: string };
      const courseId = parseInt(params.courseId, 10);

      await courseService.deleteCourse(courseId);
      return reply.status(204).send();
    }
  };
}
