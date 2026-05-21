import { useTailwindColors } from "@/hooks/useTailwindColors";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameRegisterHeader({ gameTitle }: { gameTitle: string }) {
    const tailwindColors = useTailwindColors();

    return (
        <SafeAreaView className="w-full flex-row gap-4 items-center px-6 bg-background-surface border-b border-background-surface-secondary">
            <Pressable className="bg-background-surface-secondary p-4 rounded-full">
                <ArrowLeft color='#D9D9D9' />
            </Pressable>
            <View className="justify-center">
                <Text className="text-text-primary font-metropolis-bold text-2xl">Registrar jogo</Text>
                <Text className="text-text-secondary font-metropolis-light text-xl">{gameTitle}</Text>
            </View>
        </SafeAreaView>
    )
}