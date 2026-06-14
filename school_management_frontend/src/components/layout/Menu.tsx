import { useAuth } from "../../features/auth/context/useAuth";
import { useState } from "react";

export function Menu() {
  const { email, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-tr from-sky-600 to-pink-500 text-md font-semibold text-white hover:bg-sky-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {email?.charAt(0).toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="border-b dorder-slate-100 p-4">
            <p className="truncate text-sm font-medium text-slate-900">
              {email}
            </p>
            <p className="mt-1 text-xs text-slate-500">Administrator</p>
          </div>

          <button
            onClick={logout}
            className="w-full px-4 py-3 text-left text-red-600 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
