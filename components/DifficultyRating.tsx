import { useTailwindColors } from '@/hooks/useTailwindColors';
import { Zap } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface DifficultyRatingProps {
    difficulty?: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
}

export default function DifficultyRating({ difficulty }: DifficultyRatingProps) {
    const tailwindColors = useTailwindColors();

    if (!difficulty) return null;

    const difficultyConfig = {
        D: {
            label: 'Muito Fácil',
            color: tailwindColors.mint,
            bgColor: tailwindColors.mint + '20',
        },
        C: {
            label: 'Fácil',
            color: '#84cc16',
            bgColor: '#84cc1620',
        },
        B: {
            label: 'Normal',
            color: tailwindColors.raspberry,
            bgColor: tailwindColors.raspberry + '20',
        },
        A: {
            label: 'Difícil',
            color: '#f97316',
            bgColor: '#f9731620',
        },
        S: {
            label: 'Muito Difícil',
            color: '#dc2626',
            bgColor: '#dc262620',
        },
        SS: {
            label: 'Impossível',
            color: '#7c3aed',
            bgColor: '#7c3aed20',
        },
    };

    const config = difficultyConfig[difficulty];

    return (
        <View
            className="flex-row items-center gap-3 rounded-lg border border-background-surface-secondary p-4"
            style={{ backgroundColor: config.bgColor }}
        >
            <Zap size={24} color={config.color} />
            <View className="flex-1">
                <Text className="font-metropolis-light text-xs text-text-secondary">DIFICULDADE</Text>
                <Text className="font-metropolis-bold text-lg" style={{ color: config.color }}>
                    {difficulty} - {config.label}
                </Text>
            </View>
        </View>
    );
}
