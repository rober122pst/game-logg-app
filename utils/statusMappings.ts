import { GameAction } from '@/reducers/gameEventReducer';
import { GameStatus } from '@/reducers/gameRegisterReducer';
import { CheckCircle2, Gamepad, Gamepad2, HeartOff, LucideProps, Percent, Star, Trophy } from 'lucide-react-native';
import React from 'react';

export type StatusInfo = {
    label: string;
    icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
    color: string;
};

export const getStatusInfo = (
    status: Exclude<GameStatus, 'BEAT_EVENT'> | GameAction,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tailwindColors: Record<string, any>
): StatusInfo => {
    const statusMap: Record<Exclude<GameStatus, 'BEAT_EVENT'> | GameAction, StatusInfo> = {
        PLAYING: {
            label: 'Jogando',
            icon: Gamepad2,
            color: tailwindColors.raspberry,
        },
        I_WILL_PLAY: {
            label: 'Adquirido',
            icon: Gamepad,
            color: tailwindColors['text-primary'].dark,
        },
        DROPPED: {
            label: 'Dropei',
            icon: HeartOff,
            color: tailwindColors['text-secondary'].dark,
        },
        BEATED: {
            label: 'Zerado',
            icon: CheckCircle2,
            color: tailwindColors.raspberry,
        },
        COMPLETED: {
            label: '100',
            icon: Percent,
            color: tailwindColors.mint,
        },
        PLATINUM: {
            label: 'Platinado',
            icon: Trophy,
            color: tailwindColors['cocoa-brown'],
        },
        PERFECT: {
            label: 'Perfeito',
            icon: Star,
            color: tailwindColors['cocoa-brown'],
        },
    };

    return statusMap[status];
};
