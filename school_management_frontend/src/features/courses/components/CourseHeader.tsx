import { useHasPermission } from "../../auth/hooks/useHasPermission";
import { NavLink } from "react-router";
export function CourseHeader() {
  const canAddCourse = useHasPermission("course:create");
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Courses</h1>

          <p className="text-sm text-slate-500">
            Courses offered by the school.
          </p>
        </div>
        {canAddCourse ? (
          <NavLink
            to="/courses/new"
            className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 transition"
          >
            Add Course
          </NavLink>
        ) : null}
      </div>
    </div>
  );
}
