import { Alert, Pressable, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Logo from 'assets/logos/logo-tipo.svg';
import BaseInterface from "components/BaseInterface";
import { GoogleAuthButton } from 'components/GoogleAuthButton';
import { SteamAuthButton } from 'components/SteamAuthButton';
import { CustomButton } from "components/ui/CustomButton";
import InputText from "components/ui/InputText";
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { RootStackParamList } from "types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });

    const [firstPage, setFirstPage] = useState(false);

    const handleChange = (field: keyof typeof form) => (value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    const navigation = useNavigation<NavigationProp>();

    const handleSubmit = () => {
        if (!firstPage) {
            if (form.username &&
                form.displayName &&
                form.email
            ) {
                setFirstPage(true);
                return
            } else {
                Alert.alert('Formulário incompleto',
                    'Preencha todos os campos.',
                    [
                        { text: 'Entendi', onPress: () => console.log('Alerta fechado') }
                    ]);
                return;
            }
        }

        Alert.alert(
            `Usuário ${form.username} registrado.`,
            '',
            [
                { text: 'Entendi', onPress: () => console.log('Alerta fechado') }
            ]
        );
    }

    return (
        <BaseInterface>
            <View className="w-full h-full" style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
                <View className="items-center justify-center flex-1" style={{ flexDirection: "row", maxWidth: 300, marginHorizontal: "auto" }}>
                    <View className="flex-1" style={{ gap: 16 }}>
                        <View className="items-center" style={{ marginTop: -32 }}>
                            <Logo width={150} height={150} />
                        </View>
                        {!firstPage ? (
                            <>
                                <InputText label="Nome de usuário" placeholder="Digite seu nome de usuário" type="text" value={form.username} onChangeText={handleChange('username')} autoCorrect={false} autoCapitalize="none" />
                                <InputText label="Nome do perfil" placeholder="Digite o nome a ser exibido no perfil" type="text" value={form.displayName} onChangeText={handleChange('displayName')} autoCorrect={false} />
                                <InputText label="Email" placeholder="Digite seu email" type="email" value={form.email} onChangeText={handleChange('email')} autoCorrect={false} />
                            </>
                        ) :
                            (
                                <>
                                    <InputText label="Senha" placeholder="Digite sua senha" type="password" value={form.password} onChangeText={handleChange('password')} autoCorrect={false} />
                                    <InputText label="Confirmar Senha" placeholder="Digite sua senha novamente" type="password" value={form.confirmPassword} onChangeText={handleChange('confirmPassword')} autoCorrect={false} />
                                    <View className="flex-row items-center" style={{ gap: 8 }}>
                                        <Checkbox value={form.acceptTerms} onValueChange={handleChange('acceptTerms')} />
                                        <Text className='text-text-primary' onPress={() => setForm((prev) => ({ ...prev, acceptTerms: !prev.acceptTerms }))}> Aceitar Termos e Condições</Text>
                                    </View>
                                </>
                            )}
                        <View style={{ marginBottom: 16 }}>
                            <CustomButton title="Criar conta" variant="cta" onPress={handleSubmit} />
                        </View>
                        <SteamAuthButton />
                        <GoogleAuthButton />
                    </View>
                </View>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text className='text-text-primary' style={{ marginBottom: 21, textAlign: "center" }}>
                        Já tem uma conta? <Text className="font-metropolis-medium text-cocoa-brown" style={{ textDecorationLine: "underline" }}>Entrar</Text>
                    </Text>
                </Pressable>
            </View>
        </BaseInterface>
    )
}