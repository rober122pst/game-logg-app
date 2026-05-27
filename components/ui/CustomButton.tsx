import { Pressable, PressableProps, Text } from 'react-native';

interface CustomButtonProps extends PressableProps {
    title: string;
    variant?: 'cta' | 'secondary';
}

export function CustomButton({ title, variant, onPress, ...props }: CustomButtonProps) {
    return (
        <Pressable
            data-variant={variant}
            onPress={onPress}
            className="min-h-12 min-w-32 items-center justify-center rounded-lg bg-raspberry px-4 py-2 active:opacity-80"
            {...props}
        >
            <Text className="font-metropolis text-text-primary">{title}</Text>
        </Pressable>
    );
}
