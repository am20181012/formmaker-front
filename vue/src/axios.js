import axios from 'axios';
import store from './store';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

axiosClient.interceptors.request.use(config => {
    console.log("CONFIGURATION")
    console.log(config)
    if (config.url !== '/auth/authenticate' && config.url !== '/auth/register' 
    && !config.url.startsWith('/forms/form-by-slug/') && !config.url.startsWith('/forms/answer/')) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`
        console.log(config.headers.Authorization)
    }
    return config;
});

export default axiosClient;