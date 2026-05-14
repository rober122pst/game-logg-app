export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    Home: undefined;
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

export interface UserType {
    id: string;
    username: string;
    profile: ProfileType | null;
    library: UserGameType[] | null;
    createdAt: string;
}