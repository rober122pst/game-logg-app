import BaseInterface from '@/components/BaseInterface';
import GameCover from '@/components/GamesCover';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useUserGames } from '@/hooks/userGamesHooks';
import { useRouteStore } from '@/store/useRouteStore';
import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function Library() {
    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);
    const { data, isError } = useUserGames();

    useEffect(() => {
        setCurrentRoute('library');
    }, [setCurrentRoute]);

    if (isError)
        return <Text className="font-metropolis text-text-secondary">Não foi possivel encontra os jogos.</Text>;

    return (
        <BaseInterface navbar>
            <View className="flex-1 items-center px-4">
                {data && (
                    <>
                        <SectionTitle>Meus Jogos</SectionTitle>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <GameCover game={item.game} width={160} />}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            contentContainerClassName="gap-4"
                            columnWrapperClassName="gap-8"
                        />
                    </>
                )}
            </View>
        </BaseInterface>
    );
}
