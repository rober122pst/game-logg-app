import { ScrollView } from "react-native";

import BaseInterface from "components/BaseInterface";
import Header from "components/Header";
import LoadingComponent from "components/LoadingComponent";
import { useMe } from "hooks/userHooks";

export default function Home() {
    const { data, isLoading } = useMe();

    if (isLoading || !data) return <LoadingComponent />

    return (
        <BaseInterface>
            <Header username={data.username} />
            <ScrollView className="px-4">
            </ScrollView>
        </BaseInterface>
    )
}