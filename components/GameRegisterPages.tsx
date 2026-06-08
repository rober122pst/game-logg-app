import {
    AddGameEvent,
    AddRating,
    AddUserGame,
    useAddBeatEvent,
    useAddRating,
    useAddUserGame,
} from '@/hooks/userGamesHooks';
import { EventAction, EventState, GameAction, validateEventState } from '@/reducers/gameEventReducer';
import { GameRatingAction, GameRatingState } from '@/reducers/gameRatingReducer';
import { GameStatus, RegisterAction, RegisterState, validateRegisterState } from '@/reducers/gameRegisterReducer';
import {
    CheckCircle2,
    Gamepad,
    Gamepad2,
    Heart,
    HeartOff,
    LucideProps,
    Percent,
    Star,
    Trophy,
} from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { FormInputText, PickerSelect } from './ui/Forms';

import { useTailwindColors } from '@/hooks/useTailwindColors';
import { ratingColor } from '@/services/ratingColor';
import { GameType } from '@/types';
import { Slider } from '@miblanchard/react-native-slider';
import { AxiosError } from 'axios';
import RadioInput from './ui/RadioInput';
import { SectionTitle } from './ui/SectionTitle';

// ─── Types ────────────────────────────────────────────────────────────────────

type StatusOptionItem<T extends string> = {
    type: T;
    icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
    label: string;
};

// ─── Module-level constants ───────────────────────────────────────────────────

const registerStatusOptions: StatusOptionItem<GameStatus>[] = [
    { type: 'I_WILL_PLAY', icon: Gamepad, label: 'Irei Jogar' },
    { type: 'PLAYING', icon: Gamepad2, label: 'Jogando' },
    { type: 'BEAT_EVENT', icon: CheckCircle2, label: 'Já Joguei' },
    { type: 'DROPPED', icon: HeartOff, label: 'Dropei' },
];

const eventStatusOptions: StatusOptionItem<GameAction>[] = [
    { type: 'BEATED', icon: CheckCircle2, label: 'Zerado' },
    { type: 'COMPLETED', icon: Percent, label: '100%' },
    { type: 'PLATINUM', icon: Trophy, label: 'Platinado' },
    { type: 'PERFECT', icon: Star, label: 'Jogo Perfeito' },
];

const formDateConfig = {
    HOUR: { length: 10, placeholder: 'DD/MM/AAAA' },
    DAY: { length: 10, placeholder: 'DD/MM/AAAA' },
    MONTH: { length: 7, placeholder: 'MM/AAAA' },
    YEAR: { length: 4, placeholder: 'AAAA' },
} as const;

const datePrecisionLabels = {
    HOUR: 'Hora',
    DAY: 'Dia',
    MONTH: 'Mês',
    YEAR: 'Ano',
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getApiErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        return error.response?.data?.message ?? 'Erro ao realizar a requisição.';
    }
    return 'Erro inesperado. Tente novamente.';
}

// ─── Shared sub-components ────────────────────────────────────────────────────

type StatusOptionProps = {
    item: StatusOptionItem<string>;
    selected: boolean;
    onPress: () => void;
    activeColor: string;
};

const StatusOption = React.memo(({ item, selected, onPress, activeColor }: StatusOptionProps) => {
    const Icon = item.icon;
    return (
        <RadioInput selected={selected} onPress={onPress}>
            <View className="flex-row items-center gap-2 px-2">
                <Icon size={20} color={selected ? activeColor : '#787878'} />
                <Text className="font-metropolis text-text-primary">{item.label}</Text>
            </View>
        </RadioInput>
    );
});

type SliderRatingProps = {
    label: string;
    value: number;
    category: keyof GameRatingState;
    dispatch: React.Dispatch<GameRatingAction>;
};

const SliderRating = React.memo(({ label, value, category, dispatch }: SliderRatingProps) => {
    const tailwindColors = useTailwindColors();

    return (
        <View>
            <View className="flex-row items-center justify-between gap-2">
                <Text className="font-metropolis-light text-lg text-text-secondary">{label}</Text>
                <Text className="font-metropolis-semi-bold text-lg text-text-primary">{value.toFixed(1)}</Text>
            </View>
            <Slider
                maximumTrackTintColor={tailwindColors['background-surface'].dark}
                minimumTrackTintColor={tailwindColors.raspberry}
                trackStyle={{ height: 8, borderRadius: 99999 }}
                thumbStyle={{ height: 18, width: 18 }}
                thumbTintColor={tailwindColors.raspberry}
                value={value}
                onValueChange={(val) =>
                    dispatch({
                        type: 'SET_SCORE',
                        payload: { category, score: val[0] },
                    })
                }
                minimumValue={0}
                maximumValue={10}
                step={0.5}
            />
        </View>
    );
});

