import { GameDifficulty } from './gameRegisterReducer';

export interface GameRatingState {
    graphics: number;
    gameplay: number;
    story: number;
    sound: number;
    overall: number;
    favorite: boolean;
    difficulty: GameDifficulty;
    comment: string;
}

export type GameRatingAction =
    | { type: 'SET_SCORE'; payload: { category: keyof GameRatingState; score: number } }
    | { type: 'SET_COMMENT'; value: string }
    | { type: 'SET_FAVORITE' }
    | { type: 'SET_DIFFICULTY'; value: GameDifficulty };

export const initialGameRatingState: GameRatingState = {
    graphics: 7,
    gameplay: 7,
    story: 7,
    sound: 7,
    overall: 7,
    favorite: false,
    difficulty: 'B',
    comment: '',
};

export function gameRatingReducer(state: GameRatingState, action: GameRatingAction): GameRatingState {
    switch (action.type) {
        case 'SET_SCORE': {
            const newState = {
                ...state,
                [action.payload.category]: action.payload.score,
            };
            const { graphics, gameplay, story, sound } = newState;

            const overall = (graphics + gameplay + story + sound) / 4;

            return {
                ...newState,
                overall,
            };
        }
        case 'SET_COMMENT':
            return {
                ...state,
                comment: action.value,
            };
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
