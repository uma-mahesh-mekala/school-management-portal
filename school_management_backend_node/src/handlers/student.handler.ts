import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { StudentService, StudentRequestDTO } from '../services/student/student.service.js';

export function createStudentHandlers(fastify: FastifyInstance) {
  const studentService = new StudentService(fastify);

  return {
    async addStudent(req: FastifyRequest, reply: FastifyReply) {
      const requestBody = req.body as StudentRequestDTO;
      const {statusCode, body} = await studentService.addStudent(requestBody);
      return reply.status(statusCode).send(body);
    },

    async getAllStudents(req: FastifyRequest, reply: FastifyReply) {
      const query = req.query as { page?: string; size?: string };
      const page = parseInt(query.page || '0', 10);
      const size = parseInt(query.size || '10', 10);

      const {statusCode, body} = await studentService.getAllStudents(page, size);
      return reply.status(statusCode).send(body);
    },

    async getStudentById(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { studentId: string };
      const studentId = parseInt(params.studentId, 10);

      const {statusCode, body} = await studentService.getStudentById(studentId);
      return reply.status(statusCode).send(body);
    },

    async updateStudent(req: FastifyRequest, reply: FastifyReply) {
      const {studentId} = req.params as { studentId: string };
      const requestBody = req.body as StudentRequestDTO;

      const {statusCode, body} = await studentService.updateStudent(parseInt(studentId), requestBody);
      return reply.status(statusCode).send(body);
    },

    async deleteStudent(req: FastifyRequest, reply: FastifyReply) {
      const {studentId} = req.params as { studentId: string };

      await studentService.deleteStudent(parseInt(studentId));
      return reply.status(204).send();
    },

    async enrollCourse(req: FastifyRequest, reply: FastifyReply) {
      const {courseId} = req.params as { courseId: string };
      const email = req.user.email;

      await studentService.enrollStudentInCourse(email, parseInt(courseId));
      return reply.status(200).send({ message: 'student successfully enrolled' });
    },

    async unEnrollCourse(req: FastifyRequest, reply: FastifyReply) {
      const {courseId} = req.params as { courseId: string };
      const email = req.user.email;

      await studentService.unEnrollStudentInCourse(email, parseInt(courseId));
      return reply.status(200).send({ message: 'student unenrolled successfully' });
    },

    async getStudentCourses(req: FastifyRequest, reply: FastifyReply) {
      const query = req.query as { search?: string; page?: string; size?: string };
      const page = parseInt(query.page || '0', 10);
      const size = parseInt(query.size || '10', 10);
      const email = req.user.email;

      const {statusCode, body} = await studentService.getCoursesForStudent(email, query.search, page, size);
      return reply.status(statusCode).send(body);
    }
  };
}
