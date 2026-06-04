import { useNavigate } from "react-router";
import ProfessorForm from "../components/ProfessorForm";
import { addProfessor } from "../services/professorService";

export default function AddProfessorPage() {
    const navigate = useNavigate()
    async function addNewProfessor(formData: FormData) {
        await addProfessor(formData);
        navigate("/professors")
    }

    return <ProfessorForm
                title= 'Add Professor'
                description="Add a new professor to teaching staff"
                submitAction={addNewProfessor}
                submitText="Add Professor"
            />
}