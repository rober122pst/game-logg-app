import { initializeState as eventInitialState, reducer as eventReducer } from '@/reducers/gameEventReducer';
import {
    GameStatus,
    initializeState as registerInitialState,
    reducer as registerReducer,
} from '@/reducers/gameRegisterReducer';
import { RootStackParamList } from '@/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CheckCircle2, Gamepad2, HeartOff, LucideProps, Percent, Star, Trophy } from 'lucide-react-native';
import { useEffect, useReducer, useState } from 'react';
import { FlatList, LayoutChangeEvent, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardProvider, KeyboardStickyView } from 'react-native-keyboard-controller';

import { CustomButton } from '@/components/ui/CustomButton';
import PickerScreen from '@/components/ui/PickerScreen';
import RadioInput from '@/components/ui/RadioInput';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { AddUserGame, useAddUserGame } from '@/hooks/useGamesHooks';
import { useNavigationCustom } from '@/hooks/useNavigationCustom';
import { useTailwindColors } from '@/hooks/useTailwindColors';
import { Heart } from 'lucide-react-native/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EventRegisterScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'UserGameRegister'>>();
    const { game } = route.params;
    const [registerForm, registerDispatch] = useReducer(registerReducer, registerInitialState);
    const [eventForm, eventDispatch] = useReducer(eventReducer, eventInitialState);
    const [showPicker, setShowPicker] = useState(false);

    const tailwindColors = useTailwindColors();

    type statusOptionsType = {
        type: GameStatus;
        icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
        label: 'Jogando' | 'Zerado' | 'Platinado' | '100%' | 'Jogo Perfeito' | 'Dropei';
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
            type: 'COMPLETED',
            icon: Percent,
            label: '100%',
        },
        {
            type: 'PLATINUM',
            icon: Trophy,
            label: 'Platinado',
        },
        {
            type: 'PERFECT',
            icon: Star,
            label: 'Jogo Perfeito',
        },
        {
            type: 'DROPPED',
            icon: HeartOff,
            label: 'Dropei',
        },
    ];

    useEffect(() => {
        registerDispatch({ type: 'SET_PLATFORM', value: { id: game.platforms[0].id, name: game.platforms[0].name } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const StatusOption = (item: statusOptionsType) => {
        const Icon = item.icon;
        const selected = registerForm.status === item.type;

        return (
            <RadioInput selected={selected} onPress={() => registerDispatch({ type: 'SET_STATUS', value: item.type })}>
                <View className="flex-row items-center gap-2 px-2">
                    <Icon size={20} color={selected ? tailwindColors.raspberry : '#787878'} />
                    <Text className="font-metropolis text-text-primary">{item.label}</Text>
                </View>
            </RadioInput>
        );
    };

    const [footerHeight, setFooterHeight] = useState(0);
    const handleFooterLayout = (e: LayoutChangeEvent) => {
        setFooterHeight(e.nativeEvent.layout.height);
    };

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
    };

    const { data: addedGame, mutate, isPending, error } = useAddUserGame();
    const navigation = useNavigationCustom<'UserGameRegister'>();

    const onSubmit = () => {
        const data: AddUserGame = {
            gameId: game.id,
            platformsIds: [registerForm.platform.id],

            status: registerForm.status,
            favorite: registerForm.favorite,
            difficulty: registerForm.difficulty,
            beatEvents: [],
        };

        if (registerForm.status !== 'PLAYING' && registerForm.status !== 'DROPPED') {
            data.beatEvents.push({
                action: registerForm.status, // No caso desse formulário, pode vim do registro mesmo já que é o primeiro,
                platformId: registerForm.platform.id, // No caso desse formulário, pode vim do registro mesmo já que é o primeiro.
                precision: eventForm.precision,
                dateInput: eventForm.date,
                hourInput: eventForm.hour,
                timeToEvent: parseInt(eventForm.timeToEvent),
            });
        }

        console.log(data.beatEvents);

        mutate(data, {
            onSuccess: () => {
                console.log(addedGame);
                navigation.navigate('Home');
            },
        });
    };

    return (
        <View className="flex-1 bg-background-surface">
            <KeyboardProvider>
                <KeyboardAwareScrollView
                    className="my-6 px-12"
                    extraScrollHeight={footerHeight + 32}
                    extraHeight={footerHeight + 67}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="border-b border-background-surface-secondary pb-10">
                        <View className="mb-4">
                            <SectionTitle>Status do Jogo</SectionTitle>
                            <FlatList
                                className="w-full"
                                data={statusOptions}
                                renderItem={({ item }) => <StatusOption {...item} />}
                                numColumns={2}
                                keyExtractor={(item) => item.type}
                                columnWrapperClassName="gap-4"
                                contentContainerStyle={{
                                    gap: 16,
                                }}
                                scrollEnabled={false}
                            />
                        </View>

                        <View className="flex-row gap-4">
                            <View className="flex-1">
                                <Text className="mb-2 font-metropolis text-text-secondary">Plataforma</Text>
                                <Pressable
                                    className="rounded-lg bg-background-surface-secondary p-4"
                                    onPress={() => setShowPicker(true)}
                                >
                                    <Text className="font-metropolis text-text-primary">
                                        {registerForm.platform.name}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    {registerForm.status !== 'PLAYING' && registerForm.status !== 'DROPPED' && (
                        <View className="my-6">
                            <SectionTitle>Informações do Evento</SectionTitle>
                            <View className="mb-4">
                                <Text className="mb-2 font-metropolis text-text-secondary">
                                    Precisão de Data do Evento
                                </Text>
                                <View className="flex-row items-center gap-4">
                                    {(['HOUR', 'DAY', 'MONTH', 'YEAR'] as const).map((option) => {
                                        const labelOption = {
                                            HOUR: 'Hora',
                                            DAY: 'Dia',
                                            MONTH: 'Mês',
                                            YEAR: 'Ano',
                                        };

                                        return (
                                            <RadioInput
                                                key={option}
                                                selected={eventForm.precision === option}
                                                onPress={() => eventDispatch({ type: 'SET_PRECISION', value: option })}
                                            >
                                                <Text className="text-center font-metropolis text-text-primary">
                                                    {labelOption[option]}
                                                </Text>
                                            </RadioInput>
                                        );
                                    })}
                                </View>
                                <View className="w-full flex-row gap-5">
                                    {eventForm.precision === 'HOUR' && (
                                        <View className="mt-4 flex-1">
                                            <Text className="mb-2 font-metropolis text-text-secondary">Hora</Text>
                                            <TextInput
                                                className="rounded-lg bg-background-surface-secondary p-4 text-text-primary"
                                                placeholderTextColor={tailwindColors['text-secondary'].dark}
                                                value={eventForm.hour}
                                                maxLength={5}
                                                keyboardType="numeric"
                                                placeholder="HH:mm"
                                                onChangeText={(value) => eventDispatch({ type: 'SET_HOUR', value })}
                                            />
                                        </View>
                                    )}
                                    <View className="mt-4 flex-1">
                                        <Text className="mb-2 font-metropolis text-text-secondary">Data</Text>
                                        <TextInput
                                            className="rounded-lg bg-background-surface-secondary p-4 text-text-primary"
                                            placeholderTextColor={tailwindColors['text-secondary'].dark}
                                            value={eventForm.date}
                                            maxLength={formDate[eventForm.precision].length}
                                            keyboardType="numeric"
                                            placeholder={formDate[eventForm.precision].placeholder}
                                            onChangeText={(value) => eventDispatch({ type: 'SET_DATE', value })}
                                        />
                                    </View>
                                </View>
                                {eventForm.error && (
                                    <Text className="mt-2 font-metropolis text-red-500">{eventForm.error}</Text>
                                )}
                            </View>
                            <View className="mb-2">
                                <Text className="mb-2 font-metropolis text-text-secondary">Dificuldade</Text>
                                <View className="flex-row items-center gap-4">
                                    {(['D', 'C', 'B', 'A', 'S', 'SS'] as const).map((diff) => (
                                        <RadioInput
                                            key={diff}
                                            selected={registerForm.difficulty === diff}
                                            onPress={() => registerDispatch({ type: 'SET_DIFFICULTY', value: diff })}
                                        >
                                            <Text className="text-center font-metropolis text-text-primary">
                                                {diff === 'SS' ? 'S+' : diff}
                                            </Text>
                                        </RadioInput>
                                    ))}
                                </View>
                            </View>
                            <View className="flex-row gap-4">
                                <View className="mt-2 flex-1">
                                    <Text className="mb-2 font-metropolis text-text-secondary">Tempo Jogado (h)</Text>
                                    <TextInput
                                        className="rounded-lg bg-background-surface-secondary p-4 text-text-primary"
                                        placeholderTextColor={tailwindColors['text-secondary'].dark}
                                        value={eventForm.timeToEvent}
                                        maxLength={5}
                                        keyboardType="numeric"
                                        placeholder="Ex: 45"
                                        onChangeText={(value) => eventDispatch({ type: 'SET_PLAYTIME', value })}
                                    />
                                </View>
                                <View className="mt-2 flex-1">
                                    <View className="mb-7" />
                                    <RadioInput
                                        onPress={() => registerDispatch({ type: 'SET_FAVORITE' })}
                                        selected={registerForm.favorite}
                                    >
                                        <View className="flex-row gap-2 px-2">
                                            <Heart
                                                color={
                                                    registerForm.favorite
                                                        ? tailwindColors.raspberry
                                                        : tailwindColors['text-secondary'].dark
                                                }
                                                fill={registerForm.favorite ? tailwindColors.raspberry : '#ffffff00'}
                                                size={19}
                                            />
                                            <Text
                                                className={
                                                    registerForm.favorite
                                                        ? 'font-metropolis-semi-bold text-raspberry'
                                                        : 'font-metropolis text-text-secondary'
                                                }
                                            >
                                                Favorito
                                            </Text>
                                        </View>
                                    </RadioInput>
                                </View>
                            </View>
                        </View>
                    )}
                    {error && <Text className="text-center font-metropolis text-cocoa-brown">{error.message}</Text>}
                </KeyboardAwareScrollView>
                <KeyboardStickyView
                    onLayout={handleFooterLayout}
                    className="w-full border-t border-background-surface-secondary bg-background-surface p-8"
                >
                    <CustomButton onPress={onSubmit} disabled={isPending} title="Loggar Jogo" />
                </KeyboardStickyView>
                {showPicker && (
                    <PickerScreen
                        items={game.platforms}
                        onSelect={(id, name) => registerDispatch({ type: 'SET_PLATFORM', value: { id, name } })}
                        onDestroy={() => setShowPicker(false)}
                    />
                )}
            </KeyboardProvider>
        </View>
    );
}
