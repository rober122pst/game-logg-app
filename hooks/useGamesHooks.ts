import { DatePrecision, GameAction } from '@/reducers/gameEventReducer';
import { GameDifficulty, GameStatus } from '@/reducers/gameRegisterReducer';
import { api } from '@/services/api';
import { useUserStore } from '@/store/useUserStore';
import { UserGameType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AddGameEvent = {
    action: GameAction;
    platformId: string;

    dateInput?: string | null;
    hourInput?: string | null;
    precision: DatePrecision;
    timeToEvent?: number | null;
};

export type AddUserGame = {
    status: GameStatus;
    comment?: string;
    favorite: boolean;
    difficulty: GameDifficulty;
    acquiredAt?: Date;
    gameId: string;
    platformsIds: string[];
    beatEvents: AddGameEvent[];
};

export function useAddUserGame() {
    const queryClient = useQueryClient();
    const user = useUserStore((s) => s.user);

    return useMutation({
        mutationFn: (data: AddUserGame) => {
            return api.post<UserGameType>(`/users/${user?.id}/games`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userGames', user?.id] });
        },
    });
}
