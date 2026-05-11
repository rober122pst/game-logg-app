import { Text, TextInput, TextInputProps, View } from "react-native";

import { useState } from "react";

interface InputTextProps extends TextInputProps {
    label?: string;
}

export default function InputText({ label, onChangeText, value, ...props }: InputTextProps) {
    const [newValue, setValue] = useState(value || "");

    const handleChange = (e: string) => {
        setValue(e);
        onChangeText && onChangeText(e);
    };

    return (
        <View className="mb-4 w-full">
            <Text className="font-metropolis-light text-text-primary-dark">{label || ""}</Text>
            <TextInput
                className="border-raspberry border rounded-full mt-3 px-4 py-2 text-text-primary w-64"
                onChangeText={handleChange}
                value={newValue}
                {...props}
            />
        </View>
    );
}