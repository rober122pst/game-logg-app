import { create } from 'axios';
import { useAuthStore } from 'store/useAuthStore';

export const api = create({
    baseURL: 'https://saddlebag-donation-decorated.ngrok-free.dev',
});

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized access - logging out');
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
)