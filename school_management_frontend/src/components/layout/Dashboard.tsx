import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="h-screen bg-slate-50">
      <Header />

      <div className="flex h-[calc(100vh-56px)]">
        <Sidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}