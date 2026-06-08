import { useTailwindColors } from '@/hooks/useTailwindColors';
import { GameAction } from '@/reducers/gameEventReducer';
import { GameStatus } from '@/reducers/gameRegisterReducer';
import { getStatusInfo } from '@/utils/statusMappings';
import { Text, View } from 'react-native';

interface UserGameStatusBadgeProps {
    status: Exclude<GameStatus, 'BEAT_EVENT'> | GameAction;
    size?: 'sm' | 'md' | 'lg';
}

export default function UserGameStatusBadge({ status, size = 'md' }: UserGameStatusBadgeProps) {
    const tailwindColors = useTailwindColors();
    const statusInfo = getStatusInfo(status, tailwindColors);
    const Icon = statusInfo.icon;

    const sizeClasses = {
        sm: 'px-2 py-1 gap-1',
        md: 'px-3 py-2 gap-2',
        lg: 'px-4 py-3 gap-2',
    };

    const textSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    const iconSizes = {
        sm: 12,
        md: 16,
        lg: 20,
    };

    return (
        <View
            className={`flex-row items-center rounded-lg border border-background-surface-secondary bg-background-surface ${sizeClasses[size]}`}
        >
            <Icon color={statusInfo.color} size={iconSizes[size]} />
            <Text className={`font-metropolis-semi-bold ${textSizes[size]} text-text-primary`}>{statusInfo.label}</Text>
        </View>
    );
}
