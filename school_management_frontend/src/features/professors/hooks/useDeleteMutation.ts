import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfessor } from "../services/professorService";

export function useDeleteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (professorId: number) => deleteProfessor(professorId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["professors"] });
    },
  });
}
