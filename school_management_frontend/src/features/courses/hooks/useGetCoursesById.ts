import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourseById } from "../services/courseService";
import type { Course } from "../types/types";

export function useGetCourseById(courseId: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    initialData: queryClient
      .getQueryData<Course[]>(["courses"])
      ?.find((c: Course) => c.id === courseId),
  });
}
