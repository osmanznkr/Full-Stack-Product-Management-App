export interface Product {
    product_id: number;
    product_name: string;
    category_name: string;
    current_price: number;
    stock: number;
    past_prices?: number[];
    barcode?: string;
    created_at: string;
}

export interface ProductState {
    product: Product[]
    products: Product[];
    loading: boolean;
    error: string
}