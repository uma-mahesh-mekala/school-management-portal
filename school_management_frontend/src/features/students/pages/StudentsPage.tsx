import Table from "../../../components/common/Table";
import { NavLink } from "react-router";
import type { Student } from "../types/types";
import type { Column } from "../../../components/types/types";
import { useDeleteMutation } from "../hooks/useDeleteMutation";
import { useGetStudents } from "../hooks/useGetStudents";
import { StudentActions } from "../components/StudentActions";
import { Loader } from "../../../components/ui/Loader";

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
  const deleteStudentMutation = useDeleteMutation();

  const { data = [], isFetching } = useGetStudents();

  const deleteTheStudent = async (studentId: number) => {
    deleteStudentMutation.mutate(studentId);
  };

  if (isFetching) {
    return <Loader />;
  }
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
        data={data}
        renderActions={(student) => (
          <StudentActions onDelete={deleteTheStudent} student={student} />
        )}
      />
    </div>
  );
}
