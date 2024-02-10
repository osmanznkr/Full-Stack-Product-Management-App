import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getProducts } from '../redux/productSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { Button } from '@mui/material';

interface Column {
    id: 'name' | 'category' | 'price' | 'stock' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}


const columns: readonly Column[] = [
    { id: 'name', label: 'ÜRÜN ADI', minWidth: 170 },
    { id: 'category', label: 'KATEGORİ', minWidth: 100 },
    {
        id: 'price',
        label: 'FİYAT',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'stock',
        label: 'STOK',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: 'İŞLEMLER',
        minWidth: 340,
        align: 'right',
    },
];


export default function Products() {
    const dispatch = useAppDispatch();


    React.useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const products = useAppSelector((state: RootState) => state.products.products)

    console.log(products)


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const showDetail = () => {
        console.log("detail ");
    };

    const handleDelete = () => {

        console.log("Sil ");
    };

    return (
        <Paper sx={{ width: '80%', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
            <TableContainer sx={{ maxHeight: 470 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products && products.map((product) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={product.product_id}>
                                    <TableCell>{product.product_name}</TableCell>
                                    <TableCell>{product.category_id}</TableCell>
                                    <TableCell align="right">{product.current_price} ₺</TableCell>
                                    <TableCell align="right">{product.stock}</TableCell>
                                    <TableCell align="right">
                                        <Button style={{ marginRight: '10px' }} onClick={showDetail} variant="contained" color="primary">DETAY</Button>
                                        <Button variant="contained" color="error">SİL</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
