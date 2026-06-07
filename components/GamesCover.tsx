import { GameType, RootStackParamList } from '@/types';
import { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { useTailwindColors } from '@/hooks/useTailwindColors';
import { ratingColor } from '@/services/ratingColor';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Star } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function GameCover({
    game,
    overall,
    width = 200,
}: {
    game: GameType;
    overall?: number;
    width?: number;
}) {
    const [ratio, setRatio] = useState<number>(1);

    const navigation = useNavigation<NavigationProp>();

    const uri = game.coverUrl || '';

    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            setRatio(width / height);
        });
    }, [uri]);

    const tailwindColors = useTailwindColors();

    return (
        <Pressable
            style={{ width }}
            onPress={() =>
                navigation.navigate('Game', { igdbId: game.igdbId, title: game.title, coverUrl: uri, slug: game.slug })
            }
        >
            <Image source={{ uri }} className="w-full rounded-lg" style={{ aspectRatio: ratio }} />
            <View className="mt-2 flex-row items-center justify-between gap-2">
                <Text numberOfLines={1} ellipsizeMode="tail" className="flex-1 font-metropolis-bold text-text-primary">
                    {game.title}
                </Text>
                {overall && (
                    <View className="flex-row items-center gap-2 rounded-lg bg-background-surface px-2 py-1">
                        <Text className="font-metropolis-black" style={{ color: ratingColor(overall) }}>
                            {overall.toFixed(1)}
                        </Text>
                        <Star fill={tailwindColors['cocoa-brown']} color={tailwindColors['cocoa-brown']} size={16} />
                    </View>
                )}
            </View>
        </Pressable>
    );
}
