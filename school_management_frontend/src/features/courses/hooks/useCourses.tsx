import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../auth/context/useAuth";
import { getCourses } from "../services/courseService";
import { getStudentCourses } from "../../students/services/studentService";

function useCourses(search: string) {
  const { role } = useAuth();

  return useQuery({
    queryKey: ["courses", { role, search }],
    queryFn: () =>
      role === "ROLE_STUDENT" ? getStudentCourses(search) : getCourses(search),
  });
}

export { useCourses };
