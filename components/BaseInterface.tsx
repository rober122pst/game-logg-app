import { View } from "react-native";

export default function BaseInterface({ children }: { children?: React.ReactNode }) {
    return (
        <View className="bg-background min-h-screen text-text-primary p-4">
            {children}
        </View>
    )
}