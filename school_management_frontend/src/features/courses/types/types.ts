export interface CourseFormProps {
    title: string;
    description: string;
    submitAction: (formData: FormData) => void;
    initialValues?: {
        courseName: string;
        credits: number;
    };
    submitText: string;

}

export interface Course {
    id: string;
    courseName: string;
    credits: number;
}