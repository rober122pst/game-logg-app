import { Pressable, PressableProps, Text } from "react-native";

interface CustomButtonProps extends PressableProps {
    title: string;
    variant?: "cta" | "secondary";
}

export function CustomButton({ title, variant, ...props }: CustomButtonProps) {

    return (
        <Pressable data-variant={variant} className="bg-raspberry min-w-32 min-h-10 px-4 py-2 rounded-lg items-center justify-center" >
            <Text className="text-text-primary font-metropolis-black">{title}</Text>
        </Pressable>
    )
}