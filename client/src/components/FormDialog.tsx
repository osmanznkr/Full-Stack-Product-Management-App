import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { closeDialog } from "../redux/slices/dialogSlice";
import { getProductDetail } from "../redux/slices/productSlice";
import { getCategories } from "../redux/slices/categorySlice";
import moment from 'moment';
import 'moment/locale/tr'


interface FormDialogProps {
    product_id?: number | undefined;
}

const FormDialog: React.FC<FormDialogProps> = ({ product_id }) => {
    const [formData, setFormData] = useState<any>({});
    const [categories, setCategories] = useState<any[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (product_id !== undefined) {
            dispatch(getProductDetail(product_id));
            dispatch(getCategories());
        }
    }, [product_id, dispatch]);

    const product = useAppSelector((state: RootState) => state.products.product[0]);
    const isOpen = useAppSelector((state: RootState) => state.dialog.isOpen);

    useEffect(() => {
        if (product) {
            setFormData({
                productName: product.product_name || "",
                category: product.category_name || "",
                price: product.current_price || "",
                stock: product.stock || "",
                barcode: product.barcode || "",
                creationDate: moment(product.created_at).format('Do MMMM YYYY dddd HH:mm ') || ""
            });
        }
    }, [product]);

    useEffect(() => {
        if (categories) {
            setCategories(categories);
        }
    }, [categories]);

    const handleClose = () => {
        dispatch(closeDialog());
    };

    const handleSubmit = () => {
        console.log(formData);
        handleClose();
    };

    moment.locale('TR-tr')

    console.log('formdata', formData)

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="edit-apartment">
                <DialogTitle id="edit-apartment">Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>Ürün Bilgileri</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="productName"
                        label="Ürün Adı"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Kategori"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}      
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Fiyat"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="stock"
                        label="Stok"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="barcode"
                        label="Barkod"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.barcode}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="creationDate"
                        label="Oluşturulma Tarihi"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.creationDate}
                        onChange={(e) => setFormData({ ...formData, creationDate: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        İptal
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                        Güncelle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormDialog;
