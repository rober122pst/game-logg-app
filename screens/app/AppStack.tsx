import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";
import Home from "./Home";
import ConnectSteamScreen from "./ConnectSteam";


export default function AppStack() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
            <Stack.Screen name="Home" component={Home} />
            {/* 2. Adicione a tela na pilha de navegação */}
            <Stack.Screen name="ConnectSteam" component={ConnectSteamScreen} />
        </Stack.Navigator>
    );
}