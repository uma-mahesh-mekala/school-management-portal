import authStorage from "../../auth/utils/authStorage";

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
  try {
    const accessToken = authStorage.getAccessToken();
    const addCourseResponse = await fetch(coursesUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      mode: "cors",
      body: JSON.stringify(newCourse),
    });

    if (!addCourseResponse.ok) {
      throw new Error("Error");
    }

    return addCourseResponse.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getCourses() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const getCoursesResponse = await fetch(coursesUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      mode: "cors",
    });

    if (!getCoursesResponse.ok) {
      throw new Error("Error");
    }

    return getCoursesResponse.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getCourseById(id: string) {
  const getCourseByIdUrl = `${coursesUrl}/${id}`;

  try {
    const accessToken = authStorage.getAccessToken();
    const getCourseByIdResponse = await fetch(getCourseByIdUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      mode: "cors",
      credentials: "include",
    });

    if (!getCourseByIdResponse.ok) {
      throw new Error("Error");
    }

    return getCourseByIdResponse.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateCourse(formData: FormData, courseId: string) {
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
  try {
    const accessToken = authStorage.getAccessToken();
    const getCourseByIdResponse = await fetch(updateCourseByIdUrl, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      mode: "cors",
      body: JSON.stringify(updatedCourse),
    });

    if (!getCourseByIdResponse.ok) {
      throw new Error("Error");
    }

    return getCourseByIdResponse.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCourse(courseId: number) {
  const deleteCourseByIdUrl = `${coursesUrl}/${courseId}`;

  const confirmDelete = window.confirm("Do you want to delete the course?");
  if (confirmDelete) {
    try {
      const accessToken = authStorage.getAccessToken();
      const deleteCourseByIdResponse = await fetch(deleteCourseByIdUrl, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        mode: "cors",
      });

      if (!deleteCourseByIdResponse.ok) {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
