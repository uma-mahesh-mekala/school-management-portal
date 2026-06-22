import { useNavigate } from "react-router";
import ProfessorForm from "../components/ProfessorForm";
import { useAddMutation } from "../hooks/useAddMutation";

export default function AddProfessorPage() {
  const navigate = useNavigate();
  const addProfessorMutation = useAddMutation();
  async function addNewProfessor(formData: FormData) {
    addProfessorMutation.mutate(formData);
    navigate("/professors");
  }

  return (
    <ProfessorForm
      title="Add Professor"
      description="Add a new professor to teaching staff"
      submitAction={addNewProfessor}
      submitText="Add Professor"
    />
  );
}
