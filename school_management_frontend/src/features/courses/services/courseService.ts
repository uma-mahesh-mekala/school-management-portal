const coursesUrl = 'http://localhost:8080/api/courses';


export async function addCourse(formData: FormData) {
    const courseName = formData.get("name") as string;
    const credits = parseFloat(formData.get("credits") as string) as unknown as number;

    const newCourse = {
            courseName,
            credits,
        }
    try {
        const addCourseResponse = await fetch(coursesUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            mode: 'cors',
            body: JSON.stringify(newCourse),
        });

        if(!addCourseResponse.ok) {
            throw new Error("Error");
        }

        return addCourseResponse.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getCourses() {

    try {
        const getCoursesResponse = await fetch(coursesUrl, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            mode: 'cors'
        });

        if(!getCoursesResponse.ok) {
            throw new Error("Error");
        }

        return getCoursesResponse.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getCourseById(id: string) {
    const getCourseByIdUrl = `${coursesUrl}/${id}`;
    console.log(getCourseByIdUrl)
    try {
        const getCourseByIdResponse = await fetch(getCourseByIdUrl, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            mode: 'cors'
        });

        if(!getCourseByIdResponse.ok) {
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
    const credits = parseFloat(formData.get("credits") as string) as unknown as number;

    const updatedCourse = {
            id: courseId,
            courseName,
            credits,
        }
    try {
        const getCourseByIdResponse = await fetch(updateCourseByIdUrl, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            mode: 'cors',
            body: JSON.stringify(updatedCourse),
        });

        if(!getCourseByIdResponse.ok) {
            throw new Error("Error");
        }

        return getCourseByIdResponse.json();
    } catch (error) {
        console.log(error);
    }
}

export async function deleteCourse(courseId: string) {
    const deleteCourseByIdUrl = `${coursesUrl}/${courseId}`;

    const confirmDelete = window.confirm("Do you want to delete the course?");
    if(confirmDelete) {
    try {
        const getCourseByIdResponse = await fetch(deleteCourseByIdUrl, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            mode: 'cors',
        });

        if(!getCourseByIdResponse.ok) {
            throw new Error("Error");
        }

        return getCourseByIdResponse.json();
    } catch (error) {
        console.log(error);
    }
    }
}

