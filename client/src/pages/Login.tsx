import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { onLogin } from '../api/auth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { authenticateAdmin, authenticateUser, setUser } from '../redux/slices/authSlice';
import { getUserDetailByUsername } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

const defaultTheme = createTheme();

export default function Login() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.users.user);
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        grant_type: 'password',
        client_id: 'asdsad',
        client_secret: 'asdasd'
    });

    React.useEffect(() => {
        if (formData.username) {
            dispatch(getUserDetailByUsername(formData.username))
        }
    }, [formData.username]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await onLogin(formData)
            const currentUser = user[0]
            dispatch(setUser(currentUser));
            const currentUser_role = user[0].user_role;
            if (currentUser_role === "admin") {
                dispatch(authenticateAdmin())
                localStorage.setItem('isAdmin', 'true')
            } else {
                localStorage.setItem('isAdmin', 'false')
            }
            console.log(user[0].user_role)

            dispatch(authenticateUser())
            // localStorage.setItem('isAuth', 'true')
        } catch (error) {
            console.log(error)
            console.log('login error');
            // Hata durumunda kullanıcıya bilgilerini kontrol etmesi gerektiği mesajını gösterelim
            alert('Lütfen bilgilerinizi kontrol edin.');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    console.log(formData)

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Giriş Yap
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Kullanıcı Adı"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Şifre"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Beni Hatırla"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Giriş Yap
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Şifremi Unuttum
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
