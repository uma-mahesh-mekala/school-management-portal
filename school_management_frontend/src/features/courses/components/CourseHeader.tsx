import { useHasPermission } from "../../auth/hooks/useHasPermission";
import { NavLink } from "react-router";
import { SearchBar } from "./SearchBar";
import type { SearchBarProps } from "../types/types";
export function CourseHeader({ search, onSearchChange }: SearchBarProps) {
  const canAddCourse = useHasPermission("course:create");
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Courses</h1>

          <div className="mt-1 mb-1 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Courses offered by the school.
            </p>

            <SearchBar search={search} onSearchChange={onSearchChange} />
          </div>
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
