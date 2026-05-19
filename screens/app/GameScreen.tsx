import { RouteProp, useRoute } from "@react-navigation/native";
import { FlatList, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollOffset } from "react-native-reanimated";

import Logo from '@/assets/placeholder/avatar.jpg';
import BaseInterface from "@/components/BaseInterface";
import GameLoadingComponent from "@/components/GameLoadingComponent";
import ScreenshotPhotos from "@/components/ScreenshotPhotos";
import { CustomButton } from "@/components/ui/CustomButton";
import { useGame } from "@/hooks/gameHooks";
import tailwindConfig from '@/tailwind.config';
import { RootStackParamList } from "@/types";
import { Trophy } from "lucide-react-native";
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig);

export default function GameScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'Game'>>();
    const gameParams = route.params;
    const { data: game, isLoading, error } = useGame(gameParams.igdbId);

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOfset = useScrollOffset(scrollRef);

    const IMG_HEIGHT = 256;

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOfset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.5],
                    )
                },
                {
                    scale: interpolate(
                        scrollOfset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1],
                    )
                }
            ],
        };
    });

    if (isLoading || !game) return <GameLoadingComponent gameParams={gameParams} />;

    if (error) return <Text>Deu erro rapaz</Text>

    const rating = game.ratings[0].score;

    const ratingColor = (() => {
        if (!rating) return 'text-text-primary'
        if (rating < 30) {
            return 'text-red-500';
        } else if (rating < 50) {
            return 'text-text-primary'
        } else if (rating < 75) {
            return 'text-mint'
        } else if (rating < 99) {
            return 'text-raspberry'
        } else if (rating === 100) {
            return 'text-cocoa-brown'
        }
        return 'text-text-primary';
    })()

    return (
        <>
            <BaseInterface navbar>
                <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false} >
                    <Animated.Image source={game.bannerUrl ? { uri: game.bannerUrl } : Logo} className="rounded-xl" style={[{ height: IMG_HEIGHT }, imageAnimatedStyle]} />
                    <View className="flex px-4 pb-8 bg-background gap-4">
                        <View>
                            <Text className="text-text-primary text-2xl font-metropolis-bold mt-4">
                                {game.title}
                            </Text>
                            <View className="gap-1">
                                <Text className="text-text-secondary text-lg font-metropolis-medium">
                                    Avaliação: <Text className={ratingColor}>{game.ratings.length > 0 ? `${game.ratings[0].score}%` : 'Sem avaliação'}</Text>
                                </Text>
                                <Text className="text-text-secondary text-lg font-metropolis-medium">
                                    Lançamento: {game.releaseDate ? new Date(game.releaseDate).toLocaleDateString() : 'Data desconhecida'}
                                </Text>
                            </View>
                        </View>
                        <CustomButton title="Fazer Logg" />
                        <View className="w-full bg-background-surface border border-background-surface-secondary rounded-lg p-4">
                            <Text className="text-text-secondary text-sm font-metropolis-semi-bold mb-4 uppercase tracking-widest">Seu Registro</Text>
                            <View className="flex-row items-center gap-3">
                                <View className="w-1/3 gap-2 border-r border-background-surface-secondary">
                                    <Text className="font-metropolis-light text-xs text-text-secondary">STATUS</Text>
                                    <Text className="text-text-primary font-metropolis-semi-bold">
                                        <Trophy color={fullConfig.theme.colors["cocoa-brown"]} size={12} /> Platinado
                                    </Text>
                                </View>
                                <View className="w-1/3 gap-2 border-r border-background-surface-secondary">
                                    <Text className="font-metropolis-light text-xs text-text-secondary">TEMPO</Text>
                                    <Text className="text-text-primary font-metropolis-semi-bold">
                                        76h
                                    </Text>
                                </View>
                                <View className="w-1/3 gap-2">
                                    <Text className="font-metropolis-light text-xs text-text-secondary">NOTA</Text>
                                    <Text className="text-text-primary font-metropolis-black">
                                        8
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text className="text-text-secondary text-lg font-metropolis-semi-bold mb-1 uppercase tracking-widest">
                                Sobre o jogo
                            </Text>
                            <Text className="font-metropolis text-text-primary text-base">
                                {game.description || 'Sem descrição'}
                            </Text>
                        </View>
                        <FlatList
                            className="rounded-lg"
                            data={game.screenshots}
                            renderItem={({ item }) => <ScreenshotPhotos uri={item} />}
                            keyExtractor={(item) => item}
                            contentContainerStyle={{
                                gap: 16
                            }}
                            horizontal
                        />
                    </View>
                </Animated.ScrollView>
            </BaseInterface>
        </>
    )
}