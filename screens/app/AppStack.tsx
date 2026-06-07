import GameRegisterHeader from '@/components/GameRegisterHeader';
import Header from '@/components/Header';
import LoadingComponent from '@/components/LoadingComponent';
import { useMe } from '@/hooks/userHooks';
import { RootStackParamList } from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventRegisterScreen from './EventRegisterScreen';
import GameScreen from './GameScreen';
import Home from './Home';
import Library from './Library';
import Profile from './Profile';
import SearchScreen from './Search';

export default function AppStack() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { data, isLoading } = useMe();

    if (!data || isLoading) return <LoadingComponent />;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: true, header: () => <Header /> }} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: true, header: () => <Header /> }}
            />
            <Stack.Screen
                name="UserGameRegister"
                component={EventRegisterScreen}
                options={({ route }) => ({
                    headerShown: true,
                    header: () => <GameRegisterHeader gameTitle={route.params.game.title} />,
                })}
            />
            <Stack.Screen
                name="Library"
                component={Library}
                options={{ headerShown: true, header: () => <Header /> }}
            />
        </Stack.Navigator>
    );
}
