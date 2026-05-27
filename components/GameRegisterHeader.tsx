import { ArrowLeft } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GameRegisterHeader({ gameTitle }: { gameTitle: string }) {
    return (
        <SafeAreaView
            edges={['top']}
            className="w-full flex-row items-center gap-4 border-b border-background-surface-secondary bg-background-surface px-6 pb-4"
        >
            <Pressable className="rounded-full bg-background-surface-secondary p-4">
                <ArrowLeft color="#D9D9D9" />
            </Pressable>
            <View className="justify-center">
                <Text className="font-metropolis-bold text-2xl text-text-primary">Registrar jogo</Text>
                <Text className="font-metropolis-light text-xl text-text-secondary">{gameTitle}</Text>
            </View>
        </SafeAreaView>
    );
}
