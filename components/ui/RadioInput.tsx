import React from "react";
import { Pressable } from "react-native";

type RadioInputProps = {
    selected: boolean;
    onPress?: () => void;
    children?: React.JSX.Element
}

export default function RadioInput({ selected, onPress, children }: RadioInputProps) {
    return (
        <Pressable className={`py-4 px-4 flex-1 rounded-lg ${selected ? 'bg-raspberry/15 border border-raspberry' : 'bg-background-surface-secondary border border-background-surface-secondary'}`} onPress={onPress}>
            {children}
        </Pressable>
    );
}