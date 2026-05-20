import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventRegisterScreen() {
    const [form, setForm] = useState<{
        status: 'PLAYING' | 'BEATED' | 'PLATINUM' | 'COMPLETED' | 'WISHLIST' | 'DROPPED';
        acquiredAt: Date | string;
        playtime: string | number;
        favorite: boolean;
        difficulty: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
        rating: { story: number; graphics: number; sounds: number; gameplay: number };
        comment: string;
    }>
        ({
            status: 'PLAYING',
            acquiredAt: '',
            playtime: '',
            favorite: false,
            difficulty: 'D',
            rating: { story: 5, graphics: 5, sounds: 5, gameplay: 5 },
            comment: ''
        })

    const updateField = (field: keyof typeof form, value: number | string | Date | boolean) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const updateRating = (key: keyof typeof form.rating, value: number | string) => {
        setForm(prev => ({
            ...prev,
            rating: {
                ...prev.rating,
                [key]: Number(value)
            }
        }))
    }

    return (
        <SafeAreaView className="flex-1 bg-background-surface">

        </SafeAreaView>
    );
}