import { Currency, PlayLimits } from "@enigma-lake/zoot-platform-sdk";

export type StylingProps = {
    inputStyle?: {
        backgroundColorHex?: string;
        textColorHex?: string;
    };
};

export type CurrencyProps = {
    currentCurrency: Currency;
    currencies: Currency[];
    formatCurrency: (value: number, currency: Currency) => string;
};

export type ActionsProps = {
    onPlay: () => void;
    onCashout: () => void;
};

export type PlaySettingsProps = {
    winAmount?: number;
    isPlaying: boolean;
    canCashout: boolean;
    disabledController: boolean;
    playHook: () => {
        availableBalance: number;
        playLimits?: PlayLimits;
        playAmount: number;
        setPlayAmount: (value: number) => void;
    };
};

export type PlayControllerProps = StylingProps & ActionsProps & {
    currencyOptions: CurrencyProps;
    playOptions: PlaySettingsProps;
}