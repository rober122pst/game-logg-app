import { useTailwindColors } from '@/hooks/useTailwindColors';
import { EventAction, EventState, GameAction } from '@/reducers/gameEventReducer';
import { GameStatus, RegisterAction, RegisterState } from '@/reducers/gameRegisterReducer';
import { GameType } from '@/types';
import Slider from '@react-native-community/slider';
import { CheckCircle2, Gamepad, Gamepad2, HeartOff, LucideProps, Percent, Star, Trophy } from 'lucide-react-native';
import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { CustomButton } from './ui/CustomButton';
import { FormInputText, PickerSelect } from './ui/Forms';
import RadioInput from './ui/RadioInput';
import { SectionTitle } from './ui/SectionTitle';

interface PageOneProps {
    game: GameType;
    state: RegisterState;
    dispatch: React.Dispatch<RegisterAction>;
    onShowPicker: () => void;
    onShowObjectivePicker: () => void;
}

export function GameRegisterPageOne({ game, state, dispatch, onShowPicker, onShowObjectivePicker }: PageOneProps) {
    type statusOptionsType = {
        type: GameStatus;
        icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
        label: 'Jogando' | 'Irei Jogar' | 'Dropei' | 'Já Joguei';
    };

    const statusOptions: statusOptionsType[] = [
        {
            type: 'I_WILL_PLAY',
            icon: Gamepad,
            label: 'Irei Jogar',
        },
        {
            type: 'PLAYING',
            icon: Gamepad2,
            label: 'Jogando',
        },
        {
            type: 'BEAT',
            icon: CheckCircle2,
            label: 'Já Joguei',
        },
        {
            type: 'DROPPED',
            icon: HeartOff,
            label: 'Dropei',
        },
    ];

    const tailwindColors = useTailwindColors();

    useEffect(() => {
        dispatch({ type: 'SET_PLATFORM', value: { id: game.platforms[0].id, name: game.platforms[0].name } });
        dispatch({ type: 'SET_OBJECTIVE', value: { id: 'BEATED', name: 'Zerar o jogo' } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const StatusOption = (item: statusOptionsType) => {
        const Icon = item.icon;
        const selected = state.status === item.type;

        return (
            <RadioInput selected={selected} onPress={() => dispatch({ type: 'SET_STATUS', value: item.type })}>
                <View className="flex-row items-center gap-2 px-2">
                    <Icon size={20} color={selected ? tailwindColors.raspberry : '#787878'} />
                    <Text className="font-metropolis text-text-primary">{item.label}</Text>
                </View>
            </RadioInput>
        );
    };

    return (
        <>
            <View>
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
            <PickerSelect title="Plataforma" value={state.platform.name} onPress={onShowPicker} />
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
        </>
    );
}

interface PageTwoProps {
    state: EventState;
    dispatch: React.Dispatch<EventAction>;
    onNext: () => void;
}

export function GameRegisterPageTwo({ state, dispatch, onNext }: PageTwoProps) {
    type statusOptionsType = {
        type: GameAction;
        icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
        label: string;
    };

    const tailwindColors = useTailwindColors();

    const statusOptions: statusOptionsType[] = [
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
    ];

    const StatusOption = (item: statusOptionsType) => {
        const Icon = item.icon;
        const selected = state.action === item.type;

        return (
            <RadioInput selected={selected} onPress={() => dispatch({ type: 'SET_STATUS', value: item.type })}>
                <View className="flex-row items-center gap-2 px-2">
                    <Icon size={20} color={selected ? tailwindColors.raspberry : '#787878'} />
                    <Text className="font-metropolis text-text-primary">{item.label}</Text>
                </View>
            </RadioInput>
        );
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

    return (
        <>
            <View>
                <SectionTitle>Registro do Evento</SectionTitle>
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
            <FormInputText label="Total de tempo jogado até agora (h)" placeholder="Ex: 87" keyboardType="numeric" />
            <Text className="mt-1.5 font-metropolis-light text-sm text-text-secondary">
                Esse valor será registrado como tempo inicial. Você poderá editá-lo depois para colocar o tempo real
                gasto no jogo.
            </Text>
            <View className="mt-4">
                <Text className="mb-2 font-metropolis text-text-secondary">Precisão de Data do Evento</Text>
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
                                selected={state.precision === option}
                                onPress={() => dispatch({ type: 'SET_PRECISION', value: option })}
                            >
                                <Text className="text-center font-metropolis text-text-primary">
                                    {labelOption[option]}
                                </Text>
                            </RadioInput>
                        );
                    })}
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
                        placeholder={formDate[state.precision].placeholder}
                        maxLength={formDate[state.precision].length}
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
            <View className="mt-4">
                <CustomButton title="Quero Avaliar" variant="secondary" onPress={onNext} />
            </View>
        </>
    );
}

interface RatingGameFormProps {
    state: RegisterState;
    dispatch: React.Dispatch<RegisterAction>;
}

export function RatingGameForm({ state, dispatch }: RatingGameFormProps) {
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
                <SectionTitle>Notas</SectionTitle>
                <View className="rounded-lg bg-background-surface-secondary p-4">
                    <View>
                        <Text className="font-metropolis text-text-primary">Gameplay</Text>
                        <Slider style={{ width: '100%', height: 40 }} minimumValue={0} maximumValue={10} step={1} />
                    </View>
                </View>
            </View>
        </>
    );
}
