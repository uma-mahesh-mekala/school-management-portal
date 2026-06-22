import { useParams, useNavigate } from "react-router-dom";
import CourseForm from "../components/CourseForm";
import { useGetCourseById } from "../hooks/useGetCoursesById";
import { useUpdateMutation } from "../hooks/useUpdateCourse";

export default function EditCoursePage() {
  const params = useParams();
  const navigate = useNavigate();
  const courseId = Number(params.courseId);

  const updateCourseMutation = useUpdateMutation();

  const { data, isError, isLoading } = useGetCourseById(courseId);

  async function editCourse(formData: FormData) {
    updateCourseMutation.mutate({ formData, courseId });
    navigate("/courses");
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
