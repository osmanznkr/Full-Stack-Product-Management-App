import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../api';
import { NewUser, User, UserState } from '../../types/userTypes';
import axiosInstance from '../../api/axiosInstance';


const initialState: UserState = {
    user: [],
    users: [],
    loading: false,
    error: ''
}

export const getUsers = createAsyncThunk(
    'users',
    async () => {
        return await axiosInstance.get(`${BASE_URL}/users`)
            .then((response) => response.data)
    },
);

export const getUserDetailById = createAsyncThunk(
    'getUserById',
    async (id: number) => {
        return await axiosInstance.get(`${BASE_URL}/users/${id}`)
            .then((response) => response.data)
    },
);

export const getUserDetailByUsername = createAsyncThunk(
    'getUserByUsername',
    async (username: string) => {
        return await axiosInstance.get(`${BASE_URL}/user/${username}`)
            .then((response) => response.data)
    },
);

export const addUser = createAsyncThunk(
    'addUser',
    async (userData: NewUser) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}auth/register`, userData);
            return response.data; // Başarılı ekleme durumunda, eklenen kullanıcıyı döndürüyoruz
        } catch (error) {
            throw Error('Kullanıcı eklenirken bir hata oluştu.'); // Hata durumunda istisna fırlatıyoruz
        }
    },
);

export const updateUserById = createAsyncThunk(
    'users/updateUserById',
    async (payload: { id: number, updatedUserData: Partial<User> }) => {
        const { id, updatedUserData } = payload;
        try {
            await axiosInstance.put(`${BASE_URL}/users/update/${id}`, updatedUserData);
            return { id, updatedUserData }; // Başarılı güncelleme durumunda, güncellenen Kullanıcıün ID'sini ve güncellenen verileri döndürüyoruz
        } catch (error) {
            throw Error('Kullanıcı güncellenirken bir hata oluştu.'); // Hata durumunda istisna fırlatıyoruz
        }
    },
);

export const deleteUserById = createAsyncThunk(
    'deleteUserById',
    async (id: number) => {
        try {
            await axiosInstance.delete(`${BASE_URL}/users/delete/${id}`);
            return id; // Başarılı silme durumunda, silinen ürünün ID'sini döndürüyoruz
        } catch (error) {
            throw Error('Kullanıcı silinirken bir hata oluştu.'); // Hata durumunda istisna fırlatıyoruz
        }
    },
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message || 'Hata'
        });
        builder.addCase(getUserDetailById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserDetailById.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUserDetailById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata'
        });
        builder.addCase(getUserDetailByUsername.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserDetailByUsername.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUserDetailByUsername.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata'
        });
        builder.addCase(addUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.users.push(action.payload); // Eklenen kullanıcıyı state içindeki kullanıcılar listesine ekliyoruz
            alert('Yeni kullanıcı eklendi')
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata';
        });
        builder.addCase(updateUserById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserById.fulfilled, (state, action: PayloadAction<{ id: number, updatedUserData: Partial<User> }>) => {
            state.loading = false;
            console.log('Kullanıcı başarıyla güncellendi. Güncellenen Kullanıcı ID:', action.payload.id);
            state.users = state.users.map(user => {
                if (user.id === action.payload.id) {
                    return { ...user, ...action.payload.updatedUserData };
                }
                return user;
            });
        });
        builder.addCase(updateUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata'
        });
        builder.addCase(deleteUserById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUserById.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.users = state.users.filter(user => user.id !== action.payload);
            console.log('Kullanıcı başarıyla silindi. Silinen Kullanıcı ID:', action.payload);
            alert('Kullanıcı başarıyla silindi')
        });
        builder.addCase(deleteUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata'
        });

    },
});

export default userSlice.reducer;