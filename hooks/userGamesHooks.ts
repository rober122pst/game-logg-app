import { DatePrecision, GameAction } from '@/reducers/gameEventReducer';
import { GameObjective, GameStatus } from '@/reducers/gameRegisterReducer';
import { api } from '@/services/api';
import { useUserStore } from '@/store/useUserStore';
import { UserGameType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type AddUserGame = {
    status: GameStatus;
    gameId: string;
    platformsIds: string[];
    price?: number;
    objective: GameObjective;
};

export function useAddUserGame() {
    const queryClient = useQueryClient();
    const userId = useUserStore((s) => s.userId);

    return useMutation({
        mutationFn: async (data: AddUserGame) => {
            return await api.post<UserGameType>(`/users/${userId}/games`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userGames', userId] });
        },
    });
}

export function useUserGames(params?: { gameId?: string; favorite?: boolean; status?: GameStatus }) {
    const userId = useUserStore((s) => s.userId);

    return useQuery({
        queryKey: ['userGames', userId, params?.gameId, params?.favorite, params?.status],
        queryFn: async () => {
            const urlParams = new URLSearchParams({
                ...(params?.gameId && { gameId: params.gameId }),
                ...(params?.favorite !== undefined && { favorite: params.favorite ? 'true' : 'false' }),
                ...(params?.status && { status: params.status }),
            });
            const res = await api.get<UserGameType[]>(`/users/${userId}/games?${urlParams.toString()}`);

            return res.data;
        },
        enabled: !!userId,
    });
}

type AddGameEvent = {
    action: GameAction;
    platformId: string;

    dateInput?: string | null;
    hourInput?: string | null;
    precision: DatePrecision;
    timeToEvent?: number | null;
};

export function useAddBeatEvent() {
    const queryClient = useQueryClient();
    const userId = useUserStore((s) => s.userId);

    return useMutation({
        mutationFn: async (data: AddGameEvent) => {
            return await api.post(`/users/${userId}/games`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userGames', 'gamesEvents', userId] });
        },
    });
}
