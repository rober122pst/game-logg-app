import { useQuery } from "@tanstack/react-query";
import { api } from "services/api";
import { useAuthStore } from "store/useAuthStore";
import { UserType } from "types";

export function useMe() {
    const token = useAuthStore((s) => s.token);

    return useQuery({
        queryKey: ['me'],
        queryFn: () => {
            const res = api.get<UserType>('/users/me')
            return res.then((r) => r.data);
        },
        enabled: !!token,
    })
}