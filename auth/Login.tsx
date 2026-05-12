import Logo from 'assets/logos/logo-tipo.svg';
import BaseInterface from "components/BaseInterface";
import { GoogleAuthButton } from 'components/GoogleAuthButton';
import { SteamAuthButton } from 'components/SteamAuthButton';
import { CustomButton } from "components/ui/CustomButton";
import InputText from "components/ui/InputText";
import { Checkbox } from 'expo-checkbox';
import { useState } from "react";
import { Pressable, Text, View } from 'react-native';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

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
                            <Text className='text-text-primary'> Lembrar de mim</Text>
                        </View>
                        <View>
                            <CustomButton title="Entrar" variant="cta" />
                            <Pressable className="items-center mt-4">
                                <Text className="font-metropolis-medium" style={{ textDecorationLine: "underline", marginTop: 8, color: "#E0055D" }}>
                                    Esqueci minha senha
                                </Text>
                            </Pressable>
                        </View>
                        <SteamAuthButton />
                        <GoogleAuthButton />
                    </View>
                </View>
            </View>
        </BaseInterface>
    );
}