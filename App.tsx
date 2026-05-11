import 'global.css';
import 'react-native-reanimated';

import Login from 'auth/Login';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

  return (
    <>
      <SafeAreaProvider>
        <Login />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </>
  );
}
