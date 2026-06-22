import { useAuth } from "../context/useAuth";
import { hasPermission } from "../utils/hasPermission";

export function useHasPermission(permission: string) {
  const { role } = useAuth();
  return hasPermission(role, permission);
}
