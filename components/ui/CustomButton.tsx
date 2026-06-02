import { Pressable, PressableProps, Text } from 'react-native';

interface CustomButtonProps extends PressableProps {
    title: string;
    variant?: 'cta' | 'secondary';
}

export function CustomButton({ title, variant, onPress, ...props }: CustomButtonProps) {
    const pressableStyles = {
        cta: 'min-h-12 min-w-32 items-center justify-center rounded-lg px-4 bg-raspberry py-2 active:opacity-80',
        secondary:
            'min-h-12 min-w-32 items-center justify-center rounded-lg border  border-background-surface-secondary bg-background-surface px-4 py-2 active:opacity-80',
    };

    return (
        <Pressable data-variant={variant} onPress={onPress} className={pressableStyles[variant || 'cta']} {...props}>
            <Text className="font-metropolis text-text-primary">{title}</Text>
        </Pressable>
    );
}
