import GameRegisterHeader from '@/components/GameRegisterHeader';
import { RootStackParamList } from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventRegisterScreen from './EventRegisterScreen';
import GameScreen from './GameScreen';
import Home from './Home';
import SearchScreen from './Search';

export default function AppStack() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen
                name="UserGameRegister"
                component={EventRegisterScreen}
                options={({ route }) => ({
                    headerShown: true,
                    header: () => <GameRegisterHeader gameTitle={route.params.game.title} />,
                })}
            />
        </Stack.Navigator>
    );
}
