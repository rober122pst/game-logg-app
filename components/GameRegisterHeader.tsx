import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameRegisterHeader({ gameTitle }: { gameTitle: string }) {
    return (
        <SafeAreaView className="h-16 w-full bg-background-surface border-b border-background-surface-secondary">
            <Text>{gameTitle}</Text>
        </SafeAreaView>
    )
}