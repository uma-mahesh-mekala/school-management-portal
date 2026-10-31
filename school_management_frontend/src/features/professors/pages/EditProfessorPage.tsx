import { useParams, useNavigate } from "react-router-dom";
import ProfessorForm from "../components/ProfessorForm";
import { useUpdateMutation } from "../hooks/useUpdateMutation";
import { useGetProfessorById } from "../hooks/useGetProfessorById";
import { Loader } from "../../../components/ui/Loader";

export default function EditProfessorPage() {
  const params = useParams();
  const navigate = useNavigate();
  const updateProfessorMutation = useUpdateMutation();
  const professorId = Number(params.professorId);

  const { data, isFetching } = useGetProfessorById(professorId);
  console.log(data)
  async function editProfessor(formData: FormData) {
    updateProfessorMutation.mutate({ formData, professorId });
    navigate("/professors");
  }

  if (isFetching) {
    return <Loader />;
  }

  return (
    <ProfessorForm
      title="Edit Professor"
      description="Please update the professor details"
      submitAction={editProfessor}
      submitText="Edit"
      initialValues={data}
    />
  );
}
