type Permission = string;

const permissions: Record<string, Permission[]> = {
  ROLE_ADMIN: [
    "course:create",
    "course:edit",
    "course:delete",
    "professor:create",
    "professor:edit",
    "professor:delete",
    "student:create",
    "student:edit",
    "student:delete",
  ],
  ROLE_STUDENT: [
    "professor:view",
    "course:view",
    "course:enroll",
    "course:unenroll",
  ],
};

export { permissions };
