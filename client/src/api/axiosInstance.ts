import axios from "axios";

const axiosInstance = axios.create({ // API'nizin URL'sini buraya girin
});

// Axios isteklerini göndermeden önce her istek için bir interceptor tanımlayın
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token: '); // Token'ı localStorage'dan alın
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Header'a token'ı ekleyin
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;