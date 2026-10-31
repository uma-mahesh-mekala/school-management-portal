import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfessorById } from "../services/professorService";
import type { Professor } from "../types/types";

export function useGetProfessorById(professorId: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["professor", professorId],
    queryFn: () => getProfessorById(professorId),
    initialData: (() => {
      const cached = queryClient.getQueryData<any>(["professors"]);
      // `cached` may be an array of professors or a paginated object { content: Professor[] }
      const list: Professor[] | undefined = Array.isArray(cached) ? cached : cached?.content;
      return list?.find((p: Professor) => p.id === professorId);
    })(),
  });
}
