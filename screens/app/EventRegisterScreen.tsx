import { initializeState as eventInitialState, reducer as eventReducer } from '@/reducers/gameEventReducer';
import {
    GameObjective,
    initializeState as registerInitialState,
    reducer as registerReducer,
} from '@/reducers/gameRegisterReducer';
import { RootStackParamList } from '@/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useReducer, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import { KeyboardProvider, KeyboardStickyView } from 'react-native-keyboard-controller';

import { GameRegisterPageOne, GameRegisterPageTwo, RatingGameForm } from '@/components/GameRegisterPages';
import { CustomButton } from '@/components/ui/CustomButton';
import PickerScreen from '@/components/ui/PickerScreen';
import { useNavigationCustom } from '@/hooks/useNavigationCustom';
import { AddUserGame, useAddUserGame } from '@/hooks/userGamesHooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EventRegisterScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'UserGameRegister'>>();
    const { game } = route.params;
    const [registerForm, registerDispatch] = useReducer(registerReducer, registerInitialState);
    const [eventForm, eventDispatch] = useReducer(eventReducer, eventInitialState);
    const [showPicker, setShowPicker] = useState(false);
    const [showObjectivePicker, setObjectiveShowPicker] = useState(false);

    const [footerHeight, setFooterHeight] = useState(0);
    const handleFooterLayout = (e: LayoutChangeEvent) => {
        setFooterHeight(e.nativeEvent.layout.height);
    };

    type ObjectivesOptions = {
        id: GameObjective;
        name: string;
    }[];

    const objectives: ObjectivesOptions = [
        {
            id: 'BEATED',
            name: 'Zerar o jogo',
        },
        {
            id: 'COMPLETED',
            name: 'Fazer 100% do mundo',
        },
        {
            id: 'PLATINUM',
            name: 'Platinar o jogo',
        },
        {
            id: 'PERFECT',
            name: 'Fazer 100% das conquistas (DLCs inclusas)',
        },
    ];

    const { data: addedGame, mutate, isPending, error } = useAddUserGame();
    const navigation = useNavigationCustom<'UserGameRegister'>();

    const [page, setPage] = useState(0);

    const pages = [
        <GameRegisterPageOne
            key="page1"
            game={game}
            state={registerForm}
            dispatch={registerDispatch}
            onShowPicker={() => setShowPicker(true)}
            onShowObjectivePicker={() => setObjectiveShowPicker(true)}
        />,
        <GameRegisterPageTwo key="page2" state={eventForm} dispatch={eventDispatch} onNext={() => setPage(2)} />,
        <RatingGameForm key="page3" state={registerForm} dispatch={registerDispatch} />,
    ];

    const onSubmit = () => {
        // const data: AddUserGame = {
        //     gameId: game.id,
        //     platformsIds: [registerForm.platform.id],

        //     status: registerForm.status,
        //     favorite: registerForm.favorite,
        //     difficulty: registerForm.difficulty,
        //     beatEvents: [],
        // };

        // if (registerForm.status !== 'PLAYING' && registerForm.status !== 'DROPPED') {
        //     data.beatEvents.push({
        //         action: registerForm.status, // No caso desse formulário, pode vim do registro mesmo já que é o primeiro,
        //         platformId: registerForm.platform.id, // No caso desse formulário, pode vim do registro mesmo já que é o primeiro.
        //         precision: eventForm.precision,
        //         dateInput: eventForm.date,
        //         hourInput: eventForm.hour,
        //         timeToEvent: parseInt(eventForm.timeToEvent),
        //     });
        // }

        // console.log(data.beatEvents);

        if (registerForm.status !== 'BEAT') {
            const data: AddUserGame = {
                gameId: game.id,
                platformsIds: [registerForm.platform.id],
                status: registerForm.status,
                price: registerForm.price ? Number(registerForm.price) : undefined,
                objective: registerForm.objective.id,
            };

            mutate(data, {
                onSuccess: () => {
                    console.log(addedGame);
                    navigation.navigate('Home');
                },
            });
        } else {
            switch (page) {
                case 0:
                    setPage(1);
                    break;
                default:
                    break;
            }
        }
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
                    <View className="border-b border-background-surface-secondary pb-10">{pages[page]}</View>
                    <Pressable>
                        <Text className="mt-4 text-center font-metropolis-light text-xs text-raspberry underline">
                            Dúvidas com o preenchimento? Aperte aqui!
                        </Text>
                    </Pressable>
                    {/* {registerForm.status !== 'PLAYING' && registerForm.status !== 'DROPPED' && (
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
                    )} */}
                    {error && <Text className="text-center font-metropolis text-cocoa-brown">{error.message}</Text>}
                </KeyboardAwareScrollView>
                <KeyboardStickyView
                    onLayout={handleFooterLayout}
                    className="w-full border-t border-background-surface-secondary bg-background-surface p-8"
                >
                    <CustomButton
                        onPress={onSubmit}
                        disabled={isPending}
                        title={registerForm.status === 'BEAT' ? 'Registrar Evento ➡️' : 'Loggar Jogo'}
                    />
                </KeyboardStickyView>
            </KeyboardProvider>
            {showPicker && (
                <PickerScreen
                    items={game.platforms}
                    onSelect={(id, name) => registerDispatch({ type: 'SET_PLATFORM', value: { id, name } })}
                    onDestroy={() => setShowPicker(false)}
                />
            )}
            {showObjectivePicker && (
                <PickerScreen
                    items={objectives}
                    onSelect={(id, name) =>
                        registerDispatch({
                            type: 'SET_OBJECTIVE',
                            value: { id: id as GameObjective, name },
                        })
                    }
                    onDestroy={() => setObjectiveShowPicker(false)}
                />
            )}
        </View>
    );
}
