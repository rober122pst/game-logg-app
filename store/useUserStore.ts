import { UserType } from '@/types';
import { create } from 'zustand';

interface UserState {
    user: UserType | null;
    userId: string;
    setUser: (user: UserType | null) => void;
}

export const useUserStore = create<UserState>()((set) => ({
    user: null,
    userId: '',
    setUser: (user) => set({ user, userId: user?.id }),
}));
