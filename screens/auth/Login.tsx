import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Logo from 'assets/logos/logo-tipo.svg';
import BaseInterface from "components/BaseInterface";
import { GoogleAuthButton } from 'components/GoogleAuthButton';
import { SteamAuthButton } from 'components/SteamAuthButton';
import { CustomButton } from "components/ui/CustomButton";
import InputText from "components/ui/InputText";
import { Checkbox } from 'expo-checkbox';
import { useLogin } from 'hooks/authHooks';
import { useState } from "react";
import { RootStackParamList } from 'types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const { mutate, isPending, isError } = useLogin();

    const navigation = useNavigation<NavigationProp>();

    const onSubmit = () => {
        if (!email || !password) {
            Alert.alert(
                'Campos inválidos',
                'Preencha os campos corretamente.',
                [
                    { text: 'Entendi' }
                ]
            )
            return;
        }

        const data = {
            email,
            password
        }
        mutate(data);
    }

    return (
        <BaseInterface>
            <View className="w-full h-full" style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
                <View className="items-center justify-center flex-1" style={{ flexDirection: "row", maxWidth: 300, marginHorizontal: "auto" }}>
                    <View className="flex-1" style={{ gap: 16 }}>
                        <View className="items-center" style={{ marginTop: -32 }}>
                            <Logo width={150} height={150} />
                        </View>
                        <InputText label="Email" placeholder="Digite seu email" type="email" value={email} onChangeText={setEmail} autoCorrect={false} />
                        <InputText label="Senha" placeholder="Digite sua senha" type="password" value={password} onChangeText={setPassword} autoCorrect={false} />
                        <View className="flex-row items-center" style={{ gap: 8 }}>
                            <Checkbox value={rememberMe} onValueChange={setRememberMe} />
                            <Text className='text-text-primary' onPress={() => setRememberMe((prev) => !prev)}> Lembrar de mim</Text>
                        </View>
                        <View style={{ marginBottom: 16 }}>
                            {isPending ? (
                                <ActivityIndicator />
                            ) : (
                                <CustomButton title="Entrar" variant="cta" onPress={onSubmit} />
                            )}
                            <Pressable className="items-center">
                                <Text className="font-metropolis-medium text-cocoa-brown" style={{ textDecorationLine: "underline", marginTop: 8 }}>
                                    Esqueci minha senha
                                </Text>
                            </Pressable>
                        </View>
                        <SteamAuthButton />
                        <GoogleAuthButton />
                    </View>
                </View>
                <Pressable onPress={() => navigation.navigate('Register')}>
                    <Text className='text-text-primary' style={{ marginBottom: 21, textAlign: "center" }}>
                        Não tem uma conta? <Text className="font-metropolis-medium text-cocoa-brown" style={{ textDecorationLine: "underline" }}>Registrar-se</Text>
                    </Text>
                </Pressable>
            </View>
        </BaseInterface>
    );
}