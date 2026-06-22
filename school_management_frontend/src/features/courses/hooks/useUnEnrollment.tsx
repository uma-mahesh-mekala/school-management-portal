import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unEnrollForCourse } from "../../students/services/studentService";

function useUnEnrollment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: number) => unEnrollForCourse(courseId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export { useUnEnrollment };
