import type { CourseActionsProps } from "../types/types";
import { useHasPermission } from "../../auth/hooks/useHasPermission";
import { NavLinkComponent } from "../../../components/ui/NavLink";
import { Button } from "../../../components/ui/Button";

export function CourseActions({
  onDelete,
  course,
  onEnroll,
  onUnEnroll,
}: CourseActionsProps) {
  const canEditCourse = useHasPermission("course:edit");
  const canDeleteCourse = useHasPermission("course:delete");
  const canEnrollCourse = useHasPermission("course:enroll");
  const canUnEnrollCourse = useHasPermission("course:unenroll");
  if (!canEditCourse && !canDeleteCourse && !canEnrollCourse) return null;
  return (
    <div className="flex gap-2">
      {canEditCourse && (
        <NavLinkComponent
          to={`/courses/${course.id}/edit`}
          intent={"secondary"}
          size={"medium"}
          disabled={false}
          className=""
        >
          Edit
        </NavLinkComponent>
      )}

      {canDeleteCourse && (
        <Button
          type="submit"
          intent={"secondary"}
          size={"medium"}
          disabled={false}
          className="bg-red-100 text-red-700"
          onClick={() => onDelete(course.id)}
        >
          Delete
        </Button>
      )}

      {canUnEnrollCourse &&
        (course.enrolled ? (
          <Button
            type="button"
            intent={"secondary"}
            size={"medium"}
            disabled={false}
            className=""
            onClick={() => onUnEnroll(course.id)}
          >
            UnEnroll
          </Button>
        ) : (
          <Button
            type="button"
            intent={"secondary"}
            size={"medium"}
            disabled={false}
            className=""
            onClick={() => onEnroll(course.id)}
          >
            Enroll
          </Button>
        ))}
    </div>
  );
}
