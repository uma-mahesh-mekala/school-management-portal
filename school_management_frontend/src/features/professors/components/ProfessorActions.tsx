import { useHasPermission } from "../../auth/hooks/useHasPermission";
import type { ProfessorActionsProps } from "../types/types";
import { NavLinkComponent } from "../../../components/ui/NavLink";
import { Button } from "../../../components/ui/Button";

export function ProfessorActions({
  professor,
  onDelete,
}: ProfessorActionsProps) {
  const canEditProfessor = useHasPermission("professor:edit");
  const canDeleteProfessor = useHasPermission("professor:delete");

  return (
    <div className="flex gap-2">
      {canEditProfessor ? (
        <NavLinkComponent
          to={`/professors/${professor.id}/edit`}
          intent={"secondary"}
          size={"medium"}
          disabled={false}
          className=""
        >
          Edit
        </NavLinkComponent>
      ) : null}

      {canDeleteProfessor ? (
        <Button
          type="submit"
          intent={"secondary"}
          size={"medium"}
          disabled={false}
          className="bg-red-100 text-red-700"
          onClick={() => onDelete(professor.id)}
        >
          Delete
        </Button>
      ) : null}
    </div>
  );
}
