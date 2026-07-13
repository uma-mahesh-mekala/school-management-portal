import Table from "../../../components/common/Table";
import type { Student } from "../types/types";
import type { Column } from "../../../components/types/types";
import { useDeleteMutation } from "../hooks/useDeleteMutation";
import { useGetStudents } from "../hooks/useGetStudents";
import { StudentActions } from "../components/StudentActions";
import { Loader } from "../../../components/ui/Loader";
import { NavLinkComponent } from "../../../components/ui/NavLink";

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

        <NavLinkComponent to="/students/new" className="">
          Add Student
        </NavLinkComponent>
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
