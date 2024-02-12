export interface Column {
    id: 'name' | 'category' | 'price' | 'stock' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export interface FormDialogProps {
    product_id?: number | undefined;
}

export interface DialogState {
    isOpen: boolean;
}
