import axios from "axios";

interface LoginData {
    [key: string]: string;
    username: string;
    password: string;
    grant_type: string;
    client_id: string; 
    client_secret: string; 
}

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export async function onLogin(loginData: LoginData) {


    const formData = new URLSearchParams(loginData);

    const response = await axios.post('http://localhost:5000/api/v1/auth/login', formData.toString(), config);

    console.log(response.data)
    const accessToken = response.data.access_token
    localStorage.setItem('isAuth', accessToken);

}