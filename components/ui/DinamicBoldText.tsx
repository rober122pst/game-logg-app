import { StyleProp, Text, TextStyle } from 'react-native';

export default function DinamicBoldText({ text, style }: { text: string; style?: StyleProp<TextStyle> }) {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return (
        <Text className="font-metropolis text-text-primary" style={style}>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <Text key={index} className="font-metropolis-semi-bold text-text-primary" style={style}>
                            {part.slice(2, -2)}
                        </Text>
                    );
                }

                return part;
            })}
        </Text>
    );
}
