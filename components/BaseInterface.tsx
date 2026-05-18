import { StyleProp, ViewStyle } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";
import { Navbar } from "./Navbar";

export default function BaseInterface({ children, navbar, className, style }: { children?: React.ReactNode; navbar?: boolean, className?: string, style?: StyleProp<ViewStyle> }) {
    return (
        <SafeAreaView className={twMerge(className, "bg-background flex-1 text-text-primary px-4 py")} style={style} >
            {children}
            {navbar && <Navbar />}
        </SafeAreaView>
    )
}