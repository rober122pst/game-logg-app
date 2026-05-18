import { api } from "@/services/api";
import { GameType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGame(igdbId: number) {
    return useQuery({
        queryKey: ['game', igdbId],
        queryFn: async () => {
            const res = await api.get<{ game: GameType }>(`/games/${igdbId}`);
            return res.data.game;
        },
    })
}