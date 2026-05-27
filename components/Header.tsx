import Logo from '@/assets/logos/GameLoGG.svg';
import { Bell } from 'lucide-react-native';
import { View } from 'react-native';

export default function Header() {
    return (
        <View className="h-16 flex-row items-center justify-between px-4 pt-4">
            <Logo width={120} />
            <Bell color="#D9D9D9" size={28} />
        </View>
    );
}
