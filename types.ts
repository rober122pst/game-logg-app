import { GameDifficulty, GameStatus } from './reducers/gameRegisterReducer';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    Home: undefined;
    Search: undefined;
    Profile: { profile: ProfileType };
    Game: { igdbId: number; title: string; coverUrl: string; slug: string };
    UserGameRegister: { game: GameType };
};

export interface ProfileType {
    id: string | null;
    displayName: string | null;
    bio: string | null;
    avatar: string | null;
    banner: string | null;
    isPublic: boolean | null;
    userId: string | null;
}

export interface UserGameType {
    id: string;
    platformIds: string[];
    status: GameStatus;
    objective: string;
    comment: string | null;
    favorite: boolean;
    difficulty: GameDifficulty;
    acquiredAt: Date | null;
    price: number | null;
    gameId: string;
    userId: string;
    createdAt: Date;
    updateAt: Date;
    game: GameType;
    steam: {
        playtimeForever: number;
        lastPlayed: Date | null;
        playtime_2weeks: number;
        achievementsPercent: number;
        isPlatinum: boolean;
    } | null;
}

export interface PlatformType {
    id: string;
    slug: string;
    name: string;
    icon?: string;
    gameId: string[];
    games: GameType[];
    userGame: UserGameType[];
}

export interface GameType {
    id: string;
    slug: string;
    title: string;
    igdbId: number;
    steamId?: string | null;
    alternativeTitles?: string[];
    platformIds?: string[];
    platforms: PlatformType[];
    releaseDate?: Date | string | null;
    genreIds?: string[];
    coverUrl?: string | null;
    bannerUrl?: string | null;
    screenshots?: string[];
    description?: string | null;
    preferedSource?: string | null;
    ratings: { iconUrl?: string | null; link: string; score: number; name: 'IGDB' | 'IGN' }[] | [];
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
