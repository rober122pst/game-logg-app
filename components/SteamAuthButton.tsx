import { Image, Pressable, Text } from "react-native";
import SteamLogo from '../assets/Steam_Symbol_1.png';

export function SteamAuthButton() {
    return (
        <Pressable className="flex-row min-w-32 min-h-12 px-4 py-2 rounded-lg items-center justify-center bg-[#192433] active:opacity-80" >
            <Image source={SteamLogo} className='w-9 h-9 mr-4' />
            <Text className="text-text-primary font-metropolis-medium">Entrar com Steam</Text>
        </Pressable>
    );
}