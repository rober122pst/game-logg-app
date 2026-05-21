import { CustomButton } from "@/components/ui/CustomButton";
import InputText from "@/components/ui/InputText";
import PickerScreen from "@/components/ui/PickerScreen";
import RadioInput from "@/components/ui/RadioInput";
import { useTailwindColors } from "@/hooks/useTailwindColors";
import { RootStackParamList, StatusEnum } from "@/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { CheckCircle2, Gamepad2, HeartOff, LucideProps, Plus, Star, Trophy } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
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
                <View className="flex-row items-center gap-2">
                    <Icon size={20} color={selected ? tailwindColors.raspberry : '#787878'} />
                    <Text className="text-text-primary font-metropolis">{item.label}</Text>
                </View>
            </RadioInput>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background-surface">
            <ScrollView className="px-12 flex-1">
                <View className="border-b border-background-surface-secondary pb-10 flex-1">
                    <View className="mb-4">
                        <Text className="text-text-primary font-metropolis-semi-bold text-xl tracking-wider mb-4">Status do Jogo</Text>
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
                            <View className="flex-1">
                                <Text className="text-text-secondary font-metropolis mb-2">Data de Aquisição</Text>
                                <Pressable className="flex-1 p-4 bg-background-surface-secondary rounded-lg" onPress={() => setShowPicker(true)}>
                                    <Text className="text-text-primary font-metropolis">
                                        Não sei dizer
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    }
                </View>
                {form.status !== 'PLAYING' && form.status !== 'DROPPED' && form.status !== 'WISHLIST' &&
                    <View className="mt-10">
                        <View className="flex-row gap-4">
                            <View className="flex-1">
                                <Text className="text-text-secondary font-metropolis">Tempo Jogado (min)</Text>
                                <InputText keyboardType="numeric" className="flex-1 p-4 bg-background-surface-secondary rounded-lg" placeholder="Deixe em branco se não souber" />
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
            <View className="w-full border-t border-background-surface-secondary p-8">
                <CustomButton title="Loggar Jogo" />
            </View>
            {showPicker &&
                <PickerScreen items={game.platforms} onSelect={(name) => setPlatform(name)} onDestroy={() => setShowPicker(false)} />
            }
        </SafeAreaView>
    );
}