import { Heart, Tag, Timeline } from 'lucide-react-native';
import { Image, ScrollView, Text, View } from 'react-native';

import defaultAvatar from '@/assets/placeholder/avatar.jpg';
import BaseInterface from '@/components/BaseInterface';
import GamesHorizontalList from '@/components/GamesHorizontalList';
import StatsSection from '@/components/StatsSection';
import DinamicBoldText from '@/components/ui/DinamicBoldText';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useGetProfileData } from '@/hooks/useGetProfileData';
import { useTailwindColors } from '@/hooks/useTailwindColors';
import { useRouteStore } from '@/store/useRouteStore';
import { useUserStore } from '@/store/useUserStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';

export default function Profile() {
    const user = useUserStore((s) => s.user);
    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);

    useEffect(() => {
        setCurrentRoute('profile');
    }, [setCurrentRoute]);

    const { data, isLoading } = useGetProfileData();

    // useEffect(() => {
    //     console.log(error, games);
    // }, [error, games]);

    const tailwindColors = useTailwindColors();
    const profile = user?.profile;

    const timeline = [
        {
            id: 1,
            date: 'Junho de 2026',
            color: tailwindColors['cocoa-brown'],
            event: 'Conquistou Platina em **Twelve Minutes**.',
        },
        {
            id: 2,
            date: 'Junho de 2026',
            color: tailwindColors['cocoa-brown'],
            event: 'Conquistou Platina em **Twelve Minutes**.',
        },
        {
            id: 3,
            date: 'Junho de 2026',
            color: tailwindColors['cocoa-brown'],
            event: 'Conquistou Platina em **Twelve Minutes**.',
        },
    ];

    let Render = () => <View className="flex-1"></View>;
    if (user && profile && !isLoading && data) {
        const ratings = data.favoriteGames.map((g) => {
            const rating = g.rating;
            if (!rating) return;
            return (rating.gameplay + rating.graphics + rating.story + rating.sound) / 4 + Number(rating.favorite);
        });
        Render = () => (
            <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
                <View className="my-8">
                    <View className="h-48 w-full rounded-lg bg-background-surface">
                        <Image source={defaultAvatar} className="h-full w-full rounded-lg" />
                        <Image
                            source={defaultAvatar}
                            className="absolute -bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-4 border-background"
                        />
                    </View>
                    <Text className="mt-12 text-center font-metropolis-bold text-2xl text-text-primary">
                        {profile.displayName}
                    </Text>
                    <Text className="text-center font-metropolis text-sm text-text-secondary">@{user.username}</Text>
                    <View className="mt-3 w-full rounded-lg border border-background-surface-secondary bg-background-surface">
                        <Text className="h-24 px-2 py-4 text-center font-metropolis leading-tight text-text-primary">
                            {profile.bio
                                ? profile.bio
                                : 'Este jogador não escreveu sua jornada ainda. \n Talvez ele queira manter um pouco de mistério... 🤫'}
                        </Text>
                    </View>
                </View>
                <StatsSection />
                <View className="my-8 overflow-hidden rounded-lg">
                    <LinearGradient
                        className="p-4"
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        colors={[tailwindColors.raspberry, tailwindColors['raspberry-dark']]}
                        locations={[0, 0.7]}
                    >
                        <View className="flex-row">
                            <Text className="font-metropolis text-base uppercase text-text-primary">JOGANDO AGORA</Text>
                            {data.playingNow.totalPlaying > 0 && (
                                <Text className="ml-auto text-right font-metropolis-light text-base text-text-primary">
                                    Junto de
                                </Text>
                            )}
                        </View>
                        <View className="flex-row">
                            <Text className="font-metropolis-black text-xl text-text-primary">
                                {data.playingNow.currentGame}
                            </Text>
                            {data.playingNow.totalPlaying > 0 && (
                                <Text className="ml-auto text-right font-metropolis-semi-bold text-xl text-text-primary">
                                    {data.playingNow.totalPlaying === 1
                                        ? 'Mais um'
                                        : `${data.playingNow.totalPlaying} jogos`}
                                </Text>
                            )}
                        </View>
                    </LinearGradient>
                </View>
                <View className="mb-8">
                    <SectionTitle Icon={Tag} variant="header">
                        Gêneros mais jogados
                    </SectionTitle>
                    <View className="gap-4 rounded-lg border border-background-surface-secondary bg-background-surface p-6">
                        <View>
                            <View className="flex-row justify-between">
                                <Text className="font-metropolis-semi-bold text-sm text-text-secondary">
                                    {data.topGenres.stats[0].genre}
                                </Text>
                                <Text className="font-metropolis text-sm text-text-secondary">
                                    {Math.round(data.topGenres.stats[0].percentage)}%
                                </Text>
                            </View>
                            <View className="mt-0.5 h-2 w-full overflow-hidden rounded-full bg-background-surface-secondary">
                                <View
                                    className="h-full bg-raspberry"
                                    style={{ width: `${Math.round(data.topGenres.stats[0].percentage)}%` }}
                                />
                            </View>
                        </View>
                        <View>
                            <View className="flex-row justify-between">
                                <Text className="font-metropolis-semi-bold text-sm text-text-secondary">
                                    {data.topGenres.stats[1].genre}
                                </Text>
                                <Text className="font-metropolis text-sm text-text-secondary">
                                    {Math.round(data.topGenres.stats[1].percentage)}%
                                </Text>
                            </View>
                            <View className="mt-0.5 h-2 w-full overflow-hidden rounded-full bg-background-surface-secondary">
                                <View
                                    className="h-full bg-cocoa-brown"
                                    style={{ width: `${Math.round(data.topGenres.stats[1].percentage)}%` }}
                                />
                            </View>
                        </View>
                        <View>
                            <View className="flex-row justify-between">
                                <Text className="font-metropolis-semi-bold text-sm text-text-secondary">
                                    {data.topGenres.stats[2].genre}
                                </Text>
                                <Text className="font-metropolis text-sm text-text-secondary">
                                    {Math.round(data.topGenres.stats[2].percentage)}%
                                </Text>
                            </View>
                            <View className="mt-0.5 h-2 w-full overflow-hidden rounded-full bg-background-surface-secondary">
                                <View
                                    className="h-full bg-mint"
                                    style={{ width: `${Math.round(data.topGenres.stats[2].percentage)}%` }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View className="mb-8">
                    <SectionTitle Icon={Heart} variant="header">
                        jogos favoritos
                    </SectionTitle>
                    <View>
                        <GamesHorizontalList games={data.favoriteGames.map((g) => g.game)} ratings={ratings} />
                    </View>
                </View>
                <View className="mb-8">
                    <SectionTitle Icon={Timeline} variant="header">
                        Linha do tempo
                    </SectionTitle>
                    <View className="gap-6 border-l-2 border-background-surface-secondary">
                        {timeline.map((tl) => (
                            <View key={tl.id} className="relative pl-4">
                                <View
                                    className="absolute left-0 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-background"
                                    style={{ backgroundColor: tl.color }}
                                />
                                <Text className="mb-1 font-metropolis text-text-secondary">{tl.date}</Text>
                                <View className="rounded-lg border border-background-surface-secondary bg-background-surface p-4">
                                    <DinamicBoldText text={tl.event} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        );
    }

    return (
        <BaseInterface navbar>
            <Render />
        </BaseInterface>
    );
}
