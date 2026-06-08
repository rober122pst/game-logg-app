import { useTailwindColors } from '@/hooks/useTailwindColors';
import { Clock, TrendingUp } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface PlaytimeComparisonProps {
    playtimeForever?: number;
    playtime2Weeks?: number;
}

export default function PlaytimeComparison({ playtimeForever = 0, playtime2Weeks = 0 }: PlaytimeComparisonProps) {
    const tailwindColors = useTailwindColors();

    const hoursForever = playtimeForever > 0 ? Math.round(playtimeForever / 60) : 0;
    const hours2Weeks = playtime2Weeks > 0 ? Math.round(playtime2Weeks / 60) : 0;

    const maxHours = Math.max(hoursForever, hours2Weeks, 1);
    const barWidthForever = hoursForever > 0 ? (hoursForever / maxHours) * 100 : 0;
    const barWidth2Weeks = hours2Weeks > 0 ? (hours2Weeks / maxHours) * 100 : 0;

    return (
        <View className="gap-4">
            {/* Total time */}
            <View className="gap-2">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <TrendingUp size={16} color={tailwindColors['cocoa-brown']} />
                        <Text className="font-metropolis-light text-xs text-text-secondary">TEMPO TOTAL</Text>
                    </View>
                    <Text className="font-metropolis-bold text-lg text-cocoa-brown">{hoursForever}h</Text>
                </View>
                <View className="h-3 w-full overflow-hidden rounded-full bg-background-surface-secondary">
                    <View
                        className="h-full rounded-full"
                        style={{
                            width: `${Math.max(barWidthForever, 5)}%`,
                            backgroundColor: tailwindColors['cocoa-brown'],
                        }}
                    />
                </View>
            </View>

            {/* Last 2 weeks */}
            <View className="gap-2">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <Clock size={16} color={tailwindColors.mint} />
                        <Text className="font-metropolis-light text-xs text-text-secondary">ÚLTIMAS 2 SEMANAS</Text>
                    </View>
                    <Text className="font-metropolis-bold text-lg text-mint">{hours2Weeks}h</Text>
                </View>
                <View className="h-3 w-full overflow-hidden rounded-full bg-background-surface-secondary">
                    <View
                        className="h-full rounded-full"
                        style={{
                            width: `${Math.max(barWidth2Weeks, 5)}%`,
                            backgroundColor: tailwindColors.mint,
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
