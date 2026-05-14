import { MyStatsType, UserType } from "types";

import { useQuery } from "@tanstack/react-query";
import { api } from "services/api";
import { useAuthStore } from "store/useAuthStore";
import { useUserStore } from "store/useUserStore";

export function useMe() {
    const token = useAuthStore((s) => s.token);
    const setUser = useUserStore((s) => s.setUser);

    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const res = await api.get<UserType>('/users/me')
            const user = res.data;
            setUser(user);
            return user;
        },
        enabled: !!token,
    })
}

export function useMyStats() {
    const token = useAuthStore((s) => s.token);
    const user = useUserStore((s) => s.user);

    return useQuery({
        queryKey: ['my-stats'],
        queryFn: async () => {
            const res = await api.get<MyStatsType>(`/users/${user?.id}/stats`)
            return res.data;
        },
        enabled: !!user || !!token,
    })
}