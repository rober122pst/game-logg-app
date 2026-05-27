import { Gamepad2 } from 'lucide-react-native';
import { Text, View } from 'react-native';
import BaseInterface from './BaseInterface';

interface GameLoadingComponentProps {
    gameParams: {
        igdbId: number;
        title: string;
        coverUrl: string;
        slug: string;
    };
}

export default function GameLoadingComponent({ gameParams }: GameLoadingComponentProps) {
    return (
        <BaseInterface navbar>
            <View className="flex-1 items-center justify-center">
                <Gamepad2 color="#D9D9D9" size={70} className="mb-4" />
                <Text className="font-metropolis-light text-lg text-text-primary">
                    Carregando {gameParams && gameParams.title}...
                </Text>
            </View>
        </BaseInterface>
    );
}
