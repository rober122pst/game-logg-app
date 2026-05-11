import BaseInterface from "components/BaseInterface";
import InputText from "components/ui/InputText";
import { useState } from "react";
import { View } from "react-native-reanimated/src/Animated";

export default function Login() {
    const [email, setEmail] = useState("");

    return (
        <BaseInterface>
            <View className="flex-1 items-center justify-center p-8 font-metropolis">
                <View className="flex flex-col items-center justify-center h-full w-[400px] m-auto">
                    <View className="w-full">
                        <InputText label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />
                    </View>
                </View>
            </View>
        </BaseInterface>
    );
}