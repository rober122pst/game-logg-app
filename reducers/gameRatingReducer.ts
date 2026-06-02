export interface GameRatingState {
    graphics: number;
    gameplay: number;
    story: number;
    sound: number;
    overall: number;
    comments: string;
}

export type GameRatingAction =
    | { type: 'SET_SCORE'; payload: { category: keyof GameRatingState; score: number } }
    | { type: 'SET_COMMENTS'; value: string };

export const initialGameRatingState: GameRatingState = {
    graphics: 0,
    gameplay: 0,
    story: 0,
    sound: 0,
    overall: 0,
    comments: '',
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
        case 'SET_COMMENTS':
            return {
                ...state,
                comments: action.value,
            };
        default:
            return state;
    }
}
