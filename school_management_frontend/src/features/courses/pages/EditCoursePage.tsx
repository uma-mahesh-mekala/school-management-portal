import { useParams, useNavigate } from "react-router-dom";
import CourseForm from "../components/CourseForm";
import { getCourseById, updateCourse } from "../services/courseService";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Course } from "../types/types";

export default function EditCoursePage() {
  const params = useParams();
  const navigate = useNavigate();
  const courseId = params.courseId as string;
  const queryClient = useQueryClient();

  const updateCourseMutation = useMutation({
    mutationFn: (formData: FormData) => updateCourse(formData, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });

      navigate("/courses");
    },
  });
  
  const { data, isError, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    initialData: () =>
      queryClient
        .getQueryData<Course[]>(["courses"])
        ?.find((c) => String(c.id) === courseId),
  });

  async function editCourse(formData: FormData) {
    updateCourseMutation.mutate(formData);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Course not found</div>;
  }

  return (
    <CourseForm
      title="Edit Course"
      description="Please update the course details"
      submitAction={editCourse}
      submitText="Edit"
      initialValues={data}
    />
  );
}
