import {createSlice } from "@reduxjs/toolkit";


interface DialogState {
    isAuth: boolean;
    isAdmin: boolean;
    user: [];
}

const userAuthFromLocalStorage = () => {
    const isAuth = localStorage.getItem('isAuth')

    if (isAuth && JSON.parse(isAuth) === true) {
        return true
    }

    return false
}

const userIsAdmin = () => {
    const isAdmin = localStorage.getItem('isAdmin')

    if (isAdmin && JSON.parse(isAdmin) === true) {
        return true
    }

    return false
}

const initialState: DialogState = {
    isAuth: userAuthFromLocalStorage(),
    isAdmin: userIsAdmin(),
    user: []
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticateUser(state) {
            state.isAuth = true;
        },
        unAuthenticateUser(state) {
            state.isAuth = false;
        },
        authenticateAdmin(state) {
            state.isAdmin = true;
        },
        unAuthenticateAdmin(state) {
            state.isAdmin = false;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { authenticateUser, unAuthenticateUser, authenticateAdmin, unAuthenticateAdmin, setUser } = authSlice.actions;

export default authSlice.reducer;