
import BaseInterface from "@/components/BaseInterface";
import { useDebounce } from "@/hooks/useDebounce";
import { useGameSearch } from "@/hooks/useGameSearch";
import { useRouteStore } from "@/store/useRouteStore";
import { RootStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export default function SearchScreen() {
    useEffect(() => {
        setCurrentRoute('search');
    }, []);

    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);

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
    }, [searchResults]);

    const containResults = currentSearchResults.length > 0 && searchQuery.length >= 3;

    const searchBarClass = searchQuery.length === 0 ? "w-full px-5 bg-background-surface border border-raspberry items-center rounded-full"
        : "h-full w-full bg-background items-center";

    return (
        <BaseInterface navbar>
            <View className="flex-1 items-center px-4">
                <View className="w-full mt-8">
                    <View className={searchBarClass}>
                        <View className="flex-row items-center justify-center h-16">
                            <Search color="#D9D9D9" size={20} />
                            <TextInput
                                placeholder="Procurar jogo..."
                                placeholderTextColor="#787878"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                className="text-text-primary ml-2 flex-1 font-metropolis-medium"
                            />
                        </View>
                        {containResults && (
                            <View className="justify-start pb-8 w-full">
                                <Text className="text-text-secondary font-metropolis-medium mt-4 mb-2">
                                    Resultados para "{searchQuery}"
                                </Text>

                                {currentSearchResults.map((result, index) => (
                                    <Pressable onPress={() => navigation.navigate('Game', result)} key={index} className="w-full px-4 py-4 border-t-2 border-background-surface-secondary flex-row items-center">
                                        <Image source={{ uri: result.coverUrl }} className="h-16 w-16 self-center rounded-xl" />
                                        <Text className="text-text-primary font-metropolis-medium ml-4">{result.title}</Text>
                                    </Pressable>
                                ))}

                            </View>
                        )}
                    </View>
                </View>
            </View>
        </BaseInterface>
    )
}