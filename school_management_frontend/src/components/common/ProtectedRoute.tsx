import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/useAuth";
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
