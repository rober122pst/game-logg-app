import React from 'react';
import { Pressable } from 'react-native';

type RadioInputProps = {
    selected: boolean;
    onPress?: () => void;
    children?: React.JSX.Element;
};

export default function RadioInput({ selected, onPress, children }: RadioInputProps) {
    return (
        <Pressable
            className={`flex-1 rounded-lg px-2 py-4 ${selected ? 'border border-raspberry bg-raspberry/15' : 'border border-background-surface-secondary bg-background-surface-secondary'}`}
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
}
