import { useNavigate } from "react-router";
import StudentForm from "../components/StudentForm";
import { addStudent } from "../services/studentService";

export default function AddStudentPage() {
    const navigate = useNavigate()
    async function addNewStudent(formData: FormData) {
        await addStudent(formData);
        navigate("/students")
    }

    return <StudentForm
                title= 'Add Student'
                description="Add a new student"
                submitAction={addNewStudent}
                submitText="Add Student"
            />
}