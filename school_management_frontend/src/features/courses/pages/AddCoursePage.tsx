import { useNavigate } from "react-router";
import CourseForm from "../components/CourseForm";
import { useAddMutation } from "../hooks/useAddCourse";

export default function AddCoursePage() {
  const navigate = useNavigate();
  const addCourseMutation = useAddMutation();

  async function addNewCourse(formData: FormData) {
    addCourseMutation.mutate(formData);
    navigate("/courses");
  }

  return (
    <CourseForm
      title="Add Course"
      description="Add a new course to make available for students"
      submitAction={addNewCourse}
      submitText="Add Course"
    />
  );
}
