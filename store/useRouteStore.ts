import { create } from "zustand";

interface RouteState {
    currentRoute: 'home' | 'search' | 'profile';
    setCurrentRoute: (route: 'home' | 'search' | 'profile') => void;
}

export const useRouteStore = create<RouteState>((set) => ({
    currentRoute: 'home',
    setCurrentRoute: (route) => set({ currentRoute: route }),
}));