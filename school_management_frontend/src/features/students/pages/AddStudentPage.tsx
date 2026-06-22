import { useNavigate } from "react-router";
import StudentForm from "../components/StudentForm";
import { useAddMutation } from "../hooks/useAddMutation";

export default function AddStudentPage() {
  const navigate = useNavigate();
  const addStudentMutation = useAddMutation();
  async function addNewStudent(formData: FormData) {
    addStudentMutation.mutate(formData);
    navigate("/students");
  }

  return (
    <StudentForm
      title="Add Student"
      description="Add a new student"
      submitAction={addNewStudent}
      submitText="Add Student"
    />
  );
}
