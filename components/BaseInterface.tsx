import { StyleProp, ViewStyle } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';
import { Navbar } from './Navbar';

export default function BaseInterface({
    children,
    navbar,
    className,
    style,
}: {
    children?: React.ReactNode;
    navbar?: boolean;
    className?: string;
    style?: StyleProp<ViewStyle>;
}) {
    return (
        <SafeAreaView className={twMerge(className, 'py flex-1 bg-background px-4 text-text-primary')} style={style}>
            {children}
            {navbar && <Navbar />}
        </SafeAreaView>
    );
}
