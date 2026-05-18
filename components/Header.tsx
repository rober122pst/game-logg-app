import { Text, View } from "react-native";

import { Bell } from "lucide-react-native";

export default function Header() {
    return (
        <View className="flex-row px-4 pt-4 justify-between items-center">
            <Text className="text-text-primary text-2xl font-metropolis-semi-bold">
                Game LoGG
            </Text>
            <Bell color="#D9D9D9" size={28} />
        </View>
    )
}