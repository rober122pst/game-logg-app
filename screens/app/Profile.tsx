import BaseInterface from '@/components/BaseInterface';
import { useRouteStore } from '@/store/useRouteStore';
import { useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import defaultAvatar from '@/assets/placeholder/avatar.jpg';
import GamesHorizontalList from '@/components/GamesHorizontalList';
import LoadingComponent from '@/components/LoadingComponent';
import StatsSection from '@/components/StatsSection';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useUserGames } from '@/hooks/userGamesHooks';
import { useUserStore } from '@/store/useUserStore';
import { Heart } from 'lucide-react-native';

export default function Profile() {
    const user = useUserStore((s) => s.user);
    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);

    useEffect(() => {
        setCurrentRoute('profile');
    }, [setCurrentRoute]);

    const { data: games } = useUserGames({ favorite: true });

    // useEffect(() => {
    //     console.log(error, games);
    // }, [error, games]);

    if (!user) return <LoadingComponent />;

    const profile = user.profile;

    if (!profile) return <LoadingComponent />;

    return (
        <BaseInterface navbar>
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
                <View className="my-8">
                    <SectionTitle Icon={Heart} variant="header">
                        jogos favoritos
                    </SectionTitle>
                    <View>
                        <GamesHorizontalList games={games?.map((g) => g.game)} />
                    </View>
                </View>
            </ScrollView>
        </BaseInterface>
    );
}
