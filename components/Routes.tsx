import AppStack from "@/screens/app/AppStack";
import AuthStack from "@/screens/auth/AuthStack";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from 'react';
import LoadingComponent from "./LoadingComponent";

export function Routes() {
    const token = useAuthStore((s) => s.token);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const checkStorage = async () => {
            setIsReady(true);
        };
        checkStorage();
    }, []);

    useEffect(() => {
        console.log(token);
    }, [token])

    if (!isReady) return <LoadingComponent />;

    return !token ? <AuthStack /> : <AppStack />;
}