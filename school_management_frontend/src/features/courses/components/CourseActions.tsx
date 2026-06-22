import { NavLink } from "react-router";
import type { CourseActionsProps } from "../types/types";
import { useHasPermission } from "../../auth/hooks/useHasPermission";

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
        <NavLink
          to={`/courses/${course.id}/edit`}
          className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
        >
          Edit
        </NavLink>
      )}

      {canDeleteCourse && (
        <button
          type="submit"
          className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200"
          onClick={() => onDelete(course.id)}
        >
          Delete
        </button>
      )}

      {canUnEnrollCourse &&
        (course.enrolled ? (
          <button
            type="button"
            className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
            onClick={() => onUnEnroll(course.id)}
          >
            UnEnroll
          </button>
        ) : (
          <button
            type="button"
            className="rounded-md bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
            onClick={() => onEnroll(course.id)}
          >
            Enroll
          </button>
        ))}
    </div>
  );
}
