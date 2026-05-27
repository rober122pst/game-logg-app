import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputTextProps extends TextInputProps {
    label?: string;
    type?: 'text' | 'email' | 'password';
}

export default function InputText({ label, type, onChangeText, value, ...props }: InputTextProps) {
    return (
        <View className="mb-4 w-full">
            <Text className="font-metropolis-light text-text-primary">{label || ''}</Text>
            <TextInput
                className="mt-3 rounded-full border border-raspberry px-4 py-4 text-text-primary"
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor="#787878"
                keyboardType={type === 'email' ? 'email-address' : 'default'}
                secureTextEntry={type === 'password'}
                autoCapitalize={type === 'email' ? 'none' : 'sentences'}
                {...props}
            />
        </View>
    );
}
