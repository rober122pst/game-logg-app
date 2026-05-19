import { Text } from "react-native";

export function SectionTitle({ children }: { children: string }) {
    return (
        <Text className="text-text-secondary text-xl font-metropolis-semi-bold mb-4 uppercase tracking-widest">
            {children}
        </Text>
    );
}