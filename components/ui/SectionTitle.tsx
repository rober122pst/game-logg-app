import { Text, View } from 'react-native';

import { useTailwindColors } from '@/hooks/useTailwindColors';
import { LucideProps } from 'lucide-react-native';

export function SectionTitle({
    children,
    variant,
    Icon,
}: {
    children: string;
    variant?: 'header' | 'subtitle';
    Icon?: React.ComponentType<LucideProps>;
}) {
    const tailwindColors = useTailwindColors();

    if (variant === 'header') {
        return (
            <View className="flex-row gap-2">
                {Icon && <Icon color={tailwindColors.raspberry} />}
                <Text className="mb-4 font-metropolis-semi-bold text-xl uppercase tracking-widest text-text-primary">
                    {children}
                </Text>
            </View>
        );
    }

    return (
        <Text className="mb-4 font-metropolis-semi-bold text-lg uppercase tracking-widest text-text-secondary">
            {children}
        </Text>
    );
}
