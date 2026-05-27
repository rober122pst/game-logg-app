export type DatePrecision = 'HOUR' | 'DAY' | 'MONTH' | 'YEAR';

interface State {
    precision: DatePrecision;
    action: 'BEATED' | 'PLATINUM' | 'COMPLETED';
    difficulty: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
    platform: '';
    date: string;
    occurredAtStart: Date;
    occurredAtEnd: Date;
    error?: string;
}

type Action =
    | {
          type: 'SET_PRECISION';
          value: DatePrecision;
      }
    | {
          type: 'SET_STATUS';
          value: 'BEATED' | 'PLATINUM' | 'COMPLETED';
      }
    | {
          type: 'SET_DIFFICULTY';
          value: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
      }
    | {
          type: 'SET_DATE';
          value: string;
      };

export const initializeState: State = {
    precision: 'YEAR',
    action: 'BEATED',
    difficulty: 'D',
    platform: '',
    date: '',
    occurredAtStart: new Date(),
    occurredAtEnd: new Date(),
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

            return date < today;
        }
        case 'MONTH': {
            const month = Number(cleaned.slice(0, 2));
            const year = Number(cleaned.slice(2, 6));

            if (month < 1 || month > 12) return false;

            return year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1);
        }
        case 'YEAR': {
            const year = Number(cleaned);
            return year < now.getFullYear();
        }

        default:
            return false;
    }
};

export function reducer(state: State, action: Action): State {
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
                precision: action.value,
            };
        case 'SET_DIFFICULTY':
            return {
                ...state,
                difficulty: action.value,
            };
        case 'SET_DATE': {
            const date = formatDate(action.value, state.precision);
            let error = '';

            if (!isValidDate(date, state.precision) || !hasDatePassed(date, state.precision)) {
                error = 'Data Inválida.';
            }

            return {
                ...state,
                date,
                error,
            };
        }
        default:
            return state;
    }
}
