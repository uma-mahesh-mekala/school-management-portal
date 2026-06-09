import type { Professor, Department } from "../types/types";

const professorsUrl = `${import.meta.env.VITE_BACKEND_URL}/professors`;

export async function addProfessor(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const department = formData.get("department") as Department;
    const designation = formData.get("designation") as string;

    const newProfessor = {
        firstName,
        lastName,
        email,
        department,
        designation,
    }

    try {
        const addProfessorResponse = await fetch(professorsUrl, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    mode: "cors"
                },
                body: JSON.stringify(newProfessor)
            });
        
        if(!addProfessorResponse.ok) {
            throw new Error("Error");
        }
    } catch (error) {
        console.log(error)
    }
    
}
export async function getProfessors() {
    try {
        const getProfessorResponse = await fetch(professorsUrl, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            mode: "cors"
        })

        if(!getProfessorResponse.ok) {
            throw new Error("Error");
        }

        const professors = await getProfessorResponse.json();
        return professors.map((professor: Professor) => ({
            ...professor,
            fullName: `${professor.firstName} ${professor.lastName}`
        }))

    } catch (error) {
        console.log(error);
    }
}

export async function getProfessorById(id: string) {
    const professorByIdUrl = `${professorsUrl}/${id}`
    const getProfessorByIdResponse = await fetch(professorByIdUrl, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        },
        mode: "cors"
    })

    if(!getProfessorByIdResponse.ok) {
        throw new Error("Error");
    }

    const professor = await getProfessorByIdResponse.json();
    return {
        ...professor,
        fullName: `${professor.firstName} ${professor.lastName}`
    }
}

export async function updateProfessor(formData: FormData, id: string) {
    const updateProfessorUrl = `${professorsUrl}/${id}`;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const department = formData.get("department") as Department;
    const designation = formData.get("designation") as string;

    const professorDetailsToUpdate = {
        firstName,
        lastName,
        email,
        department,
        designation,
    }

    try {
        const updateProfessorResponse = await fetch(updateProfessorUrl, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    mode: "cors"
                },
                body: JSON.stringify(professorDetailsToUpdate)
            });
        
        if(!updateProfessorResponse.ok) {
            throw new Error("Error");
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProfessor(id: number) {
    const deleteProfessorByIdUrl = `${professorsUrl}/${id}`;

    const confirmDelete = window.confirm("Do you want to delete the professor?");
    if(confirmDelete) {
        try {
            const deleteProfessorByIdResponse = await fetch(deleteProfessorByIdUrl, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                },
                mode: 'cors',
            });

            if(!deleteProfessorByIdResponse.ok) {
                throw new Error("Error");
            }
        } catch (error) {
            console.log(error);
        }
    }      
}