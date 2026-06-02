import { useTailwindColors } from '@/hooks/useTailwindColors';
import { Pressable, PressableProps, Text, TextInput, TextInputProps, View } from 'react-native';

interface FormTextInput extends TextInputProps {
    label: string;
}

export function FormInputText({ label, ...props }: FormTextInput) {
    const tailwindColors = useTailwindColors();

    return (
        <View className="mt-4 flex-1">
            <Text className="mb-2 font-metropolis text-text-secondary">{label}</Text>
            <TextInput
                className="rounded-lg bg-background-surface-secondary p-4 font-metropolis text-text-primary"
                placeholderTextColor={tailwindColors['text-secondary'].dark}
                {...props}
            />
        </View>
    );
}

interface PickerSelectProps extends PressableProps {
    title: string;
    value: string;
}

export function PickerSelect({ title, value, ...props }: PickerSelectProps) {
    return (
        <View className="mt-4 flex-1">
            <Text className="mb-2 font-metropolis text-text-secondary">{title}</Text>
            <Pressable className="rounded-lg bg-background-surface-secondary p-4" {...props}>
                <Text className="font-metropolis text-text-primary">{value}</Text>
            </Pressable>
        </View>
    );
}
