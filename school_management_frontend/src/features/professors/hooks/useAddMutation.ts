import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProfessor } from "../services/professorService";

export function useAddMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => addProfessor(formData),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["professors"] });
    },
  });
}
