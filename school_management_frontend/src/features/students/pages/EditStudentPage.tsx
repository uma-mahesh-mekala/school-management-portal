import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { useUpdateMutation } from "../hooks/useUpdateMutation";
import { useGetStudentById } from "../hooks/useGetStudentById";
import { Loader } from "lucide-react";

export default function EditStudentPage() {
  const params = useParams();
  const navigate = useNavigate();
  const updateStudentMutation = useUpdateMutation();
  const studentId = Number(params.studentId);

  const { data, isFetching } = useGetStudentById(studentId);

  async function editStudent(formData: FormData) {
    updateStudentMutation.mutate({ formData, studentId });
    navigate("/students");
  }

  if (isFetching) {
    return <Loader />;
  }

  return (
    <StudentForm
      title="Edit Student"
      description="Please update the student details"
      submitAction={editStudent}
      submitText="Edit"
      initialValues={data}
    />
  );
}
