interface State {
    status: 'PLAYING' | 'BEATED' | 'PLATINUM' | 'COMPLETED' | 'WISHLIST' | 'DROPPED';
    acquiredAt: string;
    platform: string;
}

type Action =
    | {
          type: 'SET_STATUS';
          value: 'PLAYING' | 'BEATED' | 'PLATINUM' | 'COMPLETED' | 'WISHLIST' | 'DROPPED';
      }
    | {
          type: 'SET_PLATFORM';
          value: string;
      }
    | {
          type: 'SET_ACQUIRED';
          year: string;
      };

export const initializeState: State = {
    status: 'PLAYING',
    acquiredAt: new Date().toLocaleDateString(),
    platform: '',
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
        default:
            return state;
    }
}
