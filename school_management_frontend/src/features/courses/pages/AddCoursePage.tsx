import { useNavigate } from "react-router";
import CourseForm from "../components/CourseForm";
import { addCourse } from "../services/courseService";

export default function AddCoursePage() {
    const navigate = useNavigate()
  async function addNewCourse(formData: FormData) {
    await addCourse(formData);
    navigate("/courses")
  }

  return <CourseForm
            title= 'Add Course'
            description="Add a new course to make available for students"
            submitAction={addNewCourse}
            submitText="Add Course"
          />
}