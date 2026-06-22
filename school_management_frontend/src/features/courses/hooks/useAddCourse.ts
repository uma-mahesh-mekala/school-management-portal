import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCourse } from "../services/courseService";
export function useAddMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => addCourse(formData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
