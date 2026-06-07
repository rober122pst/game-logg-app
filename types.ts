import { GameAction } from './reducers/gameEventReducer';
import { GameStatus } from './reducers/gameRegisterReducer';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    Home: undefined;
    Search: undefined;
    Profile: undefined;
    Game: { igdbId: number; title: string; coverUrl: string; slug: string };
    UserGameRegister: { game: GameType };
    Library: undefined;
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

export interface RatingType {
    id: string;
    graphics: number;
    gameplay: number;
    story: number;
    sound: number;
    comment?: string;
    favorite: boolean;
}

export interface UserGameType {
    id: string;
    platformIds: string[];
    status: Exclude<GameStatus, 'BEAT_EVENT'> | GameAction;
    objective: string;
    price: number | null;
    initialPlaytime: number | null;
    rating?: RatingType;
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
    releaseDate: string;
    title: string;
    igdbId: number;
    steamId?: string | null;
    alternativeTitles?: string[];
    platformIds?: string[];
    platforms: PlatformType[];
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
