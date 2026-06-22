import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollForCourse } from "../../students/services/studentService";

function useEnrollment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: number) => enrollForCourse(courseId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export { useEnrollment };
