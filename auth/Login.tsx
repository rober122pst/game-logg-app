import BaseInterface from "components/BaseInterface";
import { CustomButton } from "components/ui/CustomButton";
import InputText from "components/ui/InputText";
import { useState } from "react";
import { View } from "react-native";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <BaseInterface>
            <View className="w-full p-16 h-full">
                <View className="items-center justify-center h-full">
                    <View className="max-w-64 w-full items-center justify-center">
                        <InputText label="Email" placeholder="Digite seu email" type="email" value={email} onChangeText={setEmail} autoCorrect={false} />
                        <InputText label="Senha" placeholder="Digite sua senha" type="password" value={password} onChangeText={setPassword} autoCorrect={false} />
                        <CustomButton title="Entrar" variant="cta" />
                    </View>
                </View>
            </View>
        </BaseInterface>
    );
}