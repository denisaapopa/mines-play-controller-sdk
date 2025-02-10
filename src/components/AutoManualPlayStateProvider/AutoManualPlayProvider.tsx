import { ReactElement, useCallback, useState, useMemo } from "react";
import cx from "classnames";

import { AUTO_PLAY_STATE, GAME_MODE } from "../../types/gameMode";
import { PlayControllerProps } from "../../types/playController";
import { InputWithIcon } from "../base";

import AutoPlayController from "../base/AutoPlayController";
import ManualPlayController from "../base/ManualPlayController";

import styles_ui from "./UI.module.scss";
import {
  AutoManualPlayStateContext,
  AutoManualPlayStateContextType,
} from "./AutoManualPlayStateContext";
import { hexToRgb } from "../utils";

interface AutoManualPlayStateProviderProps {
  children:
    | React.ReactNode
    | ((state: AutoManualPlayStateContextType) => ReactElement);
  config: PlayControllerProps;
}

const AutoManualPlayProvider: React.FC<AutoManualPlayStateProviderProps> = ({
  children,
  config,
}) => {
  const [mode, setMode] = useState<GAME_MODE>(GAME_MODE.MANUAL);
  const [autoplayState, setAutoplayState] = useState<AUTO_PLAY_STATE>(
    AUTO_PLAY_STATE.IDLE,
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [playedRounds, setPlayedRounds] = useState(0);
  const [numberOfPlays, setNumberOfPlays] = useState(Infinity);
  const [selection, setSelection] = useState<number[]>([]);

  const startAutoplay = useCallback((numPlays: number) => {
    setMode(GAME_MODE.AUTOPLAY);
    setAutoplayState(AUTO_PLAY_STATE.SELECTING);
    setNumberOfPlays(numPlays);
    setPlayedRounds(0); // Reset when starting autoplay
  }, []);

  const stopAutoplay = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
    setIsAutoPlaying(false);
  }, []);

  const updateAutoplayState = useCallback(
    (newState: AUTO_PLAY_STATE) => setAutoplayState(newState),
    [],
  );

  const playManualMode = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
  }, []);

  const resetState = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
    setPlayedRounds(0);
    setNumberOfPlays(0);
    setSelection([]);
  }, []);

  const toggleMode = useCallback(() => {
    if (
      config.playOptions.isPlaying ||
      config.playOptions.disabledController ||
      autoplayState === AUTO_PLAY_STATE.PLAYING
    ) {
      return;
    }
    setNumberOfPlays(Infinity);
    setMode((prevMode) =>
      prevMode === GAME_MODE.MANUAL ? GAME_MODE.AUTOPLAY : GAME_MODE.MANUAL,
    );
  }, [autoplayState, config.playOptions]);

  const updateSelection = useCallback(
    (values: number[]) => {
      if (!isAutoPlaying) {
        setSelection(values);
      }
    },
    [isAutoPlaying],
  );

  const contextValue = useMemo(
    () => ({
      mode,
      config,
      manual: { playManualMode },
      autoPlay: {
        state: autoplayState,
        playedRounds,
        numberOfPlays,
        selection,
        isActive: isAutoPlaying,
        start: startAutoplay,
        stop: stopAutoplay,
        setSelection: updateSelection,
        updateState: updateAutoplayState,
        setIsActive: setIsAutoPlaying,
        setPlayedRounds,
        setNumberOfPlays,
        setState: setAutoplayState,
      },
      reset: resetState,
      toggleMode,
    }),
    [
      mode,
      config,
      playManualMode,
      autoplayState,
      playedRounds,
      numberOfPlays,
      selection,
      isAutoPlaying,
      startAutoplay,
      stopAutoplay,
      updateSelection,
      updateAutoplayState,
      resetState,
      toggleMode,
    ],
  );

  return (
    <AutoManualPlayStateContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}

      {config.playOptions.displayController && (
        <div
          className={cx(styles_ui.base, styles_ui.betForm)}
          style={
            {
              "--bet-bottom": config.panel.bottom,
              "--bet-panel-bg": hexToRgb(config.panel.bgColorHex ?? "#ffff"),
            } as React.CSSProperties
          }
        >
          <InputWithIcon
            value={numberOfPlays === Infinity ? 0 : numberOfPlays}
            type="number"
            onChange={(e) => setNumberOfPlays(Number(e.currentTarget.value))}
            placeholder="Number of Plays"
            min={0}
            disabled={
              config.playOptions.disabledController ||
              autoplayState === AUTO_PLAY_STATE.PLAYING ||
              mode === GAME_MODE.MANUAL
            }
            currency={config.currencyOptions.currentCurrency}
            switcherConfig={{
              onSwitch: toggleMode,
              isPlaying: isAutoPlaying || config.playOptions.isPlaying,
              enabled: mode !== GAME_MODE.MANUAL,
              currency: config.currencyOptions.currentCurrency,
              disabled:
                config.playOptions.disabledController ||
                autoplayState === AUTO_PLAY_STATE.PLAYING,
            }}
          >
            <span
              className={cx({
                [styles_ui.disabled]:
                  mode !== GAME_MODE.AUTOPLAY ||
                  numberOfPlays !== Infinity ||
                  autoplayState === AUTO_PLAY_STATE.PLAYING,
              })}
            >{`∞`}</span>
          </InputWithIcon>

          {mode === GAME_MODE.MANUAL ? (
            <ManualPlayController />
          ) : (
            <AutoPlayController />
          )}
        </div>
      )}
    </AutoManualPlayStateContext.Provider>
  );
};

export default AutoManualPlayProvider;
