import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../auth/context/useAuth";
import { getCourses } from "../services/courseService";
import { getStudentCourses } from "../../students/services/studentService";

function useCourses() {
  const { role } = useAuth();

  return useQuery({
    queryKey: ["courses"],
    queryFn: role === "ROLE_STUDENT" ? getStudentCourses : getCourses,
  });
}

export { useCourses };
