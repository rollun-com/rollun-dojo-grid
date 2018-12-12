export interface Column {
    field: string;
    label?: string;
}

export interface Item<T = any> {
    id: string;
    data: T;
}
