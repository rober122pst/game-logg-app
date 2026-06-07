import { RouteProp, useRoute } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollOffset } from 'react-native-reanimated';

import Logo from '@/assets/placeholder/avatar.jpg';
import BaseInterface from '@/components/BaseInterface';
import GameLoadingComponent from '@/components/GameLoadingComponent';
import ScreenshotPhotos from '@/components/ScreenshotPhotos';
import { CustomButton } from '@/components/ui/CustomButton';
import { useGame } from '@/hooks/gameHooks';
import { useNavigationCustom } from '@/hooks/useNavigationCustom';
import { useUserGames } from '@/hooks/userGamesHooks';
import { useTailwindColors } from '@/hooks/useTailwindColors';
import { GameAction } from '@/reducers/gameEventReducer';
import { GameStatus } from '@/reducers/gameRegisterReducer';
import { ratingColor } from '@/services/ratingColor';
import { RootStackParamList } from '@/types';
import { CheckCircle2, Gamepad, Gamepad2, HeartOff, LucideProps, Percent, Star, Trophy } from 'lucide-react-native';
import { useEffect, useState } from 'react';

interface GameLoggsProps {
    gameId: string;
    contain: (contain: boolean) => void;
}

function GameLoggs({ gameId, contain }: GameLoggsProps) {
    const tailwindColors = useTailwindColors();
    const { data, isLoading, isError } = useUserGames({ gameId });

    useEffect(() => {
        contain(data?.[0] !== undefined);
    }, [data, contain]);

    if (isError) return <Text className="font-metropolis text-text-secondary">Algum erro ao carregar informações</Text>;
    else if (isLoading || !data?.[0]) return;

    const ug = data[0];

    type StatusInfo = {
        label: string;
        icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
        color: string;
    };

    const status: Record<Exclude<GameStatus, 'BEAT_EVENT'> | GameAction, StatusInfo> = {
        PLAYING: {
            label: 'Jogando',
            icon: Gamepad2,
            color: tailwindColors.raspberry,
        },
        I_WILL_PLAY: {
            label: 'Adquirido',
            icon: Gamepad,
            color: tailwindColors['text-primary'].dark,
        },
        DROPPED: {
            label: 'Dropei',
            icon: HeartOff,
            color: tailwindColors['text-secondary'].dark,
        },
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

    const Icon = status[ug.status].icon;
    const ratingOverall = ug.rating
        ? (ug.rating.gameplay + ug.rating.graphics + ug.rating.sound + ug.rating.story) / 4 + Number(ug.rating.favorite)
        : undefined;

    return (
        <View className="w-full rounded-lg border border-background-surface-secondary bg-background-surface p-4">
            <Text className="mb-4 font-metropolis-semi-bold text-sm uppercase tracking-widest text-text-secondary">
                Seu Registro
            </Text>
            <View className="flex-row items-center gap-3">
                <View className="w-1/3 gap-2 border-r border-background-surface-secondary">
                    <Text className="font-metropolis-light text-xs text-text-secondary">STATUS</Text>
                    <Text className="font-metropolis-semi-bold text-text-primary">
                        <Icon color={status[ug.status].color} size={12} /> {status[ug.status].label}
                    </Text>
                </View>
                <View className="w-1/3 gap-2 border-r border-background-surface-secondary">
                    <Text className="font-metropolis-light text-xs text-text-secondary">TEMPO</Text>
                    <Text className="font-metropolis-semi-bold text-text-primary">{ug.initialPlaytime || 'N/A'}</Text>
                </View>
                <View className="w-1/3 gap-2">
                    <Text className="font-metropolis-light text-xs text-text-secondary">NOTA</Text>
                    <Text
                        className="font-metropolis-black text-text-primary"
                        style={{ color: ratingColor(ratingOverall ?? 4) }}
                    >
                        {ratingOverall?.toFixed(1) ?? 'Sem nota'}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default function GameScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'Game'>>();
    const gameParams = route.params;
    const { data: game, isLoading, error } = useGame(gameParams.igdbId);

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOfset = useScrollOffset(scrollRef);

    const navigation = useNavigationCustom<'Game'>();

    const IMG_HEIGHT = 256;

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOfset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.5]
                    ),
                },
                {
                    scale: interpolate(scrollOfset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    const [contain, setContain] = useState(false);

    if (isLoading || !game) return <GameLoadingComponent gameParams={gameParams} />;

    if (error) return <Text>Deu erro rapaz</Text>;

    const rating = game.ratings[0].score;

    const ratingColor = (() => {
        if (!rating) return 'text-text-primary';
        if (rating < 30) {
            return 'text-red-500';
        } else if (rating < 50) {
            return 'text-text-primary';
        } else if (rating < 75) {
            return 'text-mint';
        } else if (rating < 99) {
            return 'text-raspberry';
        } else if (rating === 100) {
            return 'text-cocoa-brown';
        }
        return 'text-text-primary';
    })();

    return (
        <>
            <BaseInterface navbar>
                <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                    <Animated.Image
                        source={game.bannerUrl ? { uri: game.bannerUrl } : Logo}
                        className="rounded-xl"
                        style={[{ height: IMG_HEIGHT }, imageAnimatedStyle]}
                    />
                    <View className="flex gap-4 bg-background px-4 pb-8">
                        <View>
                            <Text className="mt-4 font-metropolis-bold text-2xl text-text-primary">{game.title}</Text>
                            <View className="gap-1">
                                <Text className="font-metropolis-medium text-lg text-text-secondary">
                                    Avaliação:{' '}
                                    <Text className={ratingColor}>
                                        {game.ratings.length > 0 ? `${game.ratings[0].score}%` : 'Sem avaliação'}
                                    </Text>
                                </Text>
                                <Text className="font-metropolis-medium text-lg text-text-secondary">
                                    Lançamento:{' '}
                                    {game.releaseDate
                                        ? new Date(game.releaseDate).toLocaleDateString()
                                        : 'Data desconhecida'}
                                </Text>
                            </View>
                        </View>
                        {contain ? (
                            <CustomButton
                                title="Registrar Evento"
                                onPress={() => navigation.navigate('UserGameRegister', { game })}
                            />
                        ) : (
                            <View className="flex-row gap-4">
                                <View className="flex-1">
                                    <CustomButton
                                        title="Fazer Logg"
                                        onPress={() => navigation.navigate('UserGameRegister', { game })}
                                    />
                                </View>
                                <CustomButton title="Wishlist" variant="secondary" />
                            </View>
                        )}
                        <GameLoggs gameId={game.id} contain={(contain) => setContain(contain)} />
                        <View>
                            <Text className="mb-1 font-metropolis-semi-bold text-lg uppercase tracking-widest text-text-secondary">
                                Sobre o jogo
                            </Text>
                            <Text className="font-metropolis text-base text-text-primary">
                                {game.description || 'Sem descrição'}
                            </Text>
                        </View>
                        <FlatList
                            className="rounded-lg"
                            data={game.screenshots}
                            renderItem={({ item }) => <ScreenshotPhotos uri={item} />}
                            keyExtractor={(item) => item}
                            contentContainerStyle={{
                                gap: 16,
                            }}
                            horizontal
                        />
                    </View>
                </Animated.ScrollView>
            </BaseInterface>
        </>
    );
}
