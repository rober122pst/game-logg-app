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
import { initializeState as eventInitialState, reducer as eventReducer } from "@/reducers/gameEventReducer";
import { initializeState as registerInitialState, reducer as registerReducer } from "@/reducers/gameRegisterReducer";
import { useEffect, useReducer, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EventRegisterScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'UserGameRegister'>>();
    const { game } = route.params;
    const [registerForm, registerDispatch] = useReducer(registerReducer, registerInitialState);
    const [eventForm, eventDispatch] = useReducer(eventReducer, eventInitialState);
    const [showPicker, setShowPicker] = useState(false);

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

    useEffect(() => {
        registerDispatch({ type: 'SET_PLATFORM', value: game.platforms[0].name });
    }, []);

    const StatusOption = (item: statusOptionsType) => {
        const Icon = item.icon;
        const selected = registerForm.status === item.type;

        return (
            <RadioInput selected={selected} onPress={() => registerDispatch({ type: 'SET_STATUS', value: item.type })}>
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

    const formDate = {
        HOUR: {
            length: 10,
            placeholder: 'DD/MM/AAAA',
        },
        DAY: {
            length: 10,
            placeholder: 'DD/MM/AAAA',
        },
        MONTH: {
            length: 7,
            placeholder: 'MM/AAAA',
        },
        YEAR: {
            length: 4,
            placeholder: 'AAAA',
        },
    }

    return (
        <View className="flex-1 bg-background-surface">
            <KeyboardProvider>
                <KeyboardAwareScrollView className="px-12 mt-6" extraScrollHeight={footerHeight + 67} enableOnAndroid={true} keyboardShouldPersistTaps="handled">
                    <View className="border-b border-background-surface-secondary pb-10">
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
                        {registerForm.status !== 'WISHLIST' &&
                            <View className="flex-row gap-4">
                                <View className="flex-1">
                                    <Text className="text-text-secondary font-metropolis mb-2">Plataforma</Text>
                                    <Pressable className="p-4 bg-background-surface-secondary rounded-lg" onPress={() => setShowPicker(true)}>
                                        <Text className="text-text-primary font-metropolis">
                                            {registerForm.platform}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        }
                    </View>
                    {registerForm.status !== 'PLAYING' && registerForm.status !== 'DROPPED' && registerForm.status !== 'WISHLIST' &&
                        <View className="mt-6">
                            <SectionTitle>
                                Informações do Evento
                            </SectionTitle>
                            <View className="mb-4">
                                <Text className="text-text-secondary font-metropolis mb-2">
                                    Precisão de Data do Evento
                                </Text>
                                <View className="flex-row items-center gap-4">
                                    {(['HOUR', 'DAY', 'MONTH', 'YEAR'] as const).map((option) => {
                                        const labelOption = {
                                            HOUR: 'Hora',
                                            DAY: 'Dia',
                                            MONTH: 'Mês',
                                            YEAR: 'Ano',
                                        }

                                        return (
                                            <RadioInput key={option} selected={eventForm.precision === option} onPress={() => eventDispatch({ type: 'SET_PRECISION', value: option })}>
                                                <Text className="text-text-primary font-metropolis text-center">{labelOption[option]}</Text>
                                            </RadioInput>
                                        )
                                    })}
                                </View>
                                <View className="mt-4">
                                    <Text className="text-text-secondary font-metropolis mb-2">Data</Text>
                                    <TextInput className="p-4 bg-background-surface-secondary rounded-lg text-text-primary" placeholderTextColor="#787878" value={eventForm.date} maxLength={formDate[eventForm.precision].length} keyboardType="numeric" placeholder={formDate[eventForm.precision].placeholder} onChangeText={(value) => eventDispatch({ type: 'SET_DATE', value })} />
                                </View>
                                {eventForm.error &&
                                    <Text className="font-metropolis mt-2 text-red-500">{eventForm.error}</Text>
                                }
                            </View>
                            <View>
                                <Text className="text-text-secondary font-metropolis mb-2">
                                    Dificuldade
                                </Text>
                                <View className="flex-row items-center gap-4">
                                    {(['D', 'C', 'B', 'A', 'S', 'SS'] as const).map((diff) => (
                                        <RadioInput key={diff} selected={eventForm.difficulty === diff} onPress={() => eventDispatch({ type: 'SET_DIFFICULTY', value: diff })}>
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
                    <PickerScreen items={game.platforms} onSelect={(name) => registerDispatch({ type: 'SET_PLATFORM', value: name })} onDestroy={() => setShowPicker(false)} />
                }
            </KeyboardProvider>
        </View>
    );
}