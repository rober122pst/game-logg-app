import { create } from 'axios';
import { useAuthStore } from 'store/useAuthStore';

export const api = create({
    baseURL: 'http://localhost:1987',
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})