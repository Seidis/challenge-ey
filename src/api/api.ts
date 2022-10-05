import axios from 'axios';
import { getUserLocalStorage } from 'context/AuthProvider/utils';
import config from '../config';

export const Api = axios.create({
    baseURL: config.apiUrl,
});

Api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();
        // eslint-disable-next-line
        config.headers!.Authorization = user?.token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);