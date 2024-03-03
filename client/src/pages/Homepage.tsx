import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteProductById, getProducts } from '../redux/slices/productSlice';
import { RootState } from '../redux/store';
import moment from 'moment';
import 'moment/locale/tr';
import { openDialog, openSnackbar } from '../redux/slices/generalSlice';
import FormDialog from '../components/FormDialog';
import SnackbarComp from '../components/SnackBar';
import ProductModal from '../components/Modal';


export default function Homepage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.products);
    const [productId, setProductId] = useState<number>();
    const isDialogopen = useAppSelector((state: RootState) => state.general.isDialogOpen);
    const isSnackbarOpen = useAppSelector((state: RootState) => state.general.isSnackbarOpen);
    const isAdmin = useAppSelector((state: RootState) => state.auth.isAdmin);

    React.useEffect(() => {
        dispatch(getProducts());
    }, []);

    interface Product {
        id: number;
        product_name: string;
        category_name: string;
        current_price: number;
        stock: number;
        created_at: string;
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', minWidth: 45, flex: 0.1 },
        { field: 'product_name', headerName: 'ÜRÜN ADI', minWidth: 70, flex: 0.2 },
        { field: 'category_name', headerName: 'KATEGORİ', minWidth: 75, flex: 0.2 },
        { field: 'current_price', headerName: 'FİYAT (₺)', type: 'number', minWidth: 60, flex: 0.1 },
        { field: 'stock', headerName: 'STOK', type: 'number', minWidth: 60, flex: 0.2 },
        { field: 'created_at', headerName: 'OLUŞTURULMA TARİHİ', minWidth: 200, flex: 0.3 },
        {
            field: 'actions',
            flex: 0.1,
            headerName: 'İŞLEMLER',
            minWidth: 180,
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: 10 }}>
                    <Button type='button' size='small' onClick={() => handleDetails(params.row.id)} variant="contained" color="primary">DETAY</Button>
                        {isAdmin && (
                     <Button type='button' size='small' onClick={() => handleDelete(params.row.id)} variant="contained" color="error">SİL</Button>
                    )}
                </div>
            ),
        }
    ];

    const handleDetails = (id: number) => {
        setProductId(id);
        dispatch(openDialog());
        console.log(`Detay butonuna tıklandı. Ürün ID: ${id}`);
        dispatch(openSnackbar())
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Ürünü silmek istediğinizden emin misiniz?")) {
            dispatch(deleteProductById(id));
        }
    };

    const rows: Product[] = products.products.map((product) => ({
        id: product?.product_id,
        product_name: product?.product_name,
        category_name: product?.category_name,
        current_price: product?.current_price,
        stock: product?.stock,
        created_at: moment(product?.created_at).format('Do MMMM YYYY dddd HH:mm ') || '',
    }));

    return (
        <div >
            <Box sx={{ height: 480, width: '95%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
               {isAdmin && <ProductModal/>}
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
                            backgroundColor: '#2196f3',
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
                {isDialogopen && <FormDialog product_id={productId} />}
                {/* {isSnackbarOpen && <SnackbarComp message="dialog açıldı" color="success" />} */}
            </Box>
        </div>
    );
}
