import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "../services/courseService";
export function useDeleteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: number) => deleteCourse(courseId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
