import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../services/studentService";

export function useGetStudents() {
  return useQuery({
    queryFn: getStudents,
    queryKey: ["students"],
  });
}