// ─── Page One ─────────────────────────────────────────────────────────────────

interface PageOneProps {
    game: GameType;
    state: RegisterState;
    dispatch: React.Dispatch<RegisterAction>;
    onShowObjectivePicker: () => void;
    onSubmit: (func: () => Promise<boolean>) => void;
}

export function GameRegisterPageOne({ game, state, dispatch, onShowObjectivePicker, onSubmit }: PageOneProps) {
    const { mutateAsync, error } = useAddUserGame();
    const tailwindColors = useTailwindColors();
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        dispatch({ type: 'SET_OBJECTIVE', value: { id: 'BEATED', name: 'Zerar o jogo' } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerSubmit = useCallback(async (): Promise<boolean> => {
        const fieldError = validateRegisterState(state);
        if (fieldError) {
            setValidationError(fieldError);
            return false;
        }
        setValidationError(null);

        try {
            const requestData: AddUserGame = {
                gameId: game.id,
                status: state.status === 'BEAT_EVENT' ? 'BEATED' : state.status,
                price: state.price ? Number(state.price) : undefined,
                objective: state.objective.id,
            };
            const response = await mutateAsync(requestData);
            dispatch({ type: 'SET_USERGAME_ID', value: response.data.id });
            return true;
        } catch {
            return false;
        }
    }, [game.id, mutateAsync, dispatch, state]);

    useEffect(() => {
        onSubmit(handlerSubmit);
    }, [handlerSubmit, onSubmit]);

    const displayError = validationError ?? (error ? getApiErrorMessage(error) : null);

    return (
        <>
            <View>
                <SectionTitle>Status do Jogo</SectionTitle>
                <FlatList
                    className="w-full"
                    data={registerStatusOptions}
                    renderItem={({ item }) => (
                        <StatusOption
                            item={item}
                            selected={state.status === item.type}
                            onPress={() => dispatch({ type: 'SET_STATUS', value: item.type })}
                            activeColor={tailwindColors.raspberry}
                        />
                    )}
                    numColumns={2}
                    keyExtractor={(item) => item.type}
                    columnWrapperClassName="gap-4"
                    contentContainerStyle={{ gap: 16 }}
                    scrollEnabled={false}
                />
            </View>
            <View className="flex-row gap-4">
                <FormInputText
                    label="Preço (R$)"
                    keyboardType="numeric"
                    placeholder="Ex: 00.00"
                    value={state.price}
                    onChangeText={(text) => dispatch({ type: 'SET_PRICE', value: text })}
                />
                <PickerSelect title="Meta de Conclusão" value={state.objective.name} onPress={onShowObjectivePicker} />
            </View>
            <Text className="mt-1.5 font-metropolis-light text-sm text-text-secondary">
                Caso não saiba ou tenha recebido o jogo de graça, deixe o campo PREÇO em branco.
            </Text>
            {displayError && (
                <Text className="mt-2 font-metropolis-light text-sm text-cocoa-brown">{displayError}</Text>
            )}
        </>
    );
}

// ─── Page Two ─────────────────────────────────────────────────────────────────

interface PageTwoProps {
    game: GameType;
    state: EventState;
    dispatch: React.Dispatch<EventAction>;
    userGameId: string | undefined;
    onShowPicker: () => void;
    onSubmit: (func: () => Promise<boolean>) => void;
    withInitialTime?: boolean;
}

export function GameRegisterPageTwo({
    game,
    state,
    dispatch,
    userGameId,
    onShowPicker,
    onSubmit,
    withInitialTime = true,
}: PageTwoProps) {
    const { mutateAsync, error } = useAddBeatEvent();
    const tailwindColors = useTailwindColors();
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        dispatch({ type: 'SET_PLATFORM', value: { id: game.platforms[0].id, name: game.platforms[0].name } });
    }, [dispatch, game.platforms]);

    const handlerSubmit = useCallback(async (): Promise<boolean> => {
        if (!userGameId) return false;

        const fieldError = validateEventState(state);
        if (fieldError) {
            setValidationError(fieldError);
            return false;
        }
        setValidationError(null);

        try {
            const requestData: AddGameEvent = {
                action: state.action,
                precision: state.precision,
                initialPlaytime: state.initialPlaytime ? Number(state.initialPlaytime) : undefined,
                timeToEvent: state.timeToEvent ? Number(state.timeToEvent) : undefined,
                platformId: state.platform.id,
                dateInput: state.date,
                hourInput: state.hour,
                userGameId,
            };
            await mutateAsync(requestData);
            return true;
        } catch {
            return false;
        }
    }, [mutateAsync, state, userGameId]);

    useEffect(() => {
        onSubmit(handlerSubmit);
    }, [handlerSubmit, onSubmit]);

    const displayError = validationError ?? (error ? getApiErrorMessage(error) : null);

    return (
        <>
            <View>
                <SectionTitle>Registro do Evento</SectionTitle>
                <FlatList
                    className="w-full"
                    data={eventStatusOptions}
                    renderItem={({ item }) => (
                        <StatusOption
                            item={item}
                            selected={state.action === item.type}
                            onPress={() => dispatch({ type: 'SET_STATUS', value: item.type })}
                            activeColor={tailwindColors.raspberry}
                        />
                    )}
                    numColumns={2}
                    keyExtractor={(item) => item.type}
                    columnWrapperClassName="gap-4"
                    contentContainerStyle={{ gap: 16 }}
                    scrollEnabled={false}
                />
            </View>
            <PickerSelect title="Plataforma" value={state.platform.name} onPress={onShowPicker} />
            {withInitialTime && (
                <FormInputText
                    label="Total de tempo jogado até agora (h)"
                    placeholder="Ex: 87"
                    keyboardType="numeric"
                    value={state.initialPlaytime}
                    onChangeText={(value) => dispatch({ type: 'SET_TOTAL_PLAYTIME', value })}
                />
            )}
            <Text className="mt-1.5 font-metropolis-light text-sm text-text-secondary">
                Esse valor será registrado como tempo inicial. Você poderá editá-lo depois para colocar o tempo real
                gasto no jogo.
            </Text>
            <View className="mt-4">
                <Text className="mb-2 font-metropolis text-text-secondary">Precisão de Data do Evento</Text>
                <View className="flex-row items-center gap-4">
                    {(['HOUR', 'DAY', 'MONTH', 'YEAR'] as const).map((option) => (
                        <RadioInput
                            key={option}
                            selected={state.precision === option}
                            onPress={() => dispatch({ type: 'SET_PRECISION', value: option })}
                        >
                            <Text className="text-center font-metropolis text-text-primary">
                                {datePrecisionLabels[option]}
                            </Text>
                        </RadioInput>
                    ))}
                </View>
                <View className="mt-1.5 flex-row items-center gap-4">
                    {state.precision === 'HOUR' && (
                        <FormInputText
                            label="Hora"
                            placeholder="HH:MM"
                            value={state.hour}
                            onChangeText={(value) => dispatch({ type: 'SET_HOUR', value })}
                            keyboardType="numeric"
                        />
                    )}
                    <FormInputText
                        label="Data"
                        placeholder={formDateConfig[state.precision].placeholder}
                        maxLength={formDateConfig[state.precision].length}
                        value={state.date}
                        onChangeText={(value) => dispatch({ type: 'SET_DATE', value })}
                        keyboardType="numeric"
                    />
                </View>
                {state.error && (
                    <Text className="mt-1.5 font-metropolis-light text-sm text-red-500">{state.error}</Text>
                )}
            </View>
            <FormInputText
                label="Horas até o evento (Opicional)"
                placeholder="Ex: 87"
                keyboardType="numeric"
                value={state.timeToEvent}
                onChangeText={(value) => dispatch({ type: 'SET_PLAYTIME', value })}
            />
            <Text className="mt-1.5 font-metropolis-light text-sm text-text-secondary">
                Esse tempo serve para contar o tempo total de jogo até o evento. Ele é útil para calcular a média de
                tempo gasto por mês, por exemplo. Caso você não saiba ou não queira preencher, deixe em branco.
            </Text>
            {displayError && <Text className="mt-2 font-metropolis-light text-sm text-red-500">{displayError}</Text>}
        </>
    );
}

