import 'global.css';
import 'react-native-reanimated';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NavigationContainer } from '@react-navigation/native';
import { Routes } from 'components/Routes';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();
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

    <SafeAreaProvider className='flex-1'>
      <StatusBar barStyle='default' />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
