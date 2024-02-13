import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import Progress from '../components/Progress';
import FormDialog from '../components/FormDialog';
import { getProducts } from '../redux/slices/productSlice';
import { openDialog } from '../redux/slices/dialogSlice';
import { Column } from '../types/generalTypes';

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
    // State Hooks
    const [productId, setProductId] = React.useState<number>();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Redux Hooks
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.products);
    const isOpen = useAppSelector((state: RootState) => state.dialog.isOpen);

    // Effects
    React.useEffect(() => {
        dispatch(getProducts());
    }, []);

    // Functions
    const showDetail = React.useCallback((productId: number) => {
        if(productId !== undefined) {
            setProductId(productId);
        }
        
        dispatch(openDialog());
    }, [dispatch]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
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
                            {products.loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <Progress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products && products.products.map((product) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={product.product_id}>
                                        <TableCell>{product.product_name}</TableCell>
                                        <TableCell>{product.category_name}</TableCell>
                                        <TableCell align="right">{product.current_price} ₺</TableCell>
                                        <TableCell align="right">{product.stock}</TableCell>
                                        <TableCell align="right">
                                            <Button type='button' style={{ marginRight: '10px' }} onClick={() => showDetail(product.product_id)} variant="contained" color="primary">DETAY</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!products.loading && (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={products.products.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Paper>
            <Paper sx={{ width: '80%', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
                {isOpen && <FormDialog product_id={productId} />}
            </Paper>
        </div>
    );
}