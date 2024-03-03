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
    isDialogOpen: boolean;
    isSnackbarOpen: boolean;
}

export interface SnackbarProps {
    message: string;
    color: "error" | "warning" | "info" | "success";
}

export interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    productId: number;
    updatedProductData: {
        product_name: string;
        category: string;
        current_price: number;
        stock: number;
        barcode: string;
        creationDate: string;
    };
}