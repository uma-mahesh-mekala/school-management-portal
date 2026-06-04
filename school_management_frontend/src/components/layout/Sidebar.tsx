import {
  BookOpen,
  GraduationCap,
  Users,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white">
      <nav className="flex flex-col gap-2 p-4">

        {/* Active Item */}
        <NavLink to ="/courses" className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
            isActive
                ? "bg-sky-100 text-sky-700 font-medium"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`
        }>
          <BookOpen size={20} />
          <span>Courses</span>
        </NavLink>

        <NavLink to="/professors" className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
            isActive
                ? "bg-sky-100 text-sky-700 font-medium"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`
        }>
            <GraduationCap size={20} />
            <span>Professors</span>
          
        </NavLink>

        <NavLink to="/students" className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
            isActive
                ? "bg-sky-100 text-sky-700 font-medium"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`
        }>
          <Users size={20} />
          <span>Students</span>
        </NavLink>

      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-4 w-64 px-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}