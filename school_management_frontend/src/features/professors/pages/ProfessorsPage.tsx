import Table from "../../../components/common/Table";
import type { Professor } from "../types/types";
import type { Column } from "../../../components/types/types";
import { useGetProfessor } from "../hooks/useGetProfessors";
import { useDeleteMutation } from "../hooks/useDeleteMutation";
import { Loader } from "../../../components/ui/Loader";
import { ProfessorActions } from "../components/ProfessorActions";
import { NavLinkComponent } from "../../../components/ui/NavLink";

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
  const { data, isFetching } = useGetProfessor();

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

        <NavLinkComponent to="/professors/new" className="">
          Add Professor
        </NavLinkComponent>
      </div>
      <Table
        columns={professorColumns}
        data={data.content}
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
