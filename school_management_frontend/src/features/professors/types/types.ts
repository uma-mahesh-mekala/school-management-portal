export type Department = 'PHYSICS' | 'SCIENCE' | 'MATHEMATICS' | 'SOCIAL' | 'LANGUAGES';

export interface Professor {
    id: string;
    email: string;
    department: Department;
    designation: string;
    firstName: string;
    lastName: string;
    fullName?: string;
}

export interface ProfessorFormProps {
    title: string;
    description: string;
    submitAction: (formData: FormData) => void;
    initialValues?: {
        firstName: string;
        lastName: string;
        email: string;
        department: string;
        designation: string;
    };
    submitText: string;

}