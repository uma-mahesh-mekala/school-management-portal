import { useState, useEffect } from "react";
import Table from "../../../components/common/Table";
import { NavLink } from "react-router";
import type { Professor } from "../types/types";
import { getProfessors, deleteProfessor } from "../services/professorService";
import type { Column } from "../../../components/types/types";

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
  const [professors, setProfessors] = useState<Professor[]>([]);
  useEffect(() => {
    async function fetchProfessors() {
      const availableProfessors = await getProfessors();
      setProfessors(availableProfessors);
    }

    fetchProfessors();
  }, []);

  const deleteTheProfessor = async (professorId: number) => {
    await deleteProfessor(professorId);

    setProfessors((current) =>
      current.filter((professor) => professor.id !== Number(professorId)),
    );
  };

  const renderActions = (professor: Professor) => {
    return (
      <div className="flex gap-2">
        <NavLink
          to={`/professors/${professor.id}/edit`}
          className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
        >
          Edit
        </NavLink>

        <button
          className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200"
          onClick={() => deleteTheProfessor(professor.id)}
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
        data={professors}
        renderActions={renderActions}
      />
    </div>
  );
}
