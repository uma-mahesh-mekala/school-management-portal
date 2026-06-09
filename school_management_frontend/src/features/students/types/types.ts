export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    dateOfJoining: string;
    fullName?: string
}

export interface StudentFormProps {
    title: string,
    description: string;
    submitAction: (formDate: FormData) => void;
    initialValues?: Student;
    submitText: string;
}