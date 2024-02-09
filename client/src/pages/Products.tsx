import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

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

interface Data {
    name: string;
    category: string;
    price: number;
    stock: number;
}

function createData(
    name: string,
    category: string,
    price: number,
    stock: number,
): Data {
    return { name, category, price, stock };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

export default function Products() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleUpdate = (rowData: Data) => {
        // Güncelleme işlemi burada gerçekleştirilecek
        console.log("Güncelle: ", rowData);
    };

    const handleDelete = (rowData: Data) => {
        // Silme işlemi burada gerçekleştirilecek
        console.log("Sil: ", rowData);
    };

    return (
        <Paper sx={{ width: '80%', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell align="right">{row.price.toLocaleString('en-US')}</TableCell>
                                        <TableCell align="right">{row.stock.toLocaleString('en-US')}</TableCell>
                                        <TableCell align="right">
                                            <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => handleUpdate(row)}>DETAY</Button>
                                            <Button variant="contained" color="error" onClick={() => handleDelete(row)}>SİL</Button>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
