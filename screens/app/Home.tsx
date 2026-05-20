import { FlatList, ScrollView, View } from "react-native";

import BaseInterface from "@/components/BaseInterface";
import GameCover from "@/components/GamesCover";
import Header from "@/components/Header";
import LoadingComponent from "@/components/LoadingComponent";
import StatsSection from "@/components/StatsSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useGames } from "@/hooks/gameHooks";
import { useMe } from "@/hooks/userHooks";
import { useRouteStore } from "@/store/useRouteStore";
import { Flame } from "lucide-react-native";
import { useEffect } from "react";

export default function Home() {
    const { data, isLoading } = useMe();
    const { data: games } = useGames(5);
    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);

    useEffect(() => {
        setCurrentRoute('home');
    }, [setCurrentRoute]);

    if (isLoading || !data) return <LoadingComponent />

    return (
        <BaseInterface navbar>
            <Header />
            <ScrollView className="flex-1 gap-8 px-4 py-8">
                <StatsSection />
                <View className="mt-8">
                    <SectionTitle variant="header" Icon={Flame}>
                        Em destaque
                    </SectionTitle>
                    <FlatList
                        className="rounded-lg"
                        data={games}
                        renderItem={({ item }) => <GameCover game={item} name={item.title} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 32 }}
                    />
                </View>
            </ScrollView>
        </BaseInterface>
    )
}