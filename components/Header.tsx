import { Text, View } from "react-native";

import { Bell } from "lucide-react-native";
import Avatar from "./ui/Avatar";

export default function Header({ username }: { username?: string }) {
    return (
        <View className="flex-row px-4 pt-14 justify-between items-center">
            <Text className="text-text-primary text-2xl font-metropolis-semi-bold">
                {username}
            </Text>
            <View className="flex-row gap-6 items-center">
                <Bell color="#D9D9D9" size={28} />
                <Avatar size={40} />
            </View>
        </View>
    )
}