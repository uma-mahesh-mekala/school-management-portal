import { getProfessors } from "../services/professorService";
import { useQuery } from "@tanstack/react-query";

export function useGetProfessor() {
  return useQuery({
    queryKey: ["professors"],
    queryFn: getProfessors,
  });
}
