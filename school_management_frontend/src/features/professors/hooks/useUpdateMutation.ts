import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfessor } from "../services/professorService";
import type { UpdateProfessorRequest } from "../types/types";
export function useUpdateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, professorId }: UpdateProfessorRequest) =>
      updateProfessor(formData, professorId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["professors"] });
    },
  });
}
