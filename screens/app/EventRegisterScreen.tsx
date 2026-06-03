import { GameRegisterPageOne, GameRegisterPageTwo, RatingGameForm } from '@/components/GameRegisterPages';
import { AddUserGame, useAddUserGame } from '@/hooks/userGamesHooks';
import { initializeState as eventInitialState, reducer as eventReducer } from '@/reducers/gameEventReducer';
import { gameRatingReducer, initialGameRatingState } from '@/reducers/gameRatingReducer';
import {
    GameObjective,
    initializeState as registerInitialState,
    reducer as registerReducer,
} from '@/reducers/gameRegisterReducer';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useReducer, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import { KeyboardProvider, KeyboardStickyView } from 'react-native-keyboard-controller';

import { CustomButton } from '@/components/ui/CustomButton';
import PickerScreen from '@/components/ui/PickerScreen';
import { useNavigationCustom } from '@/hooks/useNavigationCustom';
import { RootStackParamList } from '@/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EventRegisterScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'UserGameRegister'>>();
    const { game } = route.params;
    const [registerForm, registerDispatch] = useReducer(registerReducer, registerInitialState);
    const [eventForm, eventDispatch] = useReducer(eventReducer, eventInitialState);
    const [ratingForm, ratingDispatch] = useReducer(gameRatingReducer, initialGameRatingState);
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

    const { data: addedGame, mutate: addUserGame, isPending, error } = useAddUserGame();
    const navigation = useNavigationCustom<'UserGameRegister'>();

    const [page, setPage] = useState(0);

    const pages = [
        <GameRegisterPageOne
            key="page1"
            game={game}
            state={registerForm}
            dispatch={registerDispatch}
            onShowObjectivePicker={() => setObjectiveShowPicker(true)}
        />,
        <GameRegisterPageTwo
            key="page2"
            state={eventForm}
            dispatch={eventDispatch}
            platformName={eventForm.platform}
            onShowPicker={() => setShowPicker(true)}
            onNext={() => setPage(2)}
        />,
        <RatingGameForm key="page3" state={ratingForm} dispatch={ratingDispatch} />,
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

        const data: AddUserGame = {
            gameId: game.id,
            platformsIds: [registerForm.platform.id],
            status: registerForm.status,
            price: registerForm.price ? Number(registerForm.price) : undefined,
            objective: registerForm.objective.id,
        };

        addUserGame(data, {
            onSuccess: () => {
                console.log(addedGame);
                navigation.navigate('Home');
            },
        });

        if (registerForm.status === 'BEAT') {
        }
    };

    return (
        <View className="flex-1 bg-background-surface">
            <KeyboardProvider>
                <KeyboardAwareScrollView
                    className="mt-6 px-12"
                    extraScrollHeight={footerHeight + 32}
                    extraHeight={footerHeight + 67}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="border-b border-background-surface-secondary pb-10">{pages[page]}</View>
                    <Pressable>
                        <Text className="my-4 text-center font-metropolis-light text-xs text-raspberry underline">
                            Dúvidas com o preenchimento? Aperte aqui!
                        </Text>
                    </Pressable>
                    {error && <Text className="text-center font-metropolis text-cocoa-brown">{error.message}</Text>}
                </KeyboardAwareScrollView>
                <KeyboardStickyView
                    onLayout={handleFooterLayout}
                    className="w-full border-t border-background-surface-secondary bg-background-surface p-8"
                >
                    <CustomButton
                        onPress={onSubmit}
                        disabled={isPending}
                        title={registerForm.status === 'BEAT' ? 'Registrar Evento' : 'Loggar Jogo'}
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