// ─── Rating Form ──────────────────────────────────────────────────────────────

interface RatingGameFormProps {
    userGameId: string | undefined;
    state: GameRatingState;
    dispatch: React.Dispatch<GameRatingAction>;
    onSubmit: (func: () => Promise<boolean>) => void;
}

export function RatingGameForm({ state, dispatch, onSubmit, userGameId }: RatingGameFormProps) {
    const { mutateAsync, error } = useAddRating();
    const tailwindColors = useTailwindColors();

    const handlerSubmit = useCallback(async (): Promise<boolean> => {
        if (!userGameId) return false;

        try {
            const requestData: AddRating = {
                ...state,
                scores: {
                    graphics: state.graphics,
                    gameplay: state.gameplay,
                    sound: state.sound,
                    story: state.story,
                },
                userGameId,
            };
            await mutateAsync(requestData);
            return true;
        } catch {
            return false;
        }
    }, [mutateAsync, state, userGameId]);

    useEffect(() => {
        onSubmit(handlerSubmit);
    }, [handlerSubmit, onSubmit]);

    const apiError = error ? getApiErrorMessage(error) : null;

    return (
        <>
            <SectionTitle>Avaliação do jogo</SectionTitle>
            <View className="mb-4">
                <Text className="mb-2 font-metropolis text-text-secondary">Dificuldade</Text>
                <View className="flex-row items-center gap-4">
                    {(['D', 'C', 'B', 'A', 'S', 'SS'] as const).map((diff) => (
                        <RadioInput
                            key={diff}
                            selected={state.difficulty === diff}
                            onPress={() => dispatch({ type: 'SET_DIFFICULTY', value: diff })}
                        >
                            <Text className="text-center font-metropolis text-text-primary">
                                {diff === 'SS' ? 'S+' : diff}
                            </Text>
                        </RadioInput>
                    ))}
                </View>
            </View>
            <View className="mt-4">
                <View className="rounded-lg bg-background-surface-secondary p-4">
                    <View className="flex-row items-start justify-between">
                        <SectionTitle>Notas</SectionTitle>
                        <View className="flex-row items-center gap-4">
                            <Pressable
                                className="h-[25px] w-[25px] items-center justify-center"
                                onPress={() => dispatch({ type: 'SET_FAVORITE' })}
                            >
                                <Heart
                                    color={
                                        state.favorite
                                            ? tailwindColors.raspberry
                                            : tailwindColors['text-secondary'].dark
                                    }
                                    fill={state.favorite ? tailwindColors.raspberry : '#00000000'}
                                    size={20}
                                />
                            </Pressable>
                            <View className="flex-row items-center gap-2 rounded-lg bg-background-surface px-2 py-1">
                                <Text
                                    className="font-metropolis-black"
                                    style={{ color: ratingColor(state.overall + Number(state.favorite)) }}
                                >
                                    {(state.overall + Number(state.favorite ?? 0)).toFixed(1)}
                                </Text>
                                <Star
                                    fill={tailwindColors['cocoa-brown']}
                                    color={tailwindColors['cocoa-brown']}
                                    size={16}
                                />
                            </View>
                        </View>
                    </View>
                    <SliderRating label="Gameplay" value={state.gameplay} category="gameplay" dispatch={dispatch} />
                    <SliderRating label="Gráficos" value={state.graphics} category="graphics" dispatch={dispatch} />
                    <SliderRating label="História" value={state.story} category="story" dispatch={dispatch} />
                    <SliderRating label="Trilha Sonora" value={state.sound} category="sound" dispatch={dispatch} />
                </View>
            </View>
            <FormInputText
                label="Review (Opicional)"
                multiline
                numberOfLines={4}
                placeholder="Escreva o que você achou do jogo!"
                value={state.comment}
                onChangeText={(value) => dispatch({ type: 'SET_COMMENT', value })}
                style={{ minHeight: 100, textAlignVertical: 'top' }}
            />
            {apiError && <Text className="mt-2 font-metropolis-light text-sm text-red-500">{apiError}</Text>}
        </>
    );
}
