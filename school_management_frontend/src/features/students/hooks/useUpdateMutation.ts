import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "../services/studentService";
import type { UpdateStudentRequest } from "../types/types";
export function useUpdateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, studentId }: UpdateStudentRequest) =>
      updateStudent(formData, studentId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
