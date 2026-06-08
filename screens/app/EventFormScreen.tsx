import { GameRegisterPageTwo, RatingGameForm } from '@/components/GameRegisterPages';
import { initializeState as eventInitialState, reducer as eventReducer } from '@/reducers/gameEventReducer';
import { gameRatingReducer, initialGameRatingState } from '@/reducers/gameRatingReducer';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useReducer, useRef, useState } from 'react';
import { ActivityIndicator, LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import { KeyboardProvider, KeyboardStickyView } from 'react-native-keyboard-controller';

import { CustomButton } from '@/components/ui/CustomButton';
import PickerScreen from '@/components/ui/PickerScreen';
import { useNavigationCustom } from '@/hooks/useNavigationCustom';
import { RootStackParamList } from '@/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// ─── Constants ────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

export default function EventFormScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'BeatEventRegister'>>();
    const { userGameId, game } = route.params;

    const [eventForm, eventDispatch] = useReducer(eventReducer, eventInitialState);
    const [ratingForm, ratingDispatch] = useReducer(gameRatingReducer, initialGameRatingState);

    const [page, setPage] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [footerHeight, setFooterHeight] = useState(0);

    const submitPageRef = useRef<() => Promise<boolean>>(() => Promise.resolve(false));

    const navigation = useNavigationCustom<'BeatEventRegister'>();

    const handleFooterLayout = useCallback((e: LayoutChangeEvent) => {
        setFooterHeight(e.nativeEvent.layout.height);
    }, []);

    const onSubmit = useCallback(
        async (goBack: boolean) => {
            setIsSubmitting(true);
            try {
                const success = await submitPageRef.current();
                if (!success) return;
                if (goBack) {
                    navigation.navigate('UserGameStats', { userGameId, gameTitle: game.title });
                } else {
                    setPage((prev) => prev + 1);
                }
            } finally {
                setIsSubmitting(false);
            }
        },
        [navigation, game.title, userGameId]
    );

    const pages = [
        <GameRegisterPageTwo
            key="page2"
            game={game}
            state={eventForm}
            dispatch={eventDispatch}
            userGameId={userGameId}
            onShowPicker={() => setShowPicker(true)}
            onSubmit={(func) => (submitPageRef.current = func)}
            withInitialTime={false}
        />,
        <RatingGameForm
            key="page3"
            userGameId={userGameId}
            state={ratingForm}
            dispatch={ratingDispatch}
            onSubmit={(func) => (submitPageRef.current = func)}
        />,
    ];

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
                    {isSubmitting ? (
                        <ActivityIndicator />
                    ) : page === 0 ? (
                        <View className="flex-row gap-4">
                            <CustomButton
                                title="Avaliar"
                                onPress={() => onSubmit(false)}
                                variant="secondary"
                                style={{ flex: 1 }}
                            />
                            <CustomButton title="Loggar Jogo" onPress={() => onSubmit(true)} style={{ flex: 5 }} />
                        </View>
                    ) : (
                        page === 1 && <CustomButton title="Avaliar" onPress={() => onSubmit(true)} />
                    )}
                </KeyboardStickyView>
            </KeyboardProvider>
            {showPicker && (
                <PickerScreen
                    items={game.platforms}
                    onSelect={(id, name) => eventDispatch({ type: 'SET_PLATFORM', value: { id, name } })}
                    onDestroy={() => setShowPicker(false)}
                />
            )}
        </View>
    );
}
