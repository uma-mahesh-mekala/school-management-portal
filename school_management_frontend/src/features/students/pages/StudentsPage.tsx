import { useState, useEffect } from "react";
import Table from "../../../components/common/Table";
import { NavLink } from "react-router";
import type { Student } from "../types/types";
import { getStudents, deleteStudent } from "../services/studentService";
import type { Column } from "../../../components/types/types";

const studentColumns: Column<Student>[] = [
  {
    key: "id",
    label: "No.",
  },
  {
    key: "fullName",
    label: "Full Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "dateOfBirth",
    label: "Date Of Birth",
  },
  {
    key: "dateOfJoining",
    label: "Date of Joining",
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    async function fetchStudents() {
      const availableStudents = await getStudents();
      setStudents(availableStudents);
    }

    fetchStudents();
  }, []);

  const deleteTheStudent = async (studentId: number) => {
    await deleteStudent(studentId);

    console.log(typeof studentId)
    setStudents((current) =>
      current.filter((student) => student.id !== Number(studentId)),
    );
  };

  const renderActions = (student: Student) => {
    return (
      <div className="flex gap-2">
        <NavLink
          to={`/students/${student.id}/edit`}
          className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
        >
          Edit
        </NavLink>

        <button
          className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200"
          onClick={() => deleteTheStudent(student.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Students</h1>

          <p className="text-sm text-slate-500">Total Students in School.</p>
        </div>

        <NavLink
          to="/students/new"
          className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 transition"
        >
          Add Student
        </NavLink>
      </div>
      <Table
        columns={studentColumns}
        data={students}
        renderActions={renderActions}
      />
    </div>
  );
}
