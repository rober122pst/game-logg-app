import { GameAction } from './gameEventReducer';

export type GameDifficulty = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';

export type GameStatus = 'PLAYING' | 'I_WILL_PLAY' | 'BEAT_EVENT' | 'BEATED' | 'DROPPED';

export type GameObjective = GameAction;

export interface RegisterState {
    userGameId?: string;
    status: GameStatus;
    price: string;
    objective: {
        id: GameObjective;
        name: string;
    };
}

// prettier-ignore
export type RegisterAction =
    | {
        type: 'SET_STATUS';
        value: GameStatus;
    }
    | {
        type: 'SET_PRICE';
        value: string;
    }
    | {
        type: 'SET_USERGAME_ID';
        value: string | undefined;
    }
    | {
        type: 'SET_OBJECTIVE';
        value: { id: GameObjective, name: string };
    }

export const initializeState: RegisterState = {
    status: 'I_WILL_PLAY',
    price: '',
    objective: {
        id: 'BEATED',
        name: '',
    },
};

function formatPrice(value: string): string {
    let cleaned = value.replace(/[^0-9.,]/g, '');

    // troca vírgula por ponto
    cleaned = cleaned.replace(',', '.');

    // impede mais de um ponto
    const parts = cleaned.split('.');
    if (parts.length > 2) {
        cleaned = parts[0] + '.' + parts.slice(1).join('');
    }

    // limita a 2 casas decimais
    const [integer = '', decimal = ''] = cleaned.split('.');

    if (cleaned.includes('.')) {
        return `${integer}.${decimal.slice(0, 2)}`;
    }

    return integer;
}

export function validateRegisterState(state: RegisterState): string | null {
    if (state.price) {
        const parsed = Number(state.price);
        if (isNaN(parsed) || parsed < 0) {
            return 'Preço inválido.';
        }
    }
    return null;
}

export function reducer(state: RegisterState, action: RegisterAction): RegisterState {
    switch (action.type) {
        case 'SET_STATUS':
            return {
                ...state,
                status: action.value,
            };
        case 'SET_PRICE': {
            const formatedValue = formatPrice(action.value);

            return {
                ...state,
                price: formatedValue,
            };
        }
        case 'SET_OBJECTIVE':
            return {
                ...state,
                objective: action.value,
            };
        case 'SET_USERGAME_ID':
            return {
                ...state,
                userGameId: action.value,
            };
        default:
            return state;
    }
}
