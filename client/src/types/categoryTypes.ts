export interface Category {
    category_id: number;
    category_name: string;
}
export interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string
}