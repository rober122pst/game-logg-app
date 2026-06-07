import { DatePrecision, GameAction } from '@/reducers/gameEventReducer';
import { GameDifficulty, GameObjective, GameStatus } from '@/reducers/gameRegisterReducer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/services/api';
import { useUserStore } from '@/store/useUserStore';
import { UserGameType } from '@/types';

export type AddUserGame = {
    status: GameStatus;
    gameId: string;
    price?: number;
    objective: GameObjective;
};

export function useAddUserGame() {
    const queryClient = useQueryClient();
    const userId = useUserStore((s) => s.userId);

    return useMutation({
        mutationFn: async (data: AddUserGame) => {
            return await api.post<UserGameType>('/users/me/games', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userGames', userId, 'stats'] });
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
            const res = await api.get<UserGameType[]>(`/users/me/games?${urlParams.toString()}`);

            return res.data;
        },
        enabled: !!userId,
    });
}

export type AddGameEvent = {
    userGameId: string;
    action: GameAction;
    platformId: string;
    initialPlaytime?: number;
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
            return await api.post(`/users/me/games/${data.userGameId}/events`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userGames', 'gamesEvents', userId, 'stats'] });
        },
    });
}

export type AddRating = {
    userGameId: string;
    difficulty: GameDifficulty;
    scores: {
        gameplay: number;
        graphics: number;
        story: number;
        sound: number;
    };
    comment?: string;
    favorite: boolean;
};

export function useAddRating() {
    const queryClient = useQueryClient();
    const userId = useUserStore((s) => s.userId);

    return useMutation({
        mutationFn: async (data: AddRating) => {
            return await api.post(`/users/me/games/${data.userGameId}/rating`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userGames', 'rating', userId, 'stats'] });
        },
    });
}
