import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseForm from "../components/CourseForm";
import { getCourseById, updateCourse } from "../services/courseService";

export default function EditCoursePage() {
    const [course, setCourse] = useState(null); 
    const params = useParams();
    const navigate = useNavigate();
    const courseId = params.courseId as string;

    
    useEffect(() => {
        async function fetchCourseById(id: string) {
            const course = await getCourseById(id);
            setCourse(course);
        }

        fetchCourseById(courseId);
    }, [])

    async function editCourse(formData: FormData) {
        await updateCourse(formData, courseId);
        navigate("/courses");
        
    }

  
    if(!course) {
        return <div>Loading...</div>
    }  

  return <CourseForm
            title= 'Edit Course'
            description="Please update the course details"
            submitAction={editCourse}
            submitText="Edit"
            initialValues={course}
          />
}