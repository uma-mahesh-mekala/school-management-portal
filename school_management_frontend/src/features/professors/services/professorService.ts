import professorsData from "../../../mockdata/professors";
import type { Professor, Department } from "../types/types";

export async function addProfessor(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const department = formData.get("department") as Department;
    const designation = formData.get("designation") as string;

    const newProfessor = {
        id: String(professorsData.length +1),
        firstName,
        lastName,
        email,
        department,
        designation,
    }

    professorsData.push(newProfessor)
    
}
export async function getProfessors() {
    const professors = professorsData.map((professor) => ({
        ...professor,
        fullName: `${professor.firstName + ' ' + professor.lastName}`
    }))
    return professors as Professor[];
}

export async function getProfessorById(id: string) {
    const professor = professorsData.find((prof) => prof.id === id);
    return professor as Professor;
}

export async function updateProfessor(formData: FormData, id: string) {
    const idx = professorsData.findIndex((prof) => prof.id === id);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const department = formData.get("department") as Department;
    const designation = formData.get("designation") as string;

    const updatedProfessor = {
        id,
        firstName,
        lastName,
        email,
        department,
        designation,
    };

    professorsData.splice(idx, 1, updatedProfessor);
}

export async function deleteProfessor(id: string) {
    const idx = professorsData.findIndex((prof) => prof.id === id);

    const confirmDelete = window.confirm("Do you want to delete the professor?");
    if(confirmDelete) {
        try {
            professorsData.splice(idx, 1);
            return getProfessors();
        } catch (error) {
            console.log(error);
        }
    }       
}