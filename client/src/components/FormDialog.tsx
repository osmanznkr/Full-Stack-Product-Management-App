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
import { closeDialog } from "../redux/slices/generalSlice";
import { getProductDetail, updateProductById } from "../redux/slices/productSlice";
import { getCategories } from "../redux/slices/categorySlice";
import moment from 'moment';
import 'moment/locale/tr'
import PastPricesTextField from "./PastPrices";
import { FormDialogProps } from "../types/generalTypes";
import { ConfirmDialog } from "./ComfirmDialog";

const FormDialog: React.FC<FormDialogProps> = ({ product_id }) => {
    // State Hooks
    const [formData, setFormData] = useState<any>({});
    const [categories, setCategories] = useState<any[]>([]);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    // Redux Hooks
    const dispatch = useAppDispatch();
    const product = useAppSelector((state: RootState) => state.products.product[0]);
    const isDialogOpen = useAppSelector((state: RootState) => state.general.isDialogOpen);
    const isAdmin = useAppSelector((state: RootState) => state.auth.isAdmin)

    // Effects
    useEffect(() => {
        if (product_id !== undefined) {
            dispatch(getProductDetail(product_id));
            dispatch(getCategories());
        }
    }, [product_id, dispatch]);

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

    const handleConfirmDialogOpen = () => {
        setConfirmDialogOpen(true);
    };

    const updatedProductData = {
        product_name: formData.productName,
        category: formData.category,
        current_price: formData.price,
        stock: formData.stock,
        barcode: formData.barcode,
        creationDate: formData.creationDate,
    };

    const handleSubmit = () => {
        if (product_id !== undefined) {
           
            handleConfirmDialogOpen();
            // dispatch(updateProductById({ productId: product_id, updatedProductData }));
            // handleClose();
        }
    };

    

    moment.locale('TR-tr')

    console.log('formdata', formData)

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleClose} aria-labelledby="edit-apartment">
                <DialogTitle id="edit-apartment">Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>Ürün Bilgileri</DialogContentText>
                    <TextField
                        margin="dense"
                        id="productName"
                        label="Ürün Adı"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.productName}
                        onChange={(e) => isAdmin && setFormData({ ...formData, productName: e.target.value })}
                        InputProps={{
                            readOnly: !isAdmin,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="category"
                        label="Kategori"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.category}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Fiyat"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.price}
                        onChange={(e) => isAdmin && setFormData({ ...formData, price: e.target.value })}
                        InputProps={{
                            readOnly: !isAdmin,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="stock"
                        label="Stok"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.stock}
                        onChange={(e) => isAdmin && setFormData({ ...formData, stock: e.target.value })}
                        InputProps={{
                            readOnly: !isAdmin,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="barcode"
                        label="Barkod"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.barcode}
                        onChange={(e) => isAdmin && setFormData({ ...formData, barcode: e.target.value })}
                        InputProps={{
                            readOnly: !isAdmin,
                        }}
                    />
                    {product?.past_prices !== null ? (
                        <PastPricesTextField pastPrices={product?.past_prices} />
                    ) : undefined}
                    <TextField
                        margin="dense"
                        id="creationDate"
                        label="Oluşturulma Tarihi"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={formData.creationDate}
                        InputProps={{
                            readOnly: true,
                        }}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        İptal
                    </Button>
                    {isAdmin && (
                        <Button variant="contained" onClick={handleSubmit} color="primary">
                            Güncelle
                        </Button>
                    )}
                </DialogActions>
                <ConfirmDialog updatedProductData={updatedProductData} open={confirmDialogOpen} onClose={handleClose} productId={product_id || 0} />
            </Dialog>
        </div>
    );
};

export default FormDialog;
