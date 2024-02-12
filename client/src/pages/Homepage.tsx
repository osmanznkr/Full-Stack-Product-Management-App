import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProducts } from '../redux/slices/productSlice';
import { RootState } from '../redux/store';
import moment from 'moment';
import 'moment/locale/tr'

export default function Homepage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.products);
    const [productId, setProductId] = React.useState<number>();

    React.useEffect(() => {
        dispatch(getProducts());
    }, []);

    interface Product {
        id: number;
        product_name: string;
        category_name: string;
        current_price: number;
        stock: number;
        past_prices?: number[];
        barcode?: string;
        created_at: string;
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'product_name', headerName: 'ÜRÜN ADI', width: 200 },
        { field: 'category_name', headerName: 'KATEGORİ', width: 150 },
        { field: 'current_price', headerName: 'FİYAT (₺)', type: 'number', width: 120 },
        { field: 'stock', headerName: 'STOK', type: 'number', width: 120 },
        { field: 'created_at', headerName: 'OLUŞTURULMA TARİHİ', width: 230 },
    ];

    

    const rows: Product[] = products.products.map((product) => ({
        id: product?.product_id,
        product_name: product?.product_name,
        category_name: product?.category_name,
        current_price: product?.current_price,
        stock: product?.stock,
        created_at: moment(product?.created_at).format('Do MMMM YYYY dddd HH:mm ') || "",
    }));

    return (
        <Box sx={{ height: 480, width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                // pageSize={5}
                // rowsPerPageOptions={[5]}
                checkboxSelection
                // disableSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell': {
                        borderBottom: 1,
                        borderColor: 'lightgray'
                    },
                    '& .MuiDataGrid-iconSeparator': {
                        color: '#2196f3'
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#2196f3',
                        color: 'white',
                    },
                    '& .MuiDataGrid-row:nth-of-type(even)': {
                        backgroundColor: '#f5f5f5'
                    }
                }}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }]
                    }
                }}
            />
        </Box>
    );
}
