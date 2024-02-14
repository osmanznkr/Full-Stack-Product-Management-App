import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { closeSnackbar, openSnackbar } from '../redux/slices/generalSlice';
import { SnackbarProps } from '../types/generalTypes';

const SnackbarComp: React.FC<SnackbarProps> = ({ message, color }) => {
    const [open, setOpen] = React.useState(false);

    const dispatch = useAppDispatch();
    const isSnackbarOpen = useAppSelector((state: RootState) => state.general.isSnackbarOpen);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeSnackbar())
    };

    return (
        <div>
            <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={color}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SnackbarComp;