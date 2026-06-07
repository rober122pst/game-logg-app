import { api } from '@/services/api';
import { UserGameType } from '@/types';
import { useQuery } from '@tanstack/react-query';

type TopGenresType = {
    totalTags: number;
    stats: {
        genre: string;
        total: number;
        percentage: number;
    }[];
};

type ProfileData = {
    playingNow: {
        currentGame: string;
        totalPlaying: number;
    };
    topGenres: TopGenresType;
    favoriteGames: UserGameType[];
};

export function useGetProfileData() {
    return useQuery({
        queryKey: ['profile', 'stats'],
        queryFn: async () => {
            const res = await api.get<ProfileData>('users/me/profile');
            return res.data;
        },
    });
}
