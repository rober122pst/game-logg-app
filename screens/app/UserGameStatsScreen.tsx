import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollOffset } from 'react-native-reanimated';

import Logo from '@/assets/placeholder/avatar.jpg';
import BaseInterface from '@/components/BaseInterface';
import BeatEventsTimeline from '@/components/BeatEventsTimeline';
import DifficultyRating from '@/components/DifficultyRating';
import GameLoadingComponent from '@/components/GameLoadingComponent';
import PlaytimeComparison from '@/components/PlaytimeComparison';
import RatingBarsComponent from '@/components/RatingBarsComponent';
import UserGameStatusBadge from '@/components/UserGameStatusBadge';
import { CustomButton } from '@/components/ui/CustomButton';
import { useNavigationCustom } from '@/hooks/useNavigationCustom';
import { useTailwindColors } from '@/hooks/useTailwindColors';
import { useUserGames } from '@/hooks/userGamesHooks';
import { RootStackParamList } from '@/types';
import { Calendar, Monitor, Zap } from 'lucide-react-native';

export default function UserGameStatsScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'UserGameStats'>>();
    const { userGameId, gameTitle } = route.params;
    const tailwindColors = useTailwindColors();

    const navigation = useNavigationCustom<'UserGameStats'>();
    const { data: userGames, isLoading, isError } = useUserGames({ id: userGameId });

    // Find the specific user game by ID
    const userGame = userGames?.[0];

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollOffset(scrollRef);

    const IMG_HEIGHT = 240;

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.5]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    if (isLoading) return <GameLoadingComponent gameParams={{ igdbId: 0, title: gameTitle, coverUrl: '', slug: '' }} />;
    if (isError || !userGame) {
        return (
            <BaseInterface navbar>
                <View className="flex-1 items-center justify-center">
                    <Text className="font-metropolis text-text-secondary">Erro ao carregar estatísticas</Text>
                </View>
            </BaseInterface>
        );
    }

    const game = userGame.game;
    const hasRating = !!userGame.rating;
    const platformNames =
        userGame.playedPlatforms?.map((p) => p.platform?.name).join(', ') || 'Plataforma desconhecida';

    return (
        <>
            <BaseInterface navbar>
                <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                    {/* Animated Banner */}
                    <Animated.Image
                        source={game.bannerUrl ? { uri: game.bannerUrl } : Logo}
                        className="rounded-xl"
                        style={[{ height: IMG_HEIGHT }, imageAnimatedStyle]}
                    />

                    <View className="flex gap-4 bg-background px-4 pb-8">
                        {/* Game Title */}
                        <View>
                            <Text className="mt-4 font-metropolis-bold text-2xl text-text-primary">{game.title}</Text>
                        </View>

                        {/* Quick Stats Card */}
                        <View className="rounded-lg border border-background-surface-secondary bg-background-surface p-4">
                            <Text className="mb-4 font-metropolis-semi-bold text-sm uppercase tracking-widest text-text-secondary">
                                Seu Registro
                            </Text>
                            <View className="flex-row items-center gap-3">
                                <View className="w-1/3 gap-2 border-r border-background-surface-secondary">
                                    <Text className="font-metropolis-light text-xs text-text-secondary">STATUS</Text>
                                    <View>
                                        <UserGameStatusBadge status={userGame.status} size="sm" />
                                    </View>
                                </View>
                                <View className="w-1/3 gap-2 border-r border-background-surface-secondary">
                                    <Text className="font-metropolis-light text-xs text-text-secondary">TEMPO</Text>
                                    <Text className="font-metropolis-semi-bold text-text-primary">
                                        {userGame.initialPlaytime ? `${userGame.initialPlaytime}h` : 'N/A'}
                                    </Text>
                                </View>
                                <View className="w-1/3 gap-2">
                                    <Text className="font-metropolis-light text-xs text-text-secondary">NOTA</Text>
                                    {hasRating ? (
                                        <Text className="font-metropolis-black text-base text-text-primary">
                                            {
                                                // prettier-ignore
                                                userGame.rating
                                                    ?
                                                    ((userGame.rating.gameplay +
                                                        userGame.rating.graphics +
                                                        userGame.rating.sound +
                                                        userGame.rating.story) /
                                                        4 +
                                                        Number(userGame.rating.favorite)).toFixed(
                                                            1
                                                        )
                                                    : 'Sem nota'
                                            }
                                        </Text>
                                    ) : (
                                        <Text className="font-metropolis text-text-secondary">Sem nota</Text>
                                    )}
                                </View>
                            </View>
                        </View>

                        {/* Steam Stats & Playtime Comparison */}
                        {userGame.steam && (
                            <View className="rounded-lg border border-background-surface-secondary bg-background-surface p-4">
                                <Text className="mb-4 font-metropolis-semi-bold text-sm uppercase tracking-widest text-text-secondary">
                                    Tempo de Jogo
                                </Text>
                                <PlaytimeComparison
                                    playtimeForever={userGame.steam.playtimeForever}
                                    playtime2Weeks={userGame.steam.playtime_2weeks}
                                />
                            </View>
                        )}

                        {/* Difficulty Rating */}
                        {userGame.rating?.difficulty && <DifficultyRating difficulty={userGame.rating.difficulty} />}

                        {/* Beat Events Timeline */}
                        {userGame.beatEvents && userGame.beatEvents.length > 0 && (
                            <View className="rounded-lg border border-background-surface-secondary bg-background-surface p-4">
                                <Text className="mb-4 font-metropolis-semi-bold text-sm uppercase tracking-widest text-text-secondary">
                                    Marcos Alcançados
                                </Text>
                                <BeatEventsTimeline events={userGame.beatEvents} />
                            </View>
                        )}

                        {/* Detailed Ratings Section */}
                        {userGame.rating && (
                            <View className="rounded-lg border border-background-surface-secondary bg-background-surface p-4">
                                <Text className="mb-4 font-metropolis-semi-bold text-sm uppercase tracking-widest text-text-secondary">
                                    Avaliação Detalhada
                                </Text>
                                <RatingBarsComponent rating={userGame.rating} />
                            </View>
                        )}

                        {/* Platform & Metadata */}
                        <View className="rounded-lg border border-background-surface-secondary bg-background-surface p-4">
                            <Text className="mb-3 font-metropolis-semi-bold text-sm uppercase tracking-widest text-text-secondary">
                                Detalhes
                            </Text>
                            <View className="gap-3">
                                <View className="flex-row items-center gap-2">
                                    <Monitor size={16} color={tailwindColors.mint} />
                                    <View>
                                        <Text className="font-metropolis-light text-xs text-text-secondary">
                                            Plataforma
                                        </Text>
                                        <Text className="font-metropolis text-text-primary">{platformNames}</Text>
                                    </View>
                                </View>
                                {userGame.createdAt && (
                                    <View className="flex-row items-center gap-2">
                                        <Calendar size={16} color={tailwindColors.mint} />
                                        <View>
                                            <Text className="font-metropolis-light text-xs text-text-secondary">
                                                Registrado em
                                            </Text>
                                            <Text className="font-metropolis text-text-primary">
                                                {new Date(userGame.createdAt).toLocaleDateString('pt-BR')}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                                {userGame.price !== null && (
                                    <View className="flex-row items-center gap-2">
                                        <Zap size={16} color={tailwindColors.mint} />
                                        <View>
                                            <Text className="font-metropolis-light text-xs text-text-secondary">
                                                Preço
                                            </Text>
                                            <Text className="font-metropolis text-text-primary">
                                                R$ {Number(userGame.price).toFixed(2)}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* Personal Notes / Comments */}
                        {userGame.rating && userGame.rating.comment && (
                            <View className="rounded-lg border border-background-surface-secondary bg-background-surface p-4">
                                <Text className="mb-2 font-metropolis-semi-bold text-sm uppercase tracking-widest text-text-secondary">
                                    Nota Pessoal
                                </Text>
                                <Text className="font-metropolis text-base text-text-primary">
                                    {userGame.rating.comment}
                                </Text>
                            </View>
                        )}

                        {/* Register New Event Button */}
                        <CustomButton
                            title="Registrar Novo Evento"
                            onPress={() => navigation.navigate('BeatEventRegister', { userGameId, game })}
                        />
                    </View>
                </Animated.ScrollView>
            </BaseInterface>
        </>
    );
}
