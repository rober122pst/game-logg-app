import { DatePrecision, GameAction } from './reducers/gameEventReducer';
import { GameStatus } from './reducers/gameRegisterReducer';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    AuthCallback: { token?: string };
    ForgotPassword: undefined;
    Home: undefined;
    Search: undefined;
    Profile: undefined;
    Game: { igdbId: number; title: string; coverUrl: string; slug: string };
    UserGameRegister: { game: GameType };
    BeatEventRegister: { userGameId: string; game: GameType };
    UserGameStats: { userGameId: string; gameTitle: string };
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
    difficulty?: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
}

export interface FeedCardType {
    id: number;
    user: string;
    avatar: string;
    action: string;
    game: string;
    time: string;
    likes: number;
    comments: number;
    gameImg: string;
    isAchievement: boolean;
    playtime?: string;
}

export interface BeatEventType {
    id: string;
    action: 'BEATED' | 'COMPLETED' | 'PLATINUM' | 'PERFECT';
    occurredAtStart: Date;
    occurredAtEnd: Date;
    precision: DatePrecision;

    timeToEvent: number;

    createdAt: Date;
}

export interface Genres {
    id: string;
    name: string;
    slug: string;
}

export interface UserGameType {
    id: string;
    platformIds: string[];
    status: Exclude<GameStatus, 'BEAT_EVENT'> | GameAction;
    objective: string;
    price: number | null;
    initialPlaytime: number | null;
    rating?: RatingType;
    beatEvents?: BeatEventType[];
    playedPlatforms: PLayedPlatforms[];
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

export interface PLayedPlatforms {
    id: string;

    platformId: string;
    platform: PlatformType;
    userGameIds: string;
    userGames: UserGameType[];
    userId: string;
    user: UserType;

    totalMinutes: number;
    totalSessions: number;
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
    genres?: Genres[];
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
