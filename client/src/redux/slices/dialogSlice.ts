import { createSlice } from "@reduxjs/toolkit";
import { DialogState } from "../../types/generalTypes";

const initialState: DialogState = {
    isOpen: false,
};

const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        openDialog(state) {
            state.isOpen = true;
        },
        closeDialog(state) {
            state.isOpen = false;
        },
    },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;