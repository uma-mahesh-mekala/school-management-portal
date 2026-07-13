import { NavLinkComponent } from "../../../components/ui/NavLink";
import { useHasPermission } from "../../auth/hooks/useHasPermission";
import type { StudentActionsProps } from "../types/types";
import { Button } from "../../../components/ui/Button";

export function StudentActions({ onDelete, student }: StudentActionsProps) {
  const canEditStudent = useHasPermission("student:edit");
  const canDeleteStudent = useHasPermission("student:delete");
  return (
    <div className="flex gap-2">
      {canEditStudent ? (
        <NavLinkComponent
          to={`/students/${student.id}/edit`}
          intent={"secondary"}
          size={"medium"}
          disabled={false}
          className=""
        >
          Edit
        </NavLinkComponent>
      ) : null}

      {canDeleteStudent ? (
        <Button
          intent={"secondary"}
          size={"medium"}
          disabled={false}
          className="bg-red-100 text-red-700"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </Button>
      ) : null}
    </div>
  );
}
