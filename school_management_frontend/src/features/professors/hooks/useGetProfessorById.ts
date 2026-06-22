import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfessorById } from "../services/professorService";
import type { Professor } from "../types/types";

export function useGetProfessorById(professorId: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["professor", professorId],
    queryFn: () => getProfessorById(professorId),
    initialData: queryClient
      .getQueryData<Professor[]>(["professors"])
      ?.find((p: Professor) => p.id === professorId),
  });
}
