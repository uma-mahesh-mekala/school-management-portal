import Table from "../../../components/common/Table";
import { NavLink } from "react-router";
import type { Professor } from "../types/types";
import type { Column } from "../../../components/types/types";
import { useGetProfessor } from "../hooks/useGetProfessors";
import { useDeleteMutation } from "../hooks/useDeleteMutation";
import { Loader } from "../../../components/ui/Loader";
import { ProfessorActions } from "../components/ProfessorActions";

const professorColumns: Column<Professor>[] = [
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
    key: "department",
    label: "Department",
  },
  {
    key: "designation",
    label: "Designation",
  },
];

export default function ProfessorsPage() {
  const { data = [], isFetching } = useGetProfessor();

  const deleteMutation = useDeleteMutation();

  const deleteTheProfessor = async (professorId: number) => {
    deleteMutation.mutate(professorId);
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Professors</h1>

          <p className="text-sm text-slate-500">
            Our high quality teaching staff includes.
          </p>
        </div>

        <NavLink
          to="/professors/new"
          className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 transition"
        >
          Add Professor
        </NavLink>
      </div>
      <Table
        columns={professorColumns}
        data={data}
        renderActions={(professor) => (
          <ProfessorActions
            professor={professor}
            onDelete={deleteTheProfessor}
          />
        )}
      />
    </div>
  );
}
