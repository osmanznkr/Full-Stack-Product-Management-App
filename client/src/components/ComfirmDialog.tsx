import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAppDispatch } from '../redux/hooks';
import { closeDialog } from '../redux/slices/generalSlice';
import { ConfirmDialogProps } from '../types/generalTypes';

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm, message }) => {
    // Redux Hooks
    const dispatch = useAppDispatch();

    // Event Handlers
    const handleConfirm = () => {
        onConfirm();
        dispatch(closeDialog());
    };

    const handleCancel = () => {
        dispatch(closeDialog());
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};