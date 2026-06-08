import BaseInterface from '@/components/BaseInterface';
import HorizontalGameCard from '@/components/HorizontalGameCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useUserGames } from '@/hooks/userGamesHooks';
import { useRouteStore } from '@/store/useRouteStore';
import { LibraryBig, Search } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

export default function Library() {
    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);
    const { data, isError } = useUserGames();
    const [option, setOption] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setCurrentRoute('library');
    }, [setCurrentRoute]);

    const options = [
        { type: null, label: 'Todos' },
        { type: 'PLAYING', label: 'Jogando' },
        { type: 'BEATED', label: 'Zerados' },
        { type: 'COMPLETED', label: '100%' },
        { type: 'PLATINUM', label: 'Platinados' },
        { type: 'PERFECT', label: 'Perfeitos' },
        { type: 'DROPPED', label: 'Dropados' },
    ] as const;

    const Option = ({ selected, item }: { selected: boolean; item: { type: string | null; label: string } }) => (
        <Pressable
            className={`rounded-full border p-4 ${selected ? 'border-raspberry bg-raspberry' : 'border-background-surface-secondary bg-background-surface'}`}
            onPress={() => setOption(item.type)}
        >
            <Text className="font-metropolis-semi-bold text-text-primary">{item.label}</Text>
        </Pressable>
    );

    const filteredGames = useMemo(() => {
        return data?.filter((game) => {
            const matchesSearch = game.game.title.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = !option || game.status === option;

            return matchesSearch && matchesStatus;
        });
    }, [data, search, option]);

    if (isError)
        return <Text className="font-metropolis text-text-secondary">Não foi possivel encontra os jogos.</Text>;

    return (
        <BaseInterface navbar>
            <View className="mt-6 flex-1 px-4">
                <View>
                    <SectionTitle variant="header" Icon={LibraryBig}>
                        Sua Biblioteca
                    </SectionTitle>
                    <Text className="-mt-2 mb-6 font-metropolis text-lg text-text-secondary">
                        Total de {data?.length} salvos
                    </Text>
                    <View className="h-16 flex-row items-center justify-center rounded-lg border border-background-surface-secondary bg-background-surface pl-3">
                        <Search color="#D9D9D9" size={20} />
                        <TextInput
                            placeholder="Buscar título, plataforma ou gênero..."
                            placeholderTextColor="#787878"
                            value={search}
                            onChangeText={setSearch}
                            className="ml-2 flex-1 font-metropolis-medium text-text-primary"
                        />
                    </View>
                    <FlatList
                        className="my-8"
                        data={options}
                        renderItem={({ item }) => <Option selected={option === item.type} item={item} />}
                        keyExtractor={(item) => item.label}
                        contentContainerClassName="gap-3"
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    />
                </View>
                {data && (
                    <FlatList
                        className="flex-1"
                        data={filteredGames}
                        renderItem={({ item }) => <HorizontalGameCard game={item} />}
                        keyExtractor={(item) => item.id}
                        contentContainerClassName="gap-5 pb-8"
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </BaseInterface>
    );
}
