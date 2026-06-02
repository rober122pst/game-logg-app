import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// 1. Função que faz a chamada com Axios
const linkSteamAccount = async (data: { email: string; steamId: string }) => {
    // Troque pela URL base do seu backend
    const response = await axios.post('http://SEU_IP_LOCAL:3000/auth/steam/connect', data);
    return response.data;
};

export default function ConnectSteamScreen() {
    const [email, setEmail] = useState('');
    const [steamId, setSteamId] = useState('');

    // 2. Configurando o React Query (useMutation)
    const { mutate, isPending } = useMutation({
        mutationFn: linkSteamAccount,
        onSuccess: (data) => {
            // Sucesso! O backend retornou o usuário e o novo token
            Alert.alert('Sucesso', 'Conta da Steam conectada!');
            console.log('Token recebido:', data.token);
            // Aqui você pode salvar o token no AsyncStorage/SecureStore
        },
        onError: (error: any) => {
            // Tratamento de erro
            const errorMessage = error.response?.data?.message || 'Erro ao conectar conta';
            Alert.alert('Erro', errorMessage);
        },
    });

    // 3. Função disparada ao clicar no botão
    const handleConnect = () => {
        if (!email || !steamId) {
            Alert.alert('Aviso', 'Preencha todos os campos!');
            return;
        }
        // Dispara a mutation
        mutate({ email, steamId });
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Conectar Steam</Text>

            <TextInput
                placeholder="Seu Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />

            <TextInput
                placeholder="Seu Steam ID"
                value={steamId}
                onChangeText={setSteamId}
                style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
            />

            {isPending ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Vincular Conta" onPress={handleConnect} />
            )}
        </View>
    );
};