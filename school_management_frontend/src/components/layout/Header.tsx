import schoolLogo from "../../assets/school.svg";

export default function Header() {
  return (
    <header className="h-14 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-indigo-50">
      <div className="flex h-full items-center justify-between px-6">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 shadow-sm">
            <img
              src={schoolLogo}
              alt="School Logo"
              className="h-5 w-5"
            />
          </div>

          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-800">
              School Management System
            </h1>

            <p className="text-xs text-slate-500">
              Academic Administration Portal
            </p>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700">
              Uma Mahesh
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-sm font-bold text-white shadow-sm">
            U
          </div>
        </div>

      </div>
    </header>
  );
}