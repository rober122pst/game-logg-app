import { DatePrecision, GameAction } from '@/reducers/gameEventReducer';
import { GameObjective, GameStatus } from '@/reducers/gameRegisterReducer';
import { api } from '@/services/api';
import { useUserStore } from '@/store/useUserStore';
import { UserGameType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    gameId: string;
    platformsIds: string[];
    price?: number;
    objective: GameObjective;
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

export function useUserGames(params?: { gameId?: string; favorite?: boolean; status?: GameStatus }) {
    const user = useUserStore((s) => s.user);

    return useQuery({
        queryKey: ['userGames', user?.id, params?.gameId, params?.favorite, params?.status],
        queryFn: async () => {
            const urlParams = new URLSearchParams({
                ...(params?.gameId && { gameId: params.gameId }),
                ...(params?.favorite !== undefined && { favorite: params.favorite ? 'true' : 'false' }),
                ...(params?.status && { status: params.status }),
            });
            const res = await api.get<UserGameType[]>(`/users/${user?.id}/games?${urlParams.toString()}`);

            return res.data;
        },
        enabled: !!user,
    });
}
