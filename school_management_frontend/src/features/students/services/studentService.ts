import { apiFetch } from "../../../api/apiClient";
import type { Student } from "../types/types";

const studentsUrl = `${import.meta.env.VITE_BACKEND_URL}/students`;

export async function addStudent(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const dateOfBirth = formData.get("dateOfBirth");
  const dateOfJoining = formData.get("dateOfJoining");

  const newStudent = {
    firstName,
    lastName,
    email,
    dateOfBirth,
    dateOfJoining,
  };

  const addStudentResponse = await apiFetch(studentsUrl, {
    method: "POST",
    body: JSON.stringify(newStudent),
  });

  return addStudentResponse.json();
}

export async function getStudents() {
  const getStudentsResponse = await apiFetch(studentsUrl);
  const students = await getStudentsResponse.json();

  return students.map((student: Student) => ({
    ...student,
    fullName: `${student.firstName} ${student.lastName}`,
  }));
}

export async function getStudentById(id: number) {
  const studentByIdUrl = `${studentsUrl}/${id}`;

  const getStudentByIdResponse = await apiFetch(studentByIdUrl);
  const student = await getStudentByIdResponse.json();

  return {
    ...student,
    fullName: `${student.firstName} ${student.lastName}`,
  };
}

export async function updateStudent(formData: FormData, studentId: number) {
  const updateStudentsUrl = `${studentsUrl}/${studentId}`;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const dateOfBirth = formData.get("dateOfBirth");
  const dateOfJoining = formData.get("dateOfJoining");

  const studentDetailsToUpdate = {
    firstName,
    lastName,
    email,
    dateOfBirth,
    dateOfJoining,
  };

  const updateStudentResponse = await apiFetch(updateStudentsUrl, {
    method: "PUT",
    body: JSON.stringify(studentDetailsToUpdate),
  });

  return updateStudentResponse.json();
}

export async function deleteStudent(id: number) {
  const deleteStudentByIdUrl = `${studentsUrl}/${id}`;

  const confirmDelete = window.confirm("Do you want to delete the Student?");
  if (confirmDelete) {
    const deleteStudentByIdResponse = await apiFetch(deleteStudentByIdUrl, {
      method: "DELETE",
    });

    return deleteStudentByIdResponse.json();
  }
}

export async function getStudentCourses() {
  const studentCoursesUrl = `${studentsUrl}/me/courses`;
  const getStudentCoursesResponse = await apiFetch(studentCoursesUrl);
  return getStudentCoursesResponse.json();
}

export async function enrollForCourse(courseId: number) {
  const studentCourseEnrollUrl = `${studentsUrl}/courses/${courseId}/enroll`;
  const enrollStudentCourseResponse = await apiFetch(studentCourseEnrollUrl, {
    method: "POST",
    body: JSON.stringify({}),
  });

  return enrollStudentCourseResponse.json();
}

export async function unEnrollForCourse(courseId: number) {
  const studentCourseUnEnrollUrl = `${studentsUrl}/courses/${courseId}/unenroll`;
  const enrollStudentCourseResponse = await apiFetch(studentCourseUnEnrollUrl, {
    method: "POST",
    body: JSON.stringify({}),
  });

  return enrollStudentCourseResponse.json();
}
