import { useHasPermission } from "../../auth/hooks/useHasPermission";
import { SearchBar } from "./SearchBar";
import type { SearchBarProps } from "../types/types";
import { NavLinkComponent } from "../../../components/ui/NavLink";

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
          <NavLinkComponent to="/courses/new" className="">
            Add Course
          </NavLinkComponent>
        ) : null}
      </div>
    </div>
  );
}
