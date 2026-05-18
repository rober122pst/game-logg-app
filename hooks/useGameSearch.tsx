import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type GameSearchResultType = {
    igdbId: number;
    title: string;
    slug: string;
    coverUrl: string;
    totalRatingCount: number;
    game_type: 'Main Game' | 'Remake';
}

export function useGameSearch(query: string) {
    return useQuery({
        queryKey: ['search', query],
        queryFn: async () => {
            const res = await api.get<GameSearchResultType[]>(`/games/suggestions?q=${query}`);
            return res.data;
        },
        enabled: query.length >= 3,
    })
}