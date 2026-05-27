import { useEffect, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

import BaseInterface from '@/components/BaseInterface';
import { useDebounce } from '@/hooks/useDebounce';
import { useGameSearch } from '@/hooks/useGameSearch';
import { useRouteStore } from '@/store/useRouteStore';
import { RootStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export default function SearchScreen() {
    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);
    useEffect(() => {
        setCurrentRoute('search');
    }, [setCurrentRoute]);
    const [searchQuery, setSearchQuery] = useState('');

    const navigation = useNavigation<NavigationProp>();

    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const { data: searchResults } = useGameSearch(debouncedSearchQuery);

    const [currentSearchResults, setCurrentSearchResults] = useState(searchResults || []);

    useEffect(() => {
        if (debouncedSearchQuery.length === 0) {
            setCurrentSearchResults([]);
            return;
        }
        if (searchResults && searchResults.length > 0) setCurrentSearchResults(searchResults);
    }, [searchResults, debouncedSearchQuery.length]);

    const containResults = currentSearchResults.length > 0 && searchQuery.length >= 3;

    const searchBarClass =
        searchQuery.length === 0
            ? 'w-full px-5 bg-background-surface border border-raspberry items-center rounded-full'
            : 'h-full w-full bg-background items-center';

    return (
        <BaseInterface navbar>
            <View className="flex-1 items-center px-4">
                <View className="mt-8 w-full">
                    <View className={searchBarClass}>
                        <View className="h-16 flex-row items-center justify-center">
                            <Search color="#D9D9D9" size={20} />
                            <TextInput
                                placeholder="Procurar jogo..."
                                placeholderTextColor="#787878"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                className="ml-2 flex-1 font-metropolis-medium text-text-primary"
                            />
                        </View>
                        {containResults && (
                            <View className="w-full justify-start pb-8">
                                <Text className="mb-2 mt-4 font-metropolis-medium text-text-secondary">
                                    Resultados para {'"'}
                                    {searchQuery}
                                    {'"'}
                                </Text>

                                {currentSearchResults.map((result, index) => (
                                    <Pressable
                                        onPress={() => navigation.navigate('Game', result)}
                                        key={index}
                                        className="w-full flex-row items-center border-t-2 border-background-surface-secondary px-4 py-4"
                                    >
                                        <Image
                                            source={{ uri: result.coverUrl }}
                                            className="h-16 w-16 self-center rounded-xl"
                                        />
                                        <Text className="ml-4 font-metropolis-medium text-text-primary">
                                            {result.title}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </BaseInterface>
    );
}
