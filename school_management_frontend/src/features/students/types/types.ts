export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  dateOfJoining: string;
  fullName?: string;
}

export interface StudentFormProps {
  title: string;
  description: string;
  submitAction: (formDate: FormData) => void;
  initialValues?: Student;
  submitText: string;
}

export interface StudentActionsProps {
  student: Student;
  onDelete: (studentId: number) => void;
}

export interface UpdateStudentRequest {
  formData: FormData;
  studentId: number;
}
