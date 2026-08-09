import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { StudentService, StudentRequestDTO } from '../services/student/student.service.js';

export function createStudentHandlers(fastify: FastifyInstance) {
  const studentService = new StudentService(fastify);

  return {
    async addStudent(req: FastifyRequest, reply: FastifyReply) {
      const body = req.body as StudentRequestDTO;
      const student = await studentService.addStudent(body);
      return reply.status(201).send(student);
    },

    async getAllStudents(req: FastifyRequest, reply: FastifyReply) {
      const query = req.query as { page?: string; size?: string };
      const page = parseInt(query.page || '0', 10);
      const size = parseInt(query.size || '10', 10);

      const result = await studentService.getAllStudents(page, size);
      return reply.status(200).send(result);
    },

    async getStudentById(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { studentId: string };
      const studentId = parseInt(params.studentId, 10);

      const student = await studentService.getStudentById(studentId);
      return reply.status(200).send(student);
    },

    async updateStudent(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { studentId: string };
      const studentId = parseInt(params.studentId, 10);
      const body = req.body as StudentRequestDTO;

      const updated = await studentService.updateStudent(studentId, body);
      return reply.status(200).send(updated);
    },

    async deleteStudent(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { studentId: string };
      const studentId = parseInt(params.studentId, 10);

      await studentService.deleteStudent(studentId);
      return reply.status(204).send();
    },

    async enrollCourse(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { courseId: string };
      const courseId = parseInt(params.courseId, 10);
      const email = req.user.username;

      await studentService.enrollStudentInCourse(email, courseId);
      return reply.status(200).send({ message: 'student successfully enrolled' });
    },

    async unEnrollCourse(req: FastifyRequest, reply: FastifyReply) {
      const params = req.params as { courseId: string };
      const courseId = parseInt(params.courseId, 10);
      const email = req.user.username;

      await studentService.unEnrollStudentInCourse(email, courseId);
      return reply.status(200).send({ message: 'student unenrolled successfully' });
    },

    async getStudentCourses(req: FastifyRequest, reply: FastifyReply) {
      const query = req.query as { search?: string; page?: string; size?: string };
      const page = parseInt(query.page || '0', 10);
      const size = parseInt(query.size || '10', 10);
      const email = req.user.username;

      const result = await studentService.getCoursesForStudent(email, query.search, page, size);
      return reply.status(200).send(result);
    }
  };
}
