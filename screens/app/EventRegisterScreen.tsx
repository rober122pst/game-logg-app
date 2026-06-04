import { GameRegisterPageOne, GameRegisterPageTwo, RatingGameForm } from '@/components/GameRegisterPages';
import { initializeState as eventInitialState, reducer as eventReducer } from '@/reducers/gameEventReducer';
import { gameRatingReducer, initialGameRatingState } from '@/reducers/gameRatingReducer';
import {
    GameObjective,
    initializeState as registerInitialState,
    reducer as registerReducer,
} from '@/reducers/gameRegisterReducer';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useReducer, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import { KeyboardProvider, KeyboardStickyView } from 'react-native-keyboard-controller';

import { CustomButton } from '@/components/ui/CustomButton';
import PickerScreen from '@/components/ui/PickerScreen';
import { useNavigationCustom } from '@/hooks/useNavigationCustom';
import { RootStackParamList } from '@/types';
import { AxiosResponse } from 'axios';
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
    const navigation = useNavigationCustom<'UserGameRegister'>();

    const [page, setPage] = useState(0);
    // eslint-disable-next-line prettier/prettier
    const submitPageRef = useRef<() => unknown>(() => { });

    const pages = [
        <GameRegisterPageOne
            key="page1"
            game={game}
            state={registerForm}
            dispatch={registerDispatch}
            onShowObjectivePicker={() => setObjectiveShowPicker(true)}
            onSubmit={(func) => (submitPageRef.current = func)}
        />,
        <GameRegisterPageTwo
            key="page2"
            game={game}
            state={eventForm}
            dispatch={eventDispatch}
            userGameId={registerForm.userGameId}
            onShowPicker={() => setShowPicker(true)}
            onSubmit={(func) => (submitPageRef.current = func)}
        />,
        <RatingGameForm
            key="page3"
            userGameId={registerForm.userGameId}
            state={ratingForm}
            dispatch={ratingDispatch}
            onSubmit={(func) => (submitPageRef.current = func)}
        />,
    ];

    const onSubmit = (goBack: boolean) => {
        const res = submitPageRef.current?.();

        if (goBack) {
            navigation.goBack();
            return;
        }

        if ((res as AxiosResponse)?.data?.status === 201) {
            setPage((prev) => prev + 1);
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
                </KeyboardAwareScrollView>
                <KeyboardStickyView
                    onLayout={handleFooterLayout}
                    className="w-full border-t border-background-surface-secondary bg-background-surface p-8"
                >
                    {page === 0 && (
                        <CustomButton
                            title={registerForm.status !== 'BEAT_EVENT' ? 'Loggar Jogo' : 'Informações do Evento'}
                            onPress={() => onSubmit(registerForm.status !== 'BEAT_EVENT')}
                            variant={registerForm.status !== 'BEAT_EVENT' ? 'cta' : 'secondary'}
                        />
                    )}
                    {page === 1 && (
                        <View className="flex-row gap-4">
                            <CustomButton
                                title="Avaliar"
                                onPress={() => onSubmit(false)}
                                variant="secondary"
                                style={{ flex: 1 }}
                            />
                            <CustomButton title="Loggar Jogo" onPress={() => onSubmit(true)} style={{ flex: 5 }} />
                        </View>
                    )}
                    {page === 2 && <CustomButton title="Avaliar" onPress={() => onSubmit(true)} />}
                </KeyboardStickyView>
            </KeyboardProvider>
            {showPicker && (
                <PickerScreen
                    items={game.platforms}
                    onSelect={(id, name) => eventDispatch({ type: 'SET_PLATFORM', value: { id, name } })}
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
