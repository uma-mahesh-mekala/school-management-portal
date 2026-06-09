import type { Student } from "../types/types";

const studentsUrl = `${import.meta.env.VITE_BACKEND_URL}/students`;

export async function addStudent(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const dateOfBirth = formData.get("dateOfBirth");
    const dateOfJoining = formData.get("dateOfJoining");

    const newStudent = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        dateOfJoining,
    }

    try {
        const addStudentResponse = await fetch(studentsUrl, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    mode: "cors"
                },
                body: JSON.stringify(newStudent)
            });
        
        if(!addStudentResponse.ok) {
            throw new Error("Error");
        }
    } catch (error) {
        console.log(error)
    }
    
}
export async function getStudents() {
    try {
        const getStudentsResponse = await fetch(studentsUrl, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            mode: "cors"
        })

        if(!getStudentsResponse.ok) {
            throw new Error("Error");
        }

        const students = await getStudentsResponse.json();
        return students.map((student: Student) => ({
            ...student,
            fullName: `${student.firstName} ${student.lastName}`
        }))

    } catch (error) {
        console.log(error);
    }
}

export async function getStudentById(id: string) {
    const studentByIdUrl = `${studentsUrl}/${id}`
    const getStudentByIdResponse = await fetch(studentByIdUrl, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        },
        mode: "cors"
    })

    if(!getStudentByIdResponse.ok) {
        throw new Error("Error");
    }

    const student = await getStudentByIdResponse.json();
    return {
        ...student,
        fullName: `${student.firstName} ${student.lastName}`
    }
}

export async function updateStudent(formData: FormData, id: string) {
    const updateStudentsUrl = `${studentsUrl}/${id}`;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const dateOfBirth = formData.get("dateOfBirth");
    const dateOfJoining = formData.get("dateOfJoining");

    const studentDetailsToUpdate = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        dateOfJoining,
    }

    try {
        const updateStudentResponse = await fetch(updateStudentsUrl, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    mode: "cors"
                },
                body: JSON.stringify(studentDetailsToUpdate)
            });
        
        if(!updateStudentResponse.ok) {
            throw new Error("Error");
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteStudent(id: number) {
    const deleteStudentByIdUrl = `${studentsUrl}/${id}`;

    const confirmDelete = window.confirm("Do you want to delete the Student?");
    if(confirmDelete) {
        try {
            const deleteStudentByIdResponse = await fetch(deleteStudentByIdUrl, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                },
                mode: 'cors',
            });

            if(!deleteStudentByIdResponse.ok) {
                throw new Error("Error");
            }
        } catch (error) {
            console.log(error);
        }
    }      
}