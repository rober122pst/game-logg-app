import { RootStackParamList } from "@/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameScreen from "./GameScreen";
import Home from "./Home";
import SearchScreen from "./Search";

export default function AppStack() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
    );
}