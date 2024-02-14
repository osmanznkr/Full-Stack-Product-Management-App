export interface User {
    id: number;
    username: string;
    user_password?: string;
    user_email: string;
    user_phone?: string;
    user_role?: string;
}

export interface UserState {
    user: User[]
    users: User[];
    loading: boolean;
    error: string
}

export interface NewUser {
    username: string;
    password: string;
    user_email: string;
    user_role: string;
    user_phone: string;
}