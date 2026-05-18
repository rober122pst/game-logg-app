import BaseInterface from "@/components/BaseInterface";
import Header from "@/components/Header";
import LoadingComponent from "@/components/LoadingComponent";
import StatsSection from "@/components/StatsSection";
import { useMe } from "@/hooks/userHooks";
import { useRouteStore } from "@/store/useRouteStore";
import { useEffect } from "react";
import { ScrollView } from "react-native";

export default function Home() {
    const { data, isLoading } = useMe();
    const setCurrentRoute = useRouteStore((s) => s.setCurrentRoute);

    useEffect(() => {
        setCurrentRoute('home');
    }, [setCurrentRoute]);

    if (isLoading || !data) return <LoadingComponent />

    return (
        <BaseInterface navbar>
            <Header />
            <ScrollView className="px-4 py-8">
                <StatsSection />
            </ScrollView>
        </BaseInterface>
    )
}