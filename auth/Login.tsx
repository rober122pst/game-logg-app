import BaseInterface from "components/BaseInterface";
import InputText from "components/ui/InputText";
import { View } from "react-native";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");

    return (
        <BaseInterface>
            <View className="flex-1 items-center justify-center p-8">
                <View className="flex flex-col items-center justify-center h-full m-auto">
                    <View>
                        <InputText label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />
                    </View>
                </View>
            </View>
        </BaseInterface>
    );
}