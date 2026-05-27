import GoogleLogo from '@/assets/google-icon.png';
import { Image, Pressable, Text } from 'react-native';

export function GoogleAuthButton() {
    return (
        <Pressable className="min-h-12 min-w-32 flex-row items-center justify-center rounded-lg bg-white px-4 py-2 active:opacity-80">
            <Image source={GoogleLogo} className="mr-4 h-9 w-9" />
            <Text className="font-metropolis-medium text-text-secondary">Entrar com Google</Text>
        </Pressable>
    );
}
