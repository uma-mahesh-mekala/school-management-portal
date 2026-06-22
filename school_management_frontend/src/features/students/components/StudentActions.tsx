import { useHasPermission } from "../../auth/hooks/useHasPermission";
import type { StudentActionsProps } from "../types/types";
import { NavLink } from "react-router";

export function StudentActions({ onDelete, student }: StudentActionsProps) {
  const canEditStudent = useHasPermission("student:edit");
  const canDeleteStudent = useHasPermission("student:delete");
  return (
    <div className="flex gap-2">
      {canEditStudent ? (
        <NavLink
          to={`/students/${student.id}/edit`}
          className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
        >
          Edit
        </NavLink>
      ) : null}

      {canDeleteStudent ? (
        <button
          className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      ) : null}
    </div>
  );
}
