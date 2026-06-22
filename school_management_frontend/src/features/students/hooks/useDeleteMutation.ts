import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent } from "../services/studentService";

export function useDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentId: number) => deleteStudent(studentId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
