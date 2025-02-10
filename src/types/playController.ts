import { Currency, PlayLimits } from "@enigma-lake/zoot-platform-sdk";

export type StylingProps = {
  panel: {
    bottom: string;
    bgColorHex: string;
  };
};

export type CurrencyProps = {
  currentCurrency: Currency;
  currencies: Currency[];
  winText: string;
};

export type ActionsProps = {
  onPlay: () => void;
  onAutoPlay: (selection?: number[], callback?: () => void) => void;
  onCashout: () => void;
};

export type PlaySettingsProps = {
  isPlaying: boolean;
  canCashout: boolean;
  disabledController: boolean;
  displayController: boolean;
  showAutoPlayToast: (props: {
    type: "success" | "error" | "warning" | "info";
    message: string;
  }) => void;
  playHook: () => {
    playLimits?: PlayLimits;
    playAmount: number;
    setPlayAmount: (value: number) => void;
  };
  autoPlayDelay?: number;
};

export type PlayControllerProps = StylingProps &
  ActionsProps & {
    currencyOptions: CurrencyProps;
    playOptions: PlaySettingsProps;
  };

export const PLAY_HALVE = 0.5;
export const PLAY_DOUBLE = 2;
