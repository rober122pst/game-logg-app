import Logo from '@/assets/logos/GameLoGG.svg';
import { Bell } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header() {
    return (
        <SafeAreaView edges={['top']} className="h-16 bg-background">
            <View className="h-16 w-full flex-row items-center justify-between px-4">
                <Logo width={120} />
                <Bell color="#D9D9D9" size={28} />
            </View>
        </SafeAreaView>
    );
}
