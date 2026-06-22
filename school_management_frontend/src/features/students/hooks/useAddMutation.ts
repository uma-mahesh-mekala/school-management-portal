import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudent } from "../services/studentService";
export function useAddMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => addStudent(formData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
