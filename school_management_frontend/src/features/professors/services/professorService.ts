import { apiFetch } from "../../../api/apiClient";
import type { Department } from "../types/types";

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
  };

  const addProfessorResponse = await apiFetch(professorsUrl, {
    method: "POST",
    body: JSON.stringify(newProfessor),
  });

  return addProfessorResponse.json();
}

export async function getProfessors() {
  const getProfessorResponse = await apiFetch(professorsUrl);

  const professors = await getProfessorResponse.json();
  return professors;
}

export async function getProfessorById(id: number) {
  const professorByIdUrl = `${professorsUrl}/${id}`;

  const getProfessorByIdResponse = await apiFetch(professorByIdUrl);
  const professor = await getProfessorByIdResponse.json();
  console.log(professor)
  return {
    ...professor,
    fullName: `${professor.firstName} ${professor.lastName}`,
  };
}

export async function updateProfessor(formData: FormData, professorId: number) {
  const updateProfessorUrl = `${professorsUrl}/${professorId}`;
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
  };

  const updateProfessorResponse = await apiFetch(updateProfessorUrl, {
    method: "PUT",
    body: JSON.stringify(professorDetailsToUpdate),
  });

  return updateProfessorResponse.json();
}

export async function deleteProfessor(id: number) {
  const deleteProfessorByIdUrl = `${professorsUrl}/${id}`;

  const confirmDelete = window.confirm("Do you want to delete the professor?");
  if (confirmDelete) {
    const deleteProfessorByIdResponse = await apiFetch(deleteProfessorByIdUrl, {
      method: "DELETE",
      body: JSON.stringify({})
    });

    if (!deleteProfessorByIdResponse.ok) {
      throw new Error("Delete Unsuccessfull");
    }
    return;
  }
}
