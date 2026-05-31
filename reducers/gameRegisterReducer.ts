export type GameDifficulty = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';

export type GameStatus = 'PLAYING' | 'BEATED' | 'COMPLETED' | 'PLATINUM' | 'PERFECT' | 'DROPPED';

interface State {
    status: GameStatus;
    acquiredAt: string;
    platform: {
        id: string;
        name: string;
    };
    favorite: boolean;
    difficulty: GameDifficulty;
}

// prettier-ignore
type Action =
    | {
        type: 'SET_STATUS';
        value: GameStatus;
    }
    | {
        type: 'SET_PLATFORM';
        value: { id: string, name: string };
    }
    | {
        type: 'SET_ACQUIRED';
        year: string;
    }
    | {
        type: 'SET_DIFFICULTY';
        value: GameDifficulty;
    }
    | {
        type: 'SET_FAVORITE';
    };

export const initializeState: State = {
    status: 'PLAYING',
    acquiredAt: new Date().toLocaleDateString(),
    platform: { id: '', name: '' },
    favorite: false,
    difficulty: 'C',
};

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_STATUS':
            return {
                ...state,
                status: action.value,
            };
        case 'SET_PLATFORM':
            return {
                ...state,
                platform: action.value,
            };
        case 'SET_ACQUIRED': {
            const numericValue = action.year.replace(/[^0-9]/g, '');

            return {
                ...state,
                acquiredAt: numericValue.slice(0, 4),
            };
        }
        case 'SET_DIFFICULTY':
            return {
                ...state,
                difficulty: action.value,
            };
        case 'SET_FAVORITE':
            return {
                ...state,
                favorite: !state.favorite,
            };
        default:
            return state;
    }
}
