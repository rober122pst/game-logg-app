import BaseInterface from "@/components/BaseInterface";
import GameLoadingComponent from "@/components/GameLoadingComponent";
import { useGame } from "@/hooks/gameHooks";
import { RootStackParamList } from "@/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function GameScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'Game'>>();
    const gameParams = route.params;
    const { data: game, isLoading, error } = useGame(gameParams.igdbId);

    useEffect(() => {
        console.log(game);
    }, []);

    if (isLoading || !game) return <GameLoadingComponent gameParams={gameParams} />;

    if (error) return <Text>Deu erro rapaz</Text>


    return (
        <BaseInterface navbar>
            <View className="relative w-full h-64 bg-background-surface rounded-xl items-center justify-center">
                <Image source={{ uri: game.bannerUrl }} className="w-full h-full rounded-xl" resizeMode="cover" />
                <View className="absolute inset-0 bg-background/80 rounded-xl" />
            </View>
            <View className="flex-1 px-4">
                <View>
                    <Text className="text-text-primary text-2xl font-metropolis-bold mt-4">
                        {game.title}
                    </Text>
                    <View className="gap-1">
                        <Text className="text-text-primary text-lg font-metropolis-medium">
                            Avaliação: {game.ratings.length > 0 ? `${game.ratings[0].score}%` : 'Sem avaliação'}
                        </Text>
                        <Text className="text-text-primary text-lg font-metropolis-medium">
                            Lançamento: {game.releaseDate ? new Date(game.releaseDate).toLocaleDateString() : 'Data desconhecida'}
                        </Text>
                    </View>
                </View>
                <View className="mt-4">
                    <Text className="text-text-primary text-base font-metropolis-regular">
                        {game.description || 'Sem descrição disponível.'}
                    </Text>
                </View>
            </View>
        </BaseInterface>
    )
}