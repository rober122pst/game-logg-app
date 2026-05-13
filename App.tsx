import 'global.css';
import 'react-native-reanimated';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from 'screens/auth/Login';
import Register from 'screens/auth/Register';
import { RootStackParamList } from 'types';

export default function App() {
  const [loadedFonts] = useFonts({
    'Metropolis-Regular': require('./assets/fonts/Metropolis/Metropolis-Regular.otf'),
    'Metropolis-Medium': require('./assets/fonts/Metropolis/Metropolis-Medium.otf'),
    'Metropolis-SemiBold': require('./assets/fonts/Metropolis/Metropolis-SemiBold.otf'),
    'Metropolis-Bold': require('./assets/fonts/Metropolis/Metropolis-Bold.otf'),
    'Metropolis-Light': require('./assets/fonts/Metropolis/Metropolis-Light.otf'),
    'Metropolis-Black': require('./assets/fonts/Metropolis/Metropolis-Black.otf'),
  });

  if (!loadedFonts) return null;

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
