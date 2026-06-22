import { useHasPermission } from "../../auth/hooks/useHasPermission";
import type { ProfessorActionsProps } from "../types/types";
import { NavLink } from "react-router";

export function ProfessorActions({
  professor,
  onDelete,
}: ProfessorActionsProps) {
  const canEditProfessor = useHasPermission("professor:edit");
  const canDeleteProfessor = useHasPermission("professor:delete");

  return (
    <div className="flex gap-2">
      {canEditProfessor ? (
        <NavLink
          to={`/professors/${professor.id}/edit`}
          className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
        >
          Edit
        </NavLink>
      ) : null}

      {canDeleteProfessor ? (
        <button
          className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200"
          onClick={() => onDelete(professor.id)}
        >
          Delete
        </button>
      ) : null}
    </div>
  );
}
