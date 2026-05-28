import tailwindConfig from '@/tailwind.config';
import { themeColors } from '@/theme.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig);

export function useTailwindColors() {
    const tailwindColors = fullConfig.theme.colors;
    const colors = themeColors;
    return {
        ...tailwindColors,
        ...colors,
    };
}
