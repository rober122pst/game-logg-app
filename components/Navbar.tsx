import { useRouteStore } from "@/store/useRouteStore";
import { RootStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeIcon, Search, User } from "lucide-react-native";
import { Pressable, View } from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function Navbar() {
    const activeRoute = useRouteStore((s) => s.currentRoute);
    const navigation = useNavigation<NavigationProp>();

    return (
        <View className="h-20 bg-background-surface border-t border-l border-r border-background-surface rounded-t-2xl flex-row items-center justify-around">
            <Pressable onPress={() => navigation.navigate('Home')}><HomeIcon color={activeRoute === 'home' ? '#E0055D' : '#D9D9D9'} /></Pressable>
            <Pressable onPress={() => navigation.navigate('Search')}><Search color={activeRoute === 'search' ? '#E0055D' : '#D9D9D9'} /></Pressable>
            <Pressable onPress={() => navigation.navigate('Profile')}><User color={activeRoute === 'profile' ? '#E0055D' : '#D9D9D9'} /></Pressable>
        </View>
    );
}