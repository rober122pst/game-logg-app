import { Clock, Gamepad2, LucideProps, Trophy } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { useMyStats } from '@/hooks/userHooks';
import { SectionTitle } from './ui/SectionTitle';

export default function StatsSection() {
    const { data, isLoading } = useMyStats();

    if (isLoading || !data) return null;

    const cards = [
        {
            title: 'Zerados',
            value: data.beatedGames,
            icon: Gamepad2,
            color: '#E0055D',
        },
        {
            title: 'Platinas',
            value: data.platinumGames,
            icon: Trophy,
            color: '#E06B05',
        },
        {
            title: 'Jogadas',
            value: `${data.totalPlaytime / 60}h`,
            icon: Clock,
            color: '#72B4A9',
        },
    ];

    type StatCard = {
        title: string;
        value: number | string;
        icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
        color: string;
    };

    const Card = ({ title, value, icon, color }: StatCard) => {
        const Icon = icon;
        return (
            <View className="flex-1 items-center rounded-md border border-background-surface-secondary bg-background-surface-dark p-4">
                <Icon className="text-raspberry" color={color} />
                <Text className="mt-2 text-center font-metropolis-semi-bold text-lg text-text-primary">{value}</Text>
                <Text className="mt-1 text-center font-metropolis-light text-sm uppercase text-text-secondary">
                    {title}
                </Text>
            </View>
        );
    };

    return (
        <View className="flex-1">
            <SectionTitle>SEU PROGRESSO</SectionTitle>
            <View className="flex-3 mt-4 flex-row gap-4">
                {cards.map((card, index) => (
                    <Card key={index} title={card.title} value={card.value} icon={card.icon} color={card.color} />
                ))}
            </View>
        </View>
    );
}
