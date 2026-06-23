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
  id: number;
  courseName: string;
  credits: number;
  enrolled?: boolean;
}

export interface CourseActionsProps {
  onDelete: (courseId: number) => void;
  role: string | null;
  course: Course;
  onEnroll: (courseId: number) => void;
  onUnEnroll: (courseId: number) => void;
}

export interface UpdateCourseRequest {
  formData: FormData;
  courseId: number;
}

export interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}
