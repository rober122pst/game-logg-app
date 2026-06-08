import { ScrollView, View } from 'react-native';

import BaseInterface from '@/components/BaseInterface';
import FeedActivityCard from '@/components/FeedActivityCard';
import GamesHorizontalList from '@/components/GamesHorizontalList';
import StatsSection from '@/components/StatsSection';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useGetPopularGames } from '@/hooks/gameHooks';
import { useRouteStore } from '@/store/useRouteStore';
import { FeedCardType } from '@/types';
import { Activity, Flame, Sparkle } from 'lucide-react-native';
import { useEffect } from 'react';

export default function Home() {
    const { data: games } = useGetPopularGames(5);
    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);

    useEffect(() => {
        setCurrentRoute('home');
    }, [setCurrentRoute]);

    const socialFeed: FeedCardType[] = [
        {
            id: 1,
            user: 'Sidney',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sidney&backgroundColor=b6e3f4',
            action: 'conquistou 100% das conquistas!',
            game: 'Batman Arkham Knight',
            time: 'Há 2 horas',
            likes: 14,
            comments: 3,
            gameImg:
                'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fbatman-arkham-knight%2FEGS_WB_Batman_Arkham_Knight_G1_1920x1080_19_0911-1920x1080-1d69e15f00cb5ab57249f208f1f8f45d52cbbc59.jpg',
            isAchievement: true, // Auto-post de platina
            playtime: '112h',
        },
        {
            id: 2,
            user: 'Daniel',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel&backgroundColor=c0aede',
            action: 'começou a jogar',
            game: 'Cyberpunk 2077',
            time: 'Há 5 horas',
            likes: 2,
            comments: 0,
            gameImg:
                'https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7',
            isAchievement: false,
        },
        {
            id: 3,
            user: 'Rober',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rober&backgroundColor=ffdfbf',
            action: 'começou a jogar',
            game: 'Resident Evil Veronica',
            time: 'Ontem',
            likes: 24,
            comments: 8,
            gameImg:
                'https://gaming-cdn.com/images/products/20199/orig/resident-evil-veronica-pc-steam-cover.jpg?v=1780734741',
            isAchievement: false,
        },
    ];

    return (
        <BaseInterface navbar>
            <ScrollView className="flex-1 gap-8 px-4 pb-8" showsVerticalScrollIndicator={false}>
                <StatsSection />
                <View className="mt-8">
                    <SectionTitle variant="header" Icon={Flame}>
                        Em destaque
                    </SectionTitle>
                    <GamesHorizontalList games={games} />
                </View>
                <View className="mt-8">
                    <SectionTitle variant="header" Icon={Sparkle}>
                        Para você
                    </SectionTitle>
                    <GamesHorizontalList games={games} />
                </View>
                <View className="mt-8">
                    <SectionTitle variant="header" Icon={Activity}>
                        Atividade
                    </SectionTitle>
                    <View className="mb-8 gap-5">
                        {socialFeed.map((item) => (
                            <FeedActivityCard card={item} key={item.id} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </BaseInterface>
    );
}
