export const themeColors = {
    background: { dark: string, light: string },
    'background-surface': { dark: string, light: string },
    'background-surface-secondary': { dark: string, light: string },
    'text-primary': { dark: string, light: string },
    'text-secondary': { dark: string, light: string },
    mint: { dark: string, light: string },
    raspberry: { dark: string, light: string },
    'cocoa-brown': { dark: string, light: string },
}

declare const themeConfig: {
    themeColors: typeof themeColors,
}

export default themeConfig;