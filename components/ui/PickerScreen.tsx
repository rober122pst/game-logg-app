import { FlatList, Pressable, Text } from "react-native";

type Item = {
    name: string;
}

interface PickerScreenProps {
    items: Item[],
    onSelect: (name: string) => void;
    onDestroy: () => void;
}

export default function PickerScreen({ items, onSelect, onDestroy }: PickerScreenProps) {
    const Options = ({ item }: { item: Item }) => {
        const handleSelect = () => {
            onSelect(item.name);
            onDestroy();
        }

        return (
            <Pressable className="text-text-primary font-metropolis-semi-bold px-8 py-4 border-b border-background-surface-secondary" onPress={handleSelect}>
                <Text className="text-text-primary font-metropolis-medium text-xl">
                    {item.name}
                </Text>
            </Pressable>
        );
    }

    return (
        <FlatList
            className="absolute top-0 left-0 bg-background-surface h-screen w-full"
            data={items}
            renderItem={Options}
            keyExtractor={(item) => item.name}
        />
    );
}