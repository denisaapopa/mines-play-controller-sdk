import { ReactElement, useCallback, useState, useMemo } from "react";
import { GameStateContext, GameStateContextType } from "./GameStateContext";
import { AUTO_PLAY_STATE, GAME_MODE } from "../types/gameMode";
import { PlayControllerProps } from "../types/playController";

import styles_ui from "./UI.module.scss";
import ManualPlayController from "../ManualPlayController";
import AutoPlayController from "../AutoPlayController";
import cx from "classnames";
import { Switch } from "../base/Switch/Switch";

const GameStateProvider: React.FC<{
  children: React.ReactNode | ((state: GameStateContextType) => ReactElement);
  config: PlayControllerProps;
}> = ({ children, config }) => {
  // Game mode & autoplay state
  const [mode, setMode] = useState<GAME_MODE>(GAME_MODE.MANUAL);
  const [autoplayState, setAutoplayState] = useState<AUTO_PLAY_STATE>(
    AUTO_PLAY_STATE.IDLE,
  );

  // Play & selection state
  const [playedRounds, setPlayedRounds] = useState(0);
  const [selection, setSelection] = useState<number[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [numberOfPlays, setNumberOfPlays] = useState(Infinity);

  // Handlers
  const startAutoplay = useCallback((numPlays: number) => {
    setMode(GAME_MODE.AUTOPLAY);
    setAutoplayState(AUTO_PLAY_STATE.SELECTING);
    setNumberOfPlays(numPlays);
    setPlayedRounds(0); // Reset rounds when starting autoplay
  }, []);

  const stopAutoplay = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
  }, []);

  const playManualMode = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
  }, []);

  const changeAutoplayState = useCallback(
    (newState: AUTO_PLAY_STATE.SELECTING | AUTO_PLAY_STATE.PLAYING) =>
      setAutoplayState(newState),
    [],
  );

  const resetState = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
    setPlayedRounds(0);
    setNumberOfPlays(0);
  }, []);

  const toggleMode = () =>
    setMode((prevMode) =>
      prevMode === GAME_MODE.MANUAL ? GAME_MODE.AUTOPLAY : GAME_MODE.MANUAL,
    );

  const changeSelection = useCallback(
    (values: number[]) => {
      if (!isAutoPlaying) {
        setSelection(values);
      }
    },
    [isAutoPlaying],
  );

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      mode,
      isAutoPlaying,
      autoplayState,
      playedRounds,
      numberOfPlays,
      selection,
      config,
      setIsAutoPlaying,
      setAutoplayState,
      setPlayedRounds,
      setNumberOfPlays,
      setSelection: changeSelection,
      startAutoplay,
      stopAutoplay,
      playManualMode,
      changeAutoplayState,
      resetState,
      toggleMode,
    }),
    [
      mode,
      isAutoPlaying,
      autoplayState,
      playedRounds,
      numberOfPlays,
      selection,
      config,
      changeSelection,
      startAutoplay,
      stopAutoplay,
      playManualMode,
      changeAutoplayState,
      resetState,
    ],
  );

  return (
    <GameStateContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}

      {config.playOptions.displayController && (
        <div
          className={cx(styles_ui.base, styles_ui.betForm)}
          style={{ "--bet-bottom": "50px" } as React.CSSProperties}
        >
          <Switch enabled={mode !== GAME_MODE.MANUAL} setEnabled={toggleMode} />
          {mode === GAME_MODE.MANUAL ? (
            <ManualPlayController />
          ) : (
            <AutoPlayController />
          )}
        </div>
      )}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
