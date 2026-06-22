import { permissions } from "../../../constants/permissions";

export function hasPermission(role: string | null, permission: string) {
  if (!role) return false;
  return permissions[role].includes(permission);
}
