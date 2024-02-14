import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { unAuthenticateAdmin, unAuthenticateUser } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';

const pages = ['Ürünler', 'Kategoriler', 'Profil'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();

    const isAdmin = useAppSelector((state: RootState) => state.auth.isAdmin);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(unAuthenticateUser())
        dispatch(unAuthenticateAdmin())
        localStorage.removeItem('token: ')
        // Çıkış yapılacak işlemleri burada gerçekleştir
        // Örneğin, localStorage'dan kullanıcı oturum bilgilerini kaldırabilir veya Redux store'unuzu güncelleyebilirsiniz
        console.log('Çıkış yap butonuna tıklandı');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link} // Changed from "a" to "Link" here
                        to="/" // Changed from "/" to "/" here
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PROMANAGE
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link} // Changed from "a" to "Link" here
                        to="/" // Changed from "/" to "/" here
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PROMANAGE
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            component={Link}
                            to="/products"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Ürünler
                        </Button>
                        <Button
                            component={Link}
                            to="/profile"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Profil
                        </Button>
                        {isAdmin && <Button
                            component={Link}
                            to="/admin"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Yönetim
                        </Button>}
                    </Box>

                    <Box>
                        <Button color="inherit" onClick={handleLogout}>Çıkış Yap</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
