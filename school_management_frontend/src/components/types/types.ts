export interface Column<T> {
    key: Extract<keyof T, string>,
    label: string
}

export interface TableProps<T>{
    columns: Column<T>[];
    data: T[];
    renderActions?: (row: T) => React.ReactNode | undefined
}