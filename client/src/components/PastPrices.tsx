import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';

const PastPricesTextField: React.FC<{ pastPrices: number[] | undefined }> = ({ pastPrices }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    margin='dense'
                    label="Geçmiş Fiyatlar"
                    variant="outlined"
                    fullWidth
                    value={'Geçmiş Fiyatlar İçin Tıklayınız'}
                    onClick={handleOpen}
                />
                <ForwardRoundedIcon fontSize= 'large' color='primary' onClick={handleOpen} />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Geçmiş Fiyatlar</DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sıra No</TableCell>
                                    <TableCell>Fiyat</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pastPrices?.map((price, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{price} ₺</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PastPricesTextField;