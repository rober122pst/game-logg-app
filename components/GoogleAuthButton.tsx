import { Image, Pressable, Text } from "react-native";
import GoogleLogo from '../assets/google-icon.png';

export function GoogleAuthButton() {
    return (
        <Pressable className="flex-row min-w-32 min-h-12 px-4 py-2 rounded-lg items-center justify-center bg-white active:opacity-80" >
            <Image source={GoogleLogo} className='w-9 h-9 mr-4' />
            <Text className="text-text-secondary font-metropolis-medium">Entrar com Google</Text>
        </Pressable>
    );
}