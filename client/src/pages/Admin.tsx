import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteProductById, getProducts } from '../redux/slices/productSlice';
import { RootState } from '../redux/store';
import { openDialog, openSnackbar } from '../redux/slices/generalSlice';
import FormDialog from '../components/FormDialog';
import { User } from '../types/userTypes';
import { deleteUserById, getUsers } from '../redux/slices/userSlice';
import UserModal from '../components/UserModal';


export default function Admin() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state: RootState) => state.users.users);
    const [userId, setUserId] = useState<number>();
    const isAdmin = useAppSelector((state: RootState) => state.auth.isAdmin);

    React.useEffect(() => {
        dispatch(getUsers());
    }, []);


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', minWidth: 45, flex: 0.1 },
        { field: 'username', headerName: 'Kullanıcı Adı', minWidth: 80, flex: 0.2 },
        { field: 'user_email', headerName: 'E-posta', minWidth: 100, flex: 0.2 },
        { field: 'user_phone', headerName: 'Telefon', minWidth: 60, flex: 0.2 },
        { field: 'user_role', headerName: 'Rol', minWidth: 50, flex: 0.3 },

        {    field: 'actions',
            flex: 0.1,
            headerName: 'İŞLEMLER',
            minWidth: 100,
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: 10 }}>
                   
                    {isAdmin && (
                        <Button type='button' size='small' onClick={() => handleDelete(params.row.id)} variant="contained" color="error">SİL</Button>
                    )}
                </div>
            ),
        }
    ];


    const handleDelete = (id: number) => {
        if (window.confirm("Ürünü silmek istediğinizden emin misiniz?")) {
            dispatch(deleteUserById(id));
        }
    };

    const rows: User[] = users.map((user) => ({
        id: user.id,
        username: user.username,
        user_email: user.user_email,
        user_phone: user.user_phone,
        user_role: user.user_role,
    }));

    return (
        <div >
            <Box sx={{ height: 480, width: '95%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
                {isAdmin && <UserModal />}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    sx={{
                        '& .MuiDataGrid-cell': {
                            borderBottom: 1,
                            borderColor: 'lightgray',
                        },
                        '& .MuiDataGrid-iconSeparator': {
                            color: '#2196f3',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'gray',
                            color: 'white',
                        },
                        '& .MuiDataGrid-row:nth-of-type(even)': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'id', sort: 'asc' }],
                        },
                    }}
                />
            </Box>
        </div>
    );
}
