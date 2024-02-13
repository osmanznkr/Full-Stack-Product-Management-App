import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteProductById, getProducts } from '../redux/slices/productSlice';
import { RootState } from '../redux/store';
import moment from 'moment';
import 'moment/locale/tr';
import { openDialog } from '../redux/slices/dialogSlice';
import FormDialog from '../components/FormDialog';

export default function Homepage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.products);
    const [productId, setProductId] = React.useState<number>();
    const isOpen = useAppSelector((state: RootState) => state.dialog.isOpen);

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
        { field: 'id', headerName: 'ID', minWidth: 90, flex: 0.2 },
        { field: 'product_name', headerName: 'ÜRÜN ADI', minWidth: 200, flex: 0.3 },
        { field: 'category_name', headerName: 'KATEGORİ', minWidth: 150, flex: 0.2 },
        { field: 'current_price', headerName: 'FİYAT (₺)', type: 'number', minWidth: 120, flex: 0.2 },
        { field: 'stock', headerName: 'STOK', type: 'number', minWidth: 120, flex: 0.3 },
        { field: 'created_at', headerName: 'OLUŞTURULMA TARİHİ', minWidth: 400, flex: 0.3 },
        {
            field: 'actions',
            flex: 0.3,
            headerName: 'İŞLEMLER',
            width: 200,
            renderCell: (params) => (
                <div style={{display:'flex', gap:10}}>
                    <Button type='button' size='small' onClick={() => handleDetails(params.row.id)} variant="contained" color="primary">DETAY</Button>
                    <Button type='button' size='small' onClick={() => handleDelete(params.row.id)} variant="contained" color="error">SİL</Button>
                </div>
            ),
        }
    ];

    const handleDetails = (id: number) => {
        setProductId(id);
        dispatch(openDialog());
        console.log(`Detay butonuna tıklandı. Ürün ID: ${id}`);
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
        <Box sx={{ height: 480, width: '95%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
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
            {isOpen && <FormDialog product_id={productId} />}
        </Box>
    );
}
