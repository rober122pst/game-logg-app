import { HomeIcon, Search, User } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { useRouteStore } from '@/store/useRouteStore';
import { RootStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LibraryBig } from 'lucide-react-native/icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function Navbar() {
    const activeRoute = useRouteStore((s) => s.currentRoute);
    const navigation = useNavigation<NavigationProp>();

    return (
        <View className="h-20 flex-row items-center justify-around rounded-t-2xl border-l border-r border-t border-background-surface bg-background-surface">
            <Pressable
                className="h-full flex-1 items-center justify-center"
                onPress={() => navigation.navigate('Home')}
            >
                <HomeIcon color={activeRoute === 'home' ? '#E0055D' : '#D9D9D9'} />
            </Pressable>
            <Pressable
                className="h-full flex-1 items-center justify-center"
                onPress={() => navigation.navigate('Search')}
            >
                <Search color={activeRoute === 'search' ? '#E0055D' : '#D9D9D9'} />
            </Pressable>
            <Pressable
                className="h-full flex-1 items-center justify-center"
                onPress={() => navigation.navigate('Library')}
            >
                <LibraryBig color={activeRoute === 'library' ? '#E0055D' : '#D9D9D9'} />
            </Pressable>
            <Pressable
                className="h-full flex-1 items-center justify-center"
                onPress={() => navigation.navigate('Profile')}
            >
                <User color={activeRoute === 'profile' ? '#E0055D' : '#D9D9D9'} />
            </Pressable>
        </View>
    );
}
