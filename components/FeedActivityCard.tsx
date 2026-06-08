import { useTailwindColors } from '@/hooks/useTailwindColors';
import { FeedCardType } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, Heart, MessageCircle, MoreVertical, Trophy } from 'lucide-react-native';
import { Share2 } from 'lucide-react-native/icons';
import { Image, Pressable, Text, View } from 'react-native';

interface FeedActivityCardProps {
    card: FeedCardType;
}

export default function FeedActivityCard({ card }: FeedActivityCardProps) {
    const tailwindColors = useTailwindColors();
    return (
        <View className="rounded-lg border border-background-surface-secondary bg-background-surface p-4">
            {card.isAchievement && (
                <View className="mb-3 flex-row items-center gap-2 self-start rounded-full border border-cocoa-brown/20 bg-cocoa-brown/10 px-3 py-1">
                    <Award color={tailwindColors['cocoa-brown']} size={16} />
                    <Text className="font-metropolis-bold text-sm uppercase tracking-wider text-cocoa-brown">
                        Momento de Conquista
                    </Text>
                </View>
            )}
            <View className="mb-3 flex-row items-start gap-3">
                <View className="h-10 w-10 rounded-full bg-background">
                    <Image
                        source={{ uri: card.avatar }}
                        className={`h-full w-full rounded-full ${card.isAchievement ? 'border-2 border-cocoa-brown' : ''}`}
                    />
                </View>
                <View className="mt-0.5 flex-1">
                    <View className="flex-row gap-1">
                        <Text className="font-metropolis-bold text-sm leading-tight text-text-primary">
                            {card.user}
                        </Text>
                        <Text className="ml-0.5 font-metropolis text-sm leading-tight text-text-secondary">
                            {card.action}
                        </Text>
                    </View>
                    <Text
                        className={`mt-0.5 font-metropolis-semi-bold text-sm leading-tight ${card.isAchievement ? 'text-cocoa-brown' : 'text-raspberry'}`}
                    >
                        {card.game}
                    </Text>
                    <Text className="mt-1 block font-metropolis text-xs leading-tight text-text-secondary">
                        {card.time}
                    </Text>
                </View>
                <Pressable>
                    <MoreVertical size={16} color={tailwindColors['text-secondary'].dark} />
                </Pressable>
            </View>
            <View className={`w-full ${card.isAchievement ? 'h-48' : 'h-32'} relative mb-3 overflow-hidden rounded-xl`}>
                <Image source={{ uri: card.gameImg }} className="h-full w-full object-cover" />
                <LinearGradient
                    className="absolute inset-0 justify-end p-4"
                    colors={[tailwindColors.background.dark, tailwindColors.background.dark + '14']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                >
                    {card.isAchievement && (
                        <View className="mb-2 flex-row items-center gap-2">
                            <Trophy size={24} color={tailwindColors['cocoa-brown']} />
                            <View>
                                <Text className="text-xs font-black text-cocoa-brown">100% CONCLUÍDO</Text>
                                <Text className="text-xs text-text-primary">Tempo jogado: {card.playtime}</Text>
                            </View>
                        </View>
                    )}
                </LinearGradient>
            </View>
            <View className="flex-row items-center gap-5 pt-1">
                <Pressable className="flex-row items-center gap-1.5">
                    <Heart color={tailwindColors['text-secondary'].dark} size={20} />
                    <Text className="font-metropolis-medium text-text-secondary">{card.likes}</Text>
                </Pressable>
                <Pressable className="flex-row items-center gap-1.5">
                    <MessageCircle color={tailwindColors['text-secondary'].dark} size={20} />
                    <Text className="font-metropolis-medium text-text-secondary">{card.comments}</Text>
                </Pressable>
                <Pressable className="ml-auto flex-row items-center gap-1.5">
                    <Share2 color={tailwindColors['text-secondary'].dark} size={20} />
                </Pressable>
            </View>
        </View>
    );
}
