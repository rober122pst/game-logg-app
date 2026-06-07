import { ScrollView, View } from 'react-native';

import BaseInterface from '@/components/BaseInterface';
import GamesHorizontalList from '@/components/GamesHorizontalList';
import StatsSection from '@/components/StatsSection';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useGetPopularGames } from '@/hooks/gameHooks';
import { useRouteStore } from '@/store/useRouteStore';
import { Flame } from 'lucide-react-native';
import { useEffect } from 'react';

export default function Home() {
    const { data: games } = useGetPopularGames(5);
    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);

    useEffect(() => {
        setCurrentRoute('home');
    }, [setCurrentRoute]);

    return (
        <BaseInterface navbar>
            <ScrollView className="flex-1 gap-8 px-4 pb-8">
                <StatsSection />
                <View className="mt-8">
                    <SectionTitle variant="header" Icon={Flame}>
                        Em destaque
                    </SectionTitle>
                    <GamesHorizontalList games={games} />
                </View>
            </ScrollView>
        </BaseInterface>
    );
}
