interface State {
    precision: 'Hora' | 'Dia' | 'Mês' | 'Ano';
    action: 'BEATED' | 'PLATINUM' | 'COMPLETED';
    difficulty: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
    platform: '';
    date: string;
    occurredAtStart: Date;
    occurredAtEnd: Date;
    error?: string;
};

type Action = | {
    type: 'SET_PRECISION';
    value: 'Hora' | 'Dia' | 'Mês' | 'Ano';
} | {
    type: 'SET_STATUS';
    value: 'BEATED' | 'PLATINUM' | 'COMPLETED';
} | {
    type: 'SET_DIFFICULTY';
    value: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
} | {
    type: 'SET_DATE';
    value: string;
};

export const initializeState: State = {
    precision: 'Ano',
    action: 'BEATED',
    difficulty: 'D',
    platform: '',
    date: '',
    occurredAtStart: new Date(),
    occurredAtEnd: new Date(),
    error: '',
};

const formatDate = (value: string) => {
    // remove tudo que não for número
    const cleaned = value.replace(/\D/g, "");

    // limita a 8 números
    const limited = cleaned.slice(0, 8);

    // adiciona as barras
    if (limited.length <= 2) {
        return limited;
    }

    if (limited.length <= 4) {
        return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    }

    return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
};

const isValidDate = (date: string) => {
    const [day, month, year] = date.split("/").map(Number);

    const d = new Date(year, month - 1, day);

    return (
        d.getFullYear() === year &&
        d.getMonth() === month - 1 &&
        d.getDate() === day
    );
};

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_STATUS':
            return {
                ...state,
                action: action.value,
            }
        case 'SET_PRECISION':
            return {
                ...state,
                date: '',
                precision: action.value,
            }
        case 'SET_DIFFICULTY':
            return {
                ...state,
                difficulty: action.value,
            }
        case 'SET_DATE': {
            const date = formatDate(action.value);
            const error = isValidDate(date) ? '' : 'Data Inválida.';

            return {
                ...state,
                date,
                error,
            }
        }
        default:
            return state;
    }
}