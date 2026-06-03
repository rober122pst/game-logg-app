import { AddGameEvent } from '@/hooks/userGamesHooks';

export type DatePrecision = 'HOUR' | 'DAY' | 'MONTH' | 'YEAR';
export type GameAction = 'BEATED' | 'COMPLETED' | 'PLATINUM' | 'PERFECT';

export interface EventState {
    precision: DatePrecision;
    action: GameAction;
    platform: {
        id: string;
        name: string;
    };
    initialPlaytime: string;
    date: string;
    hour: string;
    timeToEvent: string;
    error?: string;
    payload?: AddGameEvent;
}

// prettier-ignore
export type EventAction =
    | {
        type: 'SET_PRECISION';
        value: DatePrecision;
    }
    | {
        type: 'SET_STATUS';
        value: GameAction;
    }
    | {
        type: 'SET_DATE' | 'SET_HOUR' | 'SET_PLAYTIME' | 'SET_TOTAL_PLAYTIME';
        value: string;
    }
    | {
        type: 'SET_PLATFORM';
        value: { id: string, name: string };
    }
    | {
        type: 'SET_PAYLOAD';
    };

export const initializeState: EventState = {
    precision: 'YEAR',
    action: 'BEATED',
    platform: {
        id: '',
        name: '',
    },
    initialPlaytime: '',
    date: '',
    hour: '',
    timeToEvent: '',
    error: '',
};

const dateConfig = {
    HOUR: { length: 8 },
    DAY: { length: 8 },
    MONTH: { length: 6 },
    YEAR: { length: 4 },
} as const;

const formatDate = (value: string, precision: DatePrecision) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, dateConfig[precision].length);

    switch (precision) {
        case 'HOUR':
        case 'DAY':
            if (limited.length <= 2) return limited;
            if (limited.length <= 4) return `${limited.slice(0, 2)}/${limited.slice(2)}`;
            return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;

        case 'MONTH':
            if (limited.length <= 2) return limited;
            return `${limited.slice(0, 2)}/${limited.slice(2)}`;

        case 'YEAR':
            return limited;
    }
};

const isValidDate = (value: string, precision: DatePrecision) => {
    const cleaned = value.replace(/\D/g, '');
    const expectedLength = dateConfig[precision].length;

    if (cleaned.length !== expectedLength) {
        return false;
    }

    switch (precision) {
        case 'HOUR':
        case 'DAY': {
            const day = Number(cleaned.slice(0, 2));
            const month = Number(cleaned.slice(2, 4));
            const year = Number(cleaned.slice(4, 8));

            if (month < 1 || month > 12) return false;
            if (day < 1 || day > 31) return false;

            const date = new Date(year, month - 1, day);

            return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        }

        case 'MONTH': {
            const month = Number(cleaned.slice(0, 2));
            const year = Number(cleaned.slice(2, 6));

            return month >= 1 && month <= 12 && year > 0;
        }

        case 'YEAR': {
            const year = Number(cleaned);
            return year > 0;
        }

        default:
            return false;
    }
};

const formatHour = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (!cleaned) return '';

    if (cleaned.length === 1) {
        if (parseInt(cleaned) > 2) return `0${cleaned}`;
        return cleaned;
    }

    if (cleaned.length === 2) {
        if (parseInt(cleaned) > 23) {
            const hour = `0${cleaned[0]}`;
            const minuteTen = cleaned[1];

            if (parseInt(minuteTen) > 5) return `${hour}:0${minuteTen}`;

            return `${hour}:${minuteTen}`;
        }
        return cleaned;
    }

    if (cleaned.length >= 3) {
        const hour = cleaned.slice(0, 2);
        const m1 = cleaned[2];
        const m2 = cleaned[3];

        if (parseInt(m1) > 5) return `${hour}:0${m1}`;

        return cleaned.length === 4 ? `${hour}:${m1}${m2}` : `${hour}:${m1}`;
    }

    return cleaned;
};

const hasDatePassed = (value: string, precision: DatePrecision) => {
    const cleaned = value.replace(/\D/g, '');
    const expectedLength = dateConfig[precision].length;
    if (cleaned.length !== expectedLength) {
        return false;
    }

    const now = new Date();

    switch (precision) {
        case 'HOUR':
        case 'DAY': {
            const day = Number(cleaned.slice(0, 2));
            const month = Number(cleaned.slice(2, 4));
            const year = Number(cleaned.slice(4, 8));

            const date = new Date(year, month - 1, day);
            date.setHours(0, 0, 0, 0);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return date <= today;
        }
        case 'MONTH': {
            const month = Number(cleaned.slice(0, 2));
            const year = Number(cleaned.slice(2, 6));

            if (month < 1 || month > 12) return false;

            return year <= now.getFullYear() || (year === now.getFullYear() && month <= now.getMonth() + 1);
        }
        case 'YEAR': {
            const year = Number(cleaned);
            return year <= now.getFullYear();
        }

        default:
            return false;
    }
};

export function reducer(state: EventState, action: EventAction): EventState {
    switch (action.type) {
        case 'SET_STATUS':
            return {
                ...state,
                action: action.value,
            };
        case 'SET_PRECISION':
            return {
                ...state,
                date: '',
                hour: '',
                precision: action.value,
            };
        case 'SET_DATE': {
            const date = formatDate(action.value, state.precision);
            let error = '';

            if (!isValidDate(date, state.precision)) {
                error = 'Data Inválida.';
            } else if (!hasDatePassed(date, state.precision)) error = 'Data ainda não aconteceu.';

            return {
                ...state,
                date,
                error,
            };
        }
        case 'SET_HOUR': {
            const hour = formatHour(action.value);

            return {
                ...state,
                hour,
            };
        }
        case 'SET_PLAYTIME':
            return {
                ...state,
                timeToEvent: action.value,
            };
        case 'SET_TOTAL_PLAYTIME':
            return {
                ...state,
                initialPlaytime: action.value,
            };
        case 'SET_PLATFORM':
            return {
                ...state,
                platform: action.value,
            };

        default:
            return state;
    }
}
