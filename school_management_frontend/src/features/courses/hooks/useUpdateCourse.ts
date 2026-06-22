import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "../services/courseService";
import type { UpdateCourseRequest } from "../types/types";
export function useUpdateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, courseId }: UpdateCourseRequest) =>
      updateCourse(formData, courseId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
