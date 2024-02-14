import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { getUserDetailByUsername } from '../redux/slices/userSlice';

interface UserProfile {
    name: string;
    password: string | undefined;
    email: string;
    phone?: string;
    role?: string;
    // Diğer alanlar da eklenebilir
}

const Profile: React.FC = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.users.user);
    const currentUser = useAppSelector((state: RootState) => state.auth.user);

    console.log(currentUser)

    // useEffect(() => {
    //     dispatch(getUserDetailByUsername('normal'));
    // }, [dispatch]);

    console.log(user)

    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: ''
        // Varsayılan kullanıcı bilgileri
    });

    useEffect(() => {
        if (user && user.length > 0) {
            const currentUser = user[0];
            setUserProfile({
                name: currentUser.username,
                email: currentUser.user_email,
                password: '',
                phone: currentUser.user_phone,
                role: currentUser.user_role
            });
            console.log(user)
        }
    }, [user]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserProfile({ ...userProfile, name: event.target.value });
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserProfile({ ...userProfile, email: event.target.value });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserProfile({ ...userProfile, password: event.target.value });
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserProfile({ ...userProfile, phone: event.target.value });
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserProfile({ ...userProfile, role: event.target.value });
    };

    const handleUpdateProfile = () => {
        // Profil güncelleme işlemleri burada yapılabilir (örneğin, bir API çağrısı)
        console.log('Profil güncellendi:', userProfile);
    };

    return (
        <Box maxWidth={400} mx="auto" mt={4}>
            <TextField
                fullWidth
                label="İsim"
                value={userProfile.name}
                onChange={handleNameChange}
                variant="outlined"
                margin="normal"
            />
            <TextField
                fullWidth
                label="E-posta"
                value={userProfile.email}
                onChange={handleEmailChange}
                variant="outlined"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Şifre"
                type="password"
                value={userProfile.password}
                onChange={handlePasswordChange}
                variant="outlined"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Telefon"
                value={userProfile.phone}
                onChange={handlePhoneChange}
                variant="outlined"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Rol"
                value={userProfile.role}
                onChange={handleRoleChange}
                variant="outlined"
                margin="normal"
            />
            <Button onClick={handleUpdateProfile} variant="contained" color="primary">
                Profili Güncelle
            </Button>
        </Box>
    );
};

export default Profile;
