import { Text, View } from "react-native";

import { useTailwindColors } from "@/hooks/useTailwindColors";
import { LucideProps } from "lucide-react-native";

export function SectionTitle({ children, variant, Icon }: { children: string; variant?: 'header' | 'subtitle'; Icon?: React.ComponentType<LucideProps> }) {

    const tailwindColors = useTailwindColors();

    if (variant === 'header') {
        return (
            <View className="flex-row gap-2">
                {Icon && <Icon color={tailwindColors.raspberry} />}
                <Text className="text-text-primary text-xl font-metropolis-semi-bold mb-4 uppercase tracking-widest">
                    {children}
                </Text>
            </View>
        );
    }

    return (
        <Text className="text-text-secondary text-lg font-metropolis-semi-bold mb-4 uppercase tracking-widest">
            {children}
        </Text>
    );
}