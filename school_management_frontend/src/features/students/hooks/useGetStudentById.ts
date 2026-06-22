import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentById } from "../services/studentService";
import type { Student } from "../types/types";

export function useGetStudentById(studentId: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getStudentById(studentId),
    initialData: queryClient
      .getQueryData<Student[]>(["students"])
      ?.find((s: Student) => s.id === studentId),
  });
}
