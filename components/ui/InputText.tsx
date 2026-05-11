import { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

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
            <Text className="font-metropolis-light text-white">{label || ""}</Text>
            <TextInput
                className="text-white"
                onChangeText={handleChange}
                value={newValue}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 4,
                    padding: 10,
                    marginTop: 5,
                }}
                {...props}
            />
        </View>
    );
}