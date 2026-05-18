import { api } from "@/services/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export function useRegister() {
    const setToken = useAuthStore((s) => s.setToken);

    return useMutation({
        mutationFn: (data) => api.post('/auth/register', data),
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
        mutationFn: (data: { email: string, password: string }) => api.post('/auth/login', data),
        onSuccess: (res) => {
            const { token } = res.data;
            setToken(token);
        },
        onError: (err) => {
            Alert.alert("Erro", "Não foi possível realizar o login.")
            console.error("Error", err.message);
        },
    });
}