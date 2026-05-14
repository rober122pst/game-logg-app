import Logo from 'assets/logos/logo-tipo.svg';
import { Animated } from "react-native";
import BaseInterface from "./BaseInterface";

export default function LoadingComponent() {
    return (
        <BaseInterface>
            <Animated.View>
                <Logo width={150} height={150} />
            </Animated.View>
        </BaseInterface>
    );
}