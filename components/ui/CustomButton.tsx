import { Pressable, PressableProps, Text } from "react-native";

interface CustomButtonProps extends PressableProps {
    title: string;
    variant?: "cta" | "secondary";
}

export function CustomButton({ title, variant, ...props }: CustomButtonProps) {

    return (
        <Pressable data-variant={variant} className="bg-raspberry min-w-32 min-h-12 px-4 py-2 rounded-lg items-center justify-center active:opacity-80" >
            <Text className="text-text-primary font-metropolis">{title}</Text>
        </Pressable>
    )
}