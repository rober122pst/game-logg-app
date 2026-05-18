import { Clock, Gamepad2, LucideProps, Trophy } from "lucide-react-native";
import { Text, View } from "react-native";

import { useMyStats } from "@/hooks/userHooks";

export default function StatsSection() {
    const { data, isLoading } = useMyStats();

    if (isLoading || !data) return null;

    const cards = [
        {
            title: "Zerados",
            value: data.beatedGames,
            icon: Gamepad2,
            color: "#E0055D",
        },
        {
            title: "Platinas",
            value: data.platinumGames,
            icon: Trophy,
            color: "#E06B05",
        },
        {
            title: "Jogadas",
            value: `${data.totalPlaytime / 60}h`,
            icon: Clock,
            color: "#72B4A9",
        },
    ];

    type StatCard = { title: string; value: number | string; icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>; color: string };

    const Card = ({ title, value, icon, color }: StatCard) => {
        const Icon = icon;
        return (
            <View className="bg-background-surface-dark flex-1 p-4 rounded-md items-center">
                <Icon className="text-raspberry" color={color} />
                <Text className="text-text-primary text-center text-lg font-metropolis-semi-bold mt-2">
                    {value}
                </Text>
                <Text className="text-text-secondary text-center text-sm font-metropolis-light mt-1 uppercase">
                    {title}
                </Text>
            </View>
        );
    };

    return (
        <View className="flex-1">
            <Text className="text-text-secondary text-xl font-metropolis-semi-bold mb-4 uppercase tracking-widest">
                Seu Progresso
            </Text>
            <View className="flex-row flex-3 mt-4 gap-4">
                {cards.map((card, index) => (
                    <Card key={index} title={card.title} value={card.value} icon={card.icon} color={card.color} />
                ))}
            </View>
        </View>
    )
}