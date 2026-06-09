import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudentById, updateStudent } from "../services/studentService";
import type { Student } from "../types/types";

export default function EditStudentPage() {
    const [student, setStudent] = useState<Student | null>(null); 
    const params = useParams();
    const navigate = useNavigate();
    const studentId = params.studentId as string;

    
    useEffect(() => {
        async function fetchStudentById(id: string) {
            const studentById = await getStudentById(id);
            setStudent(studentById);
        }

        fetchStudentById(studentId);
    }, [studentId])

    async function editStudent(formData: FormData) {
        await updateStudent(formData, studentId);
        navigate("/students");        
    }

  
    if(!student) {
        return <div>Loading...</div>
    }  

  return <StudentForm
            title= 'Edit Student'
            description="Please update the student details"
            submitAction={editStudent}
            submitText="Edit"
            initialValues={student}
          />
}