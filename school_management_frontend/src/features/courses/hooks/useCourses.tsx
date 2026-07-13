import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../auth/context/useAuth";
import { getCourses } from "../services/courseService";
import { getStudentCourses } from "../../students/services/studentService";

function useCourses(search: string, page: number, size: number) {
  const { role } = useAuth();

  return useQuery({
    queryKey: ["courses", { role, search, page, size }],
    queryFn: () =>
      role === "ROLE_STUDENT"
        ? getStudentCourses(search, page, size)
        : getCourses(search, page, size),
  });
}

export { useCourses };
