import type { SearchBarProps } from "../types/types";

export function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </>
  );
}
