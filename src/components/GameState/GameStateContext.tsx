import { useContext } from "react";
import { createContext } from "react";

import { GAME_MODE, AUTO_PLAY_STATE } from "../types/gameMode";
import { PlayControllerProps } from "../types/playController";

export interface GameStateContextType {
    mode: GAME_MODE;
    autoplayState: AUTO_PLAY_STATE;
    playedRounds: number;
    numberOfPlays: number;
    config: PlayControllerProps;
    selection: number[];
    isAutoPlaying: boolean;
    setIsAutoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    startAutoplay: (numberOfPlays: number) => void;
    stopAutoplay: () => void;
    playManualMode: () => void;
    changeAutoplayState: (newState: AUTO_PLAY_STATE.SELECTING | AUTO_PLAY_STATE.PLAYING) => void;
    resetState: () => void;
    toggleMode: () => void;
    setAutoplayState: React.Dispatch<React.SetStateAction<AUTO_PLAY_STATE>>
    setPlayedRounds:  React.Dispatch<React.SetStateAction<number>>;
    setNumberOfPlays:  React.Dispatch<React.SetStateAction<number>>;
    setSelection: (values: number[]) => void;
}

export const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const useGameState = () => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error("useGameState must be used within a GameStateProvider");
    }
    return context;
};
