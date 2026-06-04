import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfessorForm from "../components/ProfessorForm";
import { getProfessorById, updateProfessor } from "../services/professorService";
import type { Professor } from "../types/types";

export default function EditProfessorPage() {
    const [professor, setProfessor] = useState<Professor | null>(null); 
    const params = useParams();
    const navigate = useNavigate();
    const professorId = params.professorId as string;

    
    useEffect(() => {
        async function fetchProfessorById(id: string) {
            const professorById = await getProfessorById(id);
            setProfessor(professorById);
        }

        fetchProfessorById(professorId);
    }, [])

    async function editProfessor(formData: FormData) {
        await updateProfessor(formData, professorId);
        navigate("/professors");        
    }

  
    if(!professor) {
        return <div>Loading...</div>
    }  

  return <ProfessorForm
            title= 'Edit Professor'
            description="Please update the professor details"
            submitAction={editProfessor}
            submitText="Edit"
            initialValues={professor}
          />
}