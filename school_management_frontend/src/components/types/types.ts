import type { Course } from "../../features/courses/types/types";
import type { Professor } from "../../features/professors/types/types";

export interface column {
    key: string,
    label: string
}

export interface TableProps{
    columns: column[];
    data: Course[] | Professor[];
    renderActions?: (row: Course | Professor) => React.ReactNode | undefined
}