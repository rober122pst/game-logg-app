import { useTailwindColors } from '@/hooks/useTailwindColors';
import { RatingType } from '@/types';
import { Heart } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface RatingBarsComponentProps {
    rating: RatingType;
}

export default function RatingBarsComponent({ rating }: RatingBarsComponentProps) {
    const categories = [
        { label: 'Gameplay', value: rating.gameplay },
        { label: 'Gráficos', value: rating.graphics },
        { label: 'História', value: rating.story },
        { label: 'Trilha Sonora', value: rating.sound },
    ];

    const overall = (rating.gameplay + rating.graphics + rating.story + rating.sound) / 4 + Number(rating.favorite);

    const getColor = (score: number) => {
        if (score < 3) return '#ef4444'; // red-500
        if (score < 5) return '#f59e0b'; // amber-500
        if (score < 7) return '#84cc16'; // lime-500
        if (score < 9) return '#10b981'; // emerald-500
        return '#6366f1'; // indigo-500
    };

    const tailwindColors = useTailwindColors();

    return (
        <View className="w-full gap-3">
            {/* Overall Rating */}
            <View className="gap-2">
                <View className="flex-row items-center justify-between">
                    <Text className="font-metropolis-semi-bold text-sm text-text-secondary">AVALIAÇÃO GERAL</Text>
                    <Text className="font-metropolis-black text-lg" style={{ color: getColor(overall) }}>
                        {overall.toFixed(1)}
                    </Text>
                </View>
                <View className="h-2 w-full overflow-hidden rounded-full bg-background-surface-secondary">
                    <View
                        className="h-full rounded-full"
                        style={{
                            width: `${(overall / 11) * 100}%`,
                            backgroundColor: getColor(overall),
                        }}
                    />
                </View>
            </View>

            {/* Individual Ratings */}
            <View className="gap-3 border-t border-background-surface-secondary pt-3">
                {categories.map((category) => (
                    <View key={category.label} className="gap-1">
                        <View className="flex-row items-center justify-between">
                            <Text className="font-metropolis text-xs text-text-secondary">{category.label}</Text>
                            <Text
                                className="font-metropolis-semi-bold text-sm"
                                style={{ color: getColor(category.value) }}
                            >
                                {category.value.toFixed(1)}
                            </Text>
                        </View>
                        <View className="h-1.5 w-full overflow-hidden rounded-full bg-background-surface-secondary">
                            <View
                                className="h-full rounded-full"
                                style={{
                                    width: `${(category.value / 10) * 100}%`,
                                    backgroundColor: getColor(category.value),
                                }}
                            />
                        </View>
                    </View>
                ))}
            </View>

            {/* Favorite Badge */}
            {rating.favorite && (
                <View className="mt-1 flex-row items-center justify-center gap-2 rounded-lg px-3 py-1">
                    <Heart color={tailwindColors.raspberry} fill={tailwindColors.raspberry} size={14} />
                    <Text className="font-metropolis-semi-bold text-xs text-raspberry">Favorito</Text>
                </View>
            )}
        </View>
    );
}
