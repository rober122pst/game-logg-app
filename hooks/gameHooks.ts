import { api } from '@/services/api';
import { GameType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useGame(igdbId: number) {
    return useQuery({
        queryKey: ['game', igdbId],
        queryFn: async () => {
            const res = await api.get<{ game: GameType }>(`/games/${igdbId}`);
            return res.data.game;
        },
    });
}

export function useGetPopularGames(take: number = 10) {
    return useQuery({
        queryKey: ['popular-games'],
        queryFn: async () => {
            const res = await api.get<{ data: GameType[] }>(`/games/popular-games?take=${take}`);
            return res.data.data;
        },
    });
}

export function useGames(take: number) {
    return useQuery({
        queryKey: ['games-generical'],
        queryFn: async () => {
            const res = await api.get<GameType[]>(`/games?take=${take}`);
            return res.data;
        },
    });
}
