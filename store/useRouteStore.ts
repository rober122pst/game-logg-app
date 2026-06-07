import { create } from 'zustand';

interface RouteState {
    currentRoute: 'home' | 'search' | 'profile' | 'library';
    setCurrentRoute: (route: 'home' | 'search' | 'profile' | 'library') => void;
}

export const useRouteStore = create<RouteState>((set) => ({
    currentRoute: 'home',
    setCurrentRoute: (route) => set({ currentRoute: route }),
}));
