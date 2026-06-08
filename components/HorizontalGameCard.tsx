import { useTailwindColors } from '@/hooks/useTailwindColors';
import { ratingColor } from '@/services/ratingColor';
import { UserGameType, RootStackParamList } from '@/types';
import { Monitor, Star } from 'lucide-react-native';
import { Text, View, Pressable } from 'react-native';
import GameCover from './GamesCover';
import { getStatusInfo } from '@/utils/statusMappings';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Library'>;

export default function HorizontalGameCard({ game }: { game: UserGameType }) {
    const tailwindColors = useTailwindColors();
    const navigation = useNavigation<NavigationProp>();
    const statusInfo = getStatusInfo(game.status, tailwindColors);
    // prettier-ignore
    const overall =
        game.rating &&
        (game.rating.gameplay + game.rating.graphics + game.rating.sound + game.rating.story) / 4 +
        Number(game.rating.favorite);

    return (
        <Pressable
            onPress={() =>
                navigation.navigate('UserGameStats', {
                    userGameId: game.id,
                    gameTitle: game.game.title,
                })
            }
            className="flex-row gap-3 rounded-lg border border-background-surface-secondary bg-background-surface p-4"
        >
            <GameCover game={game.game} showName={false} width={72} />
            <View className="flex-1 flex-col justify-between">
                <View>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="font-metropolis-bold text-lg text-text-primary"
                    >
                        {game.game.title}
                    </Text>
                    <View
                        className="flex-row items-center justify-center gap-1 self-start rounded-md border px-2 py-1"
                        style={{
                            backgroundColor: statusInfo.color + '40',
                            borderColor: statusInfo.color,
                        }}
                    >
                        <statusInfo.icon color={statusInfo.color} size={14} />
                        <Text
                            style={{
                                color: statusInfo.color,
                            }}
                            className="font-metropolis-bold text-sm"
                        >
                            {statusInfo.label}
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-end justify-between">
                    <View className="flex-row items-center gap-1.5">
                        <Monitor color={tailwindColors['text-secondary'].dark} size={12} />
                        <Text className="font-metropolis text-text-secondary">PC - {game.game.genres?.[0].name}</Text>
                    </View>
                    <View>
                        {overall && (
                            <View className="flex-row items-center gap-2 self-start rounded-lg bg-background-surface-secondary px-2 py-1">
                                <Text className="font-metropolis-black" style={{ color: ratingColor(overall) }}>
                                    {overall.toFixed(1)}
                                </Text>
                                <Star
                                    fill={tailwindColors['cocoa-brown']}
                                    color={tailwindColors['cocoa-brown']}
                                    size={16}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
