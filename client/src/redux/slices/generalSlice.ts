import { createSlice } from "@reduxjs/toolkit";
import { DialogState } from "../../types/generalTypes";

const initialState: DialogState = {
    isDialogOpen: false,
    isSnackbarOpen: false
};

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        openDialog(state) {
            state.isDialogOpen = true;
        },
        closeDialog(state) {
            state.isDialogOpen = false;
        },
        openSnackbar(state) {
            state.isSnackbarOpen = true;
        },
        closeSnackbar(state) {
            state.isSnackbarOpen = false;
        },
    },
});

export const { openDialog, closeDialog, openSnackbar, closeSnackbar } = generalSlice.actions;

export default generalSlice.reducer;