import { Text, TextInput, TextInputProps, View } from "react-native";

import { useState } from "react";

interface InputTextProps extends TextInputProps {
    label?: string;
    type?: "text" | "email" | "password";
}

export default function InputText({ label, type, onChangeText, value, ...props }: InputTextProps) {
    const [newValue, setValue] = useState(value || "");

    const handleChange = (e: string) => {
        setValue(e);
        onChangeText && onChangeText(e);
    };

    return (
        <View className="mb-4 w-full">
            <Text className="font-metropolis-light text-text-primary">{label || ""}</Text>
            <TextInput
                className="border-raspberry border rounded-full mt-3 px-4 py-4 text-text-primary"
                onChangeText={handleChange}
                value={newValue}
                placeholderTextColor="#787878"
                keyboardType={type === "email" ? "email-address" : "default"}
                secureTextEntry={type === "password"}
                autoCapitalize={type === "email" ? "none" : "sentences"}
                {...props}
            />
        </View>
    );
}