import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "./Navbar";

export default function BaseInterface({ children, navbar }: { children?: React.ReactNode; navbar?: boolean }) {
    return (
        <SafeAreaView className="bg-background flex-1 text-text-primary px-4 py">
            {children}
            {navbar && <Navbar />}
        </SafeAreaView>
    )
}