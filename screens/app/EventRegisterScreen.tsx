import { RootStackParamList, StatusEnum } from "@/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { CheckCircle2, Gamepad2, HeartOff, LucideProps, Plus, Star, Trophy } from "lucide-react-native";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardProvider, KeyboardStickyView } from "react-native-keyboard-controller";

import { CustomButton } from "@/components/ui/CustomButton";
import PickerScreen from "@/components/ui/PickerScreen";
import RadioInput from "@/components/ui/RadioInput";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useTailwindColors } from "@/hooks/useTailwindColors";
import { useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function DatePrecisionInputs({ datePrecision, onChange }: { datePrecision: 'Hora' | 'Dia' | 'Mês' | 'Ano', onChange: (value: string | Date) => void }) {
    const [date, setDate] = useState('');

    const handleChange = (value: string) => {
        if (datePrecision === 'Ano') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setDate(numericValue);
            onChange(numericValue);
        }
    }

    switch (datePrecision) {
        case 'Ano':
            return (
                <View className="mt-4">
                    <Text className="text-text-secondary font-metropolis mb-2">Ano</Text>
                    <TextInput className="flex-1 p-4 bg-background-surface-secondary rounded-lg text-text-primary" placeholderTextColor="#787878" value={date} maxLength={4} keyboardType="numeric" placeholder="XXXX" onChangeText={handleChange} />
                </View>
            );
    }
}

export default function EventRegisterScreen() {
    const [form, setForm] = useState<{
        status: 'PLAYING' | 'BEATED' | 'PLATINUM' | 'COMPLETED' | 'WISHLIST' | 'DROPPED';
        acquiredAt: Date | string;
        playtime: string | number;
        favorite: boolean;
        difficulty: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
        precisionDate: 'Hora' | 'Dia' | 'Mês' | 'Ano';
        date: Date | string;
        rating: { story: number; graphics: number; sounds: number; gameplay: number };
        comment: string;
    }>
        ({
            status: 'PLAYING',
            acquiredAt: '',
            playtime: '',
            favorite: false,
            difficulty: 'D',
            precisionDate: 'Ano',
            date: '',
            rating: { story: 5, graphics: 5, sounds: 5, gameplay: 5 },
            comment: ''
        });

    const route = useRoute<RouteProp<RootStackParamList, 'UserGameRegister'>>();
    const { game } = route.params;
    const [platform, setPlatform] = useState(game.platforms[0].name);
    const [showPicker, setShowPicker] = useState(false);

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

    const tailwindColors = useTailwindColors();

    type statusOptionsType = {
        type: StatusEnum;
        icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
        label: 'Jogando' | 'Zerado' | 'Platinado' | '100%' | 'Quero Jogar' | 'Dropei'
    };

    const statusOptions: statusOptionsType[] = [
        {
            type: 'PLAYING',
            icon: Gamepad2,
            label: 'Jogando',
        },
        {
            type: 'BEATED',
            icon: CheckCircle2,
            label: 'Zerado',
        },
        {
            type: 'PLATINUM',
            icon: Trophy,
            label: 'Platinado',
        },
        {
            type: 'COMPLETED',
            icon: Star,
            label: '100%',
        },
        {
            type: 'WISHLIST',
            icon: Plus,
            label: 'Quero Jogar',
        },
        {
            type: 'DROPPED',
            icon: HeartOff,
            label: 'Dropei',
        }
    ]

    const StatusOption = (item: statusOptionsType) => {
        const Icon = item.icon;
        const selected = form.status === item.type;

        return (
            <RadioInput selected={selected} onPress={() => updateField('status', item.type)}>
                <View className="flex-row items-center gap-2 px-2">
                    <Icon size={20} color={selected ? tailwindColors.raspberry : '#787878'} />
                    <Text className="text-text-primary font-metropolis">{item.label}</Text>
                </View>
            </RadioInput>
        );
    }

    const [footerHeight, setFooterHeight] = useState(0);
    const handleFooterLayout = (e: LayoutChangeEvent) => {
        setFooterHeight(e.nativeEvent.layout.height);
    }

    return (
        <View className="flex-1 bg-background-surface">
            <KeyboardProvider>
                <KeyboardAwareScrollView className="px-12" style={{ paddingBottom: footerHeight + 16 }} enableOnAndroid={true} keyboardShouldPersistTaps="handled">
                    <View className="border-b border-background-surface-secondary pb-10 flex-1">
                        <View className="mb-4">
                            <SectionTitle>
                                Status do Jogo
                            </SectionTitle>
                            <FlatList
                                className="w-full"
                                data={statusOptions}
                                renderItem={({ item }) => <StatusOption {...item} />}
                                numColumns={2}
                                keyExtractor={(item) => item.type}
                                columnWrapperClassName="gap-4"
                                contentContainerStyle={{
                                    gap: 16
                                }}
                                scrollEnabled={false}
                            />
                        </View>
                        {form.status !== 'WISHLIST' &&
                            <View className="flex-row gap-4">
                                <View className="flex-1">
                                    <Text className="text-text-secondary font-metropolis mb-2">Plataforma</Text>
                                    <Pressable className="flex-1 p-4 bg-background-surface-secondary rounded-lg" onPress={() => setShowPicker(true)}>
                                        <Text className="text-text-primary font-metropolis">
                                            {platform}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        }
                    </View>
                    {form.status !== 'PLAYING' && form.status !== 'DROPPED' && form.status !== 'WISHLIST' &&
                        <View className="mt-6">
                            <SectionTitle>
                                Informações do Evento
                            </SectionTitle>
                            <View className="mb-4">
                                <Text className="text-text-secondary font-metropolis mb-2">
                                    Precisão de Data do Evento
                                </Text>
                                <View className="flex-row items-center gap-4">
                                    {['Hora', 'Dia', 'Mês', 'Ano'].map((option) => (
                                        <RadioInput key={option} selected={form.precisionDate === option} onPress={() => updateField('precisionDate', option)}>
                                            <Text className="text-text-primary font-metropolis text-center">{option}</Text>
                                        </RadioInput>
                                    ))}
                                </View>
                                <DatePrecisionInputs datePrecision={form.precisionDate} onChange={(value) => updateField('date', value)} />
                            </View>
                            <View>
                                <Text className="text-text-secondary font-metropolis mb-2">
                                    Dificuldade
                                </Text>
                                <View className="flex-row items-center gap-4">
                                    {['D', 'C', 'B', 'A', 'S', 'SS'].map((diff) => (
                                        <RadioInput key={diff} selected={form.difficulty === diff} onPress={() => updateField('difficulty', diff)}>
                                            <Text className="text-text-primary font-metropolis text-center">{diff === 'SS' ? 'S+' : diff}</Text>
                                        </RadioInput>
                                    ))}
                                </View>
                            </View>
                        </View>
                    }
                </KeyboardAwareScrollView>
                <KeyboardStickyView onLayout={handleFooterLayout} className="w-full border-t border-background-surface-secondary bg-background-surface p-8">
                    <CustomButton title="Loggar Jogo" />
                </KeyboardStickyView>
                {showPicker &&
                    <PickerScreen items={game.platforms} onSelect={(name) => setPlatform(name)} onDestroy={() => setShowPicker(false)} />
                }
            </KeyboardProvider>
        </View>
    );
}