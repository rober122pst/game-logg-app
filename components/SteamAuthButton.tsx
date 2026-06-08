import SteamLogo from '@/assets/Steam_Symbol_1.png';
import { Image, Linking, Pressable, Text } from 'react-native';

export function SteamAuthButton() {
    const handleLogin = async () => {
        await Linking.openURL('https://saddlebag-donation-decorated.ngrok-free.dev/auth/steam');
    };

    return (
        <Pressable
            className="min-h-12 min-w-32 flex-row items-center justify-center rounded-lg bg-[#192433] px-4 py-2 active:opacity-80"
            onPress={handleLogin}
        >
            <Image source={SteamLogo} className="mr-4 h-9 w-9" />
            <Text className="font-metropolis-medium text-text-primary">Entrar com Steam</Text>
        </Pressable>
    );
}
