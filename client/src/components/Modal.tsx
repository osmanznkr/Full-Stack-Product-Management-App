import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { getCategories } from "../redux/slices/categorySlice";
import { addProduct } from "../redux/slices/productSlice";
import { NewProduct } from "../types/productTypes";

export const ProductModal: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [productName, setProductName] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [price, setPrice] = useState<string>('');
    const [stock, setStock] = useState<string>('');
    const [barcode, setBarcode] = useState<string>('');
    const [productNameError, setProductNameError] = useState<string>('');
    const [categoryError, setCategoryError] = useState<string>('');
    const [priceError, setPriceError] = useState<string>('');
    const [stockError, setStockError] = useState<string>('');

    const dispatch = useAppDispatch();
    const categories = useAppSelector((state: RootState) => state.categories.categories);

   

    React.useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let isError = false;

        if (!productName) {
            setProductNameError('Ürün adı boş olamaz.');
            isError = true;
        } else {
            setProductNameError('');
        }

        if (!category) {
            setCategoryError('Kategori seçilmelidir.');
            isError = true;
        } else {
            setCategoryError('');
        }

        if (!price) {
            setPriceError('Fiyat boş olamaz.');
            isError = true;
        } else {
            setPriceError('');
        }

        if (!stock) {
            setStockError('Stok boş olamaz.');
            isError = true;
        } else {
            setStockError('');
        }

        if (isError) {
            return;
        }


        const newProduct: NewProduct = {
            // product_id: id;
            product_name: productName,
            category_id: category,
            current_price: parseFloat(price),
            stock: parseInt(stock),
            
        };

        console.log(newProduct)

        dispatch(addProduct(newProduct));

        window.location.reload();

        handleClose();
    };

    return (
        <div>
            <Button style={{ marginBottom: '20px' }} onClick={handleClickOpen} type='button' size='small' variant="contained" color="info">Ürün Ekle</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-apartment"
            >
                <DialogTitle id="edit-apartment">Ürün Ekle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ürün Bilgilerini Girin
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="productName"
                        label="Ürün Adı"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        error={!!productNameError}
                        helperText={productNameError}
                    />
                    <TextField
                        select
                        margin="dense"
                        id="category"
                        label="Kategori"
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(Number(e.target.value))}
                        error={!!categoryError}
                        helperText={categoryError}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        id="price"
                        label="Fiyat"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        error={!!priceError}
                        helperText={priceError}
                    />
                    <TextField
                        margin="dense"
                        id="stock"
                        label="Stok"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        error={!!stockError}
                        helperText={stockError}
                    />
                    <TextField
                        margin="dense"
                        id="barcode"
                        label="Barkod"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        İptal
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                        KAYDET
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProductModal;
