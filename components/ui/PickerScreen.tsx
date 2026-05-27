import { FlatList, Pressable, Text } from 'react-native';

type Item = {
    name: string;
};

interface PickerScreenProps {
    items: Item[];
    onSelect: (name: string) => void;
    onDestroy: () => void;
}

export default function PickerScreen({ items, onSelect, onDestroy }: PickerScreenProps) {
    const Options = ({ item }: { item: Item }) => {
        const handleSelect = () => {
            onSelect(item.name);
            onDestroy();
        };

        return (
            <Pressable
                className="border-b border-background-surface-secondary px-8 py-4 font-metropolis-semi-bold text-text-primary"
                onPress={handleSelect}
            >
                <Text className="font-metropolis-medium text-xl text-text-primary">{item.name}</Text>
            </Pressable>
        );
    };

    return (
        <FlatList
            className="absolute left-0 top-0 h-screen w-full bg-background-surface"
            data={items}
            renderItem={Options}
            keyExtractor={(item) => item.name}
        />
    );
}
