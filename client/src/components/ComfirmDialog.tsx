// create a confirm dialog component for FormDialog.tsx component

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { closeDialog } from '../redux/slices/generalSlice';
import { updateProductById } from '../redux/slices/productSlice';
import { ConfirmDialogProps } from '../types/generalTypes';
 
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, productId, updatedProductData }) => {
    // Redux Hooks
    const dispatch = useAppDispatch();
    const isDialogOpen = useAppSelector((state: RootState) => state.general.isDialogOpen);

    // Event Handlers
    const handleConfirm = () => {
        dispatch(updateProductById({ productId: productId, updatedProductData: updatedProductData }));
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
            <DialogTitle id="alert-dialog-title">{"Ürünü güncellemek istediğinize emin misiniz?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Ürünü güncellemek istediğinize emin misiniz?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    İptal
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Onayla
                </Button>
            </DialogActions>
        </Dialog>
    );
};