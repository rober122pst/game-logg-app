import { useMutation } from '@tanstack/react-query';
import { api } from "services/api";
import { useAuthStore } from "store/useAuthStore";

export function useRegister() {
    const setToken = useAuthStore((s) => s.setToken);

    return useMutation({
        mutationFn: (data) => api.post('/register', data),
        onSuccess: (res) => {
            const { token } = res.data;
            setToken(token);
        },
        onError: (err) => {
            console.error("Error", err);
        },
    });
}

export function useLogin() {
    const setToken = useAuthStore((s) => s.setToken);

    return useMutation({
        mutationFn: (data: { email: string, password: string }) => api.post('/login', data),
        onSuccess: (res) => {
            const { token } = res.data;
            setToken(token);
        },
        onError: (err) => {
            console.error("Error", err);
        },
    });
}