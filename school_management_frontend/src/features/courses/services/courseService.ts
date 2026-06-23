import { apiFetch } from "../../../api/apiClient";
const coursesUrl = `${import.meta.env.VITE_BACKEND_URL}/courses`;

export async function addCourse(formData: FormData) {
  const courseName = formData.get("name") as string;
  const credits = parseFloat(
    formData.get("credits") as string,
  ) as unknown as number;

  const newCourse = {
    courseName,
    credits,
  };
  const addNewCourseResponse = await apiFetch(coursesUrl, {
    method: "POST",
    body: JSON.stringify(newCourse),
  });

  return addNewCourseResponse.json();
}

export async function getCourses(search: string | undefined) {
  const queryParams = new URLSearchParams();

  if (search?.trim()) {
    queryParams.append("search", search);
  }
  const queryString = queryParams.toString();
  const getCoursesResponse = await apiFetch(
    `${coursesUrl}?${queryParams ? queryString : ""}`,
  );
  return getCoursesResponse.json();
}

export async function getCourseById(id: number) {
  const getCourseByIdUrl = `${coursesUrl}/${id}`;

  const getCoursesByIdResponse = await apiFetch(getCourseByIdUrl);
  return getCoursesByIdResponse.json();
}

export async function updateCourse(formData: FormData, courseId: number) {
  const updateCourseByIdUrl = `${coursesUrl}/${courseId}`;
  const courseName = formData.get("name") as string;
  const credits = parseFloat(
    formData.get("credits") as string,
  ) as unknown as number;

  const updatedCourse = {
    id: courseId,
    courseName,
    credits,
  };
  const updatedCourseResponse = await apiFetch(updateCourseByIdUrl, {
    method: "PUT",
    body: JSON.stringify(updatedCourse),
  });

  return updatedCourseResponse.json();
}

export async function deleteCourse(courseId: number) {
  const deleteCourseByIdUrl = `${coursesUrl}/${courseId}`;

  const confirmDelete = window.confirm("Do you want to delete the course?");
  if (confirmDelete) {
    const deleteCourseByIdResponse = await apiFetch(deleteCourseByIdUrl, {
      method: "DELETE",
    });

    if (!deleteCourseByIdResponse.ok) {
      throw new Error("Delete Unsuccessfull");
    }
    return;
  }
}
