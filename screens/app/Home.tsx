import BaseInterface from "components/BaseInterface";
import Header from "components/Header";
import LoadingComponent from "components/LoadingComponent";
import StatsSection from "components/StatsSection";
import { useMe } from "hooks/userHooks";
import { ScrollView } from "react-native";

export default function Home() {
    const { data, isLoading } = useMe();

    if (isLoading || !data) return <LoadingComponent />

    return (
        <BaseInterface>
            <Header username={data.username} />
            <ScrollView className="px-4 py-8">
                <StatsSection />
            </ScrollView>
        </BaseInterface>
    )
}