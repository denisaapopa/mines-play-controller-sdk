import { ReactElement } from "react";
import { GameStateContextType } from "./GameStateContext";
import { PlayControllerProps } from "../types/playController";
declare const GameStateProvider: React.FC<{
    children: React.ReactNode | ((state: GameStateContextType) => ReactElement);
    config: PlayControllerProps;
}>;
export default GameStateProvider;
