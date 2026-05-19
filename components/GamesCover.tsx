import { GameType, RootStackParamList } from "@/types";
import { useEffect, useState } from "react";
import { Image, Pressable, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function GameCover({ game, name }: { game: GameType; name?: string }) {
    const [ratio, setRatio] = useState<number>(1);

    const navigation = useNavigation<NavigationProp>();

    const uri = game.coverUrl || '';

    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            setRatio(width / height);
        });
    }, []);

    return (
        <Pressable className="w-56" onPress={() => navigation.navigate('Game', { igdbId: game.igdbId, title: game.title, coverUrl: uri, slug: game.slug })}>
            <Image source={{ uri }} className="w-full rounded-lg" style={{ aspectRatio: ratio }} />
            <Text className="text-text-primary font-metropolis-bold mt-2 w-full">{name}</Text>
        </Pressable>
    )
}