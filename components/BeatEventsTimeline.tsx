import { useTailwindColors } from '@/hooks/useTailwindColors';
import { BeatEventType } from '@/types';
import { CheckCircle2, Percent, Star, Trophy } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface BeatEventsTimelineProps {
    events?: BeatEventType[];
}

export default function BeatEventsTimeline({ events = [] }: BeatEventsTimelineProps) {
    const tailwindColors = useTailwindColors();

    if (!events || events.length === 0) {
        return <Text className="text-center font-metropolis text-text-secondary">Nenhum marco alcançado ainda</Text>;
    }

    const eventConfig = {
        BEATED: {
            label: 'Zerado',
            icon: CheckCircle2,
            color: tailwindColors.raspberry,
        },
        COMPLETED: {
            label: '100%',
            icon: Percent,
            color: tailwindColors.mint,
        },
        PLATINUM: {
            label: 'Platinado',
            icon: Trophy,
            color: tailwindColors['cocoa-brown'],
        },
        PERFECT: {
            label: 'Perfeito',
            icon: Star,
            color: tailwindColors['cocoa-brown'],
        },
    };

    return (
        <View className="gap-4">
            {events.map((event, idx) => {
                const config = eventConfig[event.action];
                const Icon = config.icon;
                const isLast = idx === events.length - 1;

                return (
                    <View key={event.id} className="flex-row items-stretch gap-3">
                        {/* Timeline line and dot */}
                        <View className="items-center">
                            {/* Dot */}
                            <View
                                className="h-10 w-10 items-center justify-center rounded-full border-2 bg-transparent"
                                style={{ borderColor: config.color }}
                            >
                                <Icon size={20} color={config.color} />
                            </View>
                            {/* Vertical line */}
                            {!isLast && (
                                <View className="mt-2 w-0.5 flex-1" style={{ backgroundColor: config.color }} />
                            )}
                        </View>
                        {/* Event info */}
                        <View className="flex-1 justify-center pb-4">
                            <Text className="font-metropolis-semi-bold text-text-primary">{config.label}</Text>
                            <Text className="font-metropolis-light text-xs text-text-secondary">
                                {new Date(event.occurredAtStart).getFullYear()}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
