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
import { addUser } from "../redux/slices/userSlice";
import { NewUser } from "../types/userTypes";

export const UserModal: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [role, setRole] = useState<string>('employee');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');

    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let isError = false;

        if (!username) {
            setUsernameError('Kullanıcı adı boş olamaz.');
            isError = true;
        } else {
            setUsernameError('');
        }

        if (!password) {
            setPasswordError('Şifre boş olamaz.');
            isError = true;
        } else {
            setPasswordError('');
        }

        if (!email) {
            setEmailError('E-posta boş olamaz.');
            isError = true;
        } else {
            setEmailError('');
        }

        // Telefon numarası zorunlu olmadığı için ayrıca kontrol etmiyoruz.

        if (isError) {
            return;
        }

        const newUser: NewUser = {
            username: username,
            password: password,
            user_email: email,
            user_phone: phone,
            user_role: role,
        };

        dispatch(addUser(newUser));

        // Formu sıfırla
        setUsername('');
        setPassword('');
        setEmail('');
        setPhone('');
        setRole('');

        window.location.reload();

        handleClose();
    };

    return (
        <div>
            <Button style={{ marginBottom: '20px', backgroundColor: '#4995B1' }} onClick={handleClickOpen} type='button' size='small' variant="contained" >Kullanıcı Ekle</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="add-user"
            >
                <DialogTitle id="add-user">Kullanıcı Ekle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Yeni Kullanıcı Bilgilerini Girin
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Kullanıcı Adı"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={!!usernameError}
                        helperText={usernameError}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Şifre"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="E-posta"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Telefon"
                        type="tel"
                        variant="outlined"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={!!phoneError}
                        helperText={phoneError}
                    />
                    <TextField
                        select
                        margin="dense"
                        id="role"
                        label="Rol"
                        variant="outlined"
                        fullWidth
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value="employee">employee</MenuItem>
                        <MenuItem value="admin">admin</MenuItem>
                    </TextField>
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

export default UserModal;
