export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    Home: undefined;
    Search: undefined;
    Profile: undefined;
    Game: { igdbId: number, title: string, coverUrl: string, slug: string };
}

export interface ProfileType {
    id: string | null
    displayName: string | null
    bio: string | null
    avatar: string | null
    banner: string | null
    isPublic: boolean | null
    userId: string | null
}

export interface UserGameType {
    id: string | null
    status: "PLAYING" | "PLATINUM" | "COMPLETED" | "WISHLIST" | "DROPPED" | null
    playtime: number | null
    comment: string | null
    favorite: boolean | null
    difficulty: "D" | "S" | "C" | "B" | "A" | "SS" | null
    acquiredAt: Date | null
    gameId: string | null
    userId: string | null
    createdAt: Date | null
    updateAt: Date | null
}

export interface GameType {
    id: string
    slug: string
    title: string
    alternativeTitles?: string[]
    platformIds?: string[]
    releaseDate?: Date | string | null
    genreIds?: string[]
    coverUrl?: string | null
    bannerUrl?: string | null
    screenshots?: string[]
    description?: string | null
    preferedSource?: string | null
    ratings: { iconUrl?: string | null, link: string, score: number, name: 'IGDB' | 'IGN' }[] | [],

}

export interface UserType {
    id: string;
    username: string;
    profile: ProfileType | null;
    library: UserGameType[] | null;
    createdAt: string;
}

export interface MyStatsType {
    beatedGames: number;
    platinumGames: number;
    totalPlaytime: number;
}