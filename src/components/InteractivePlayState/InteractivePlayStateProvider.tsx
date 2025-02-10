import { ReactElement, useCallback, useState, useMemo } from "react";
import cx from "classnames";

import ManualPlayController from "../ManualPlayController";
import AutoPlayController from "../AutoPlayController";
import { AUTO_PLAY_STATE, GAME_MODE } from "../../types/gameMode";
import { PlayControllerProps } from "../../types/playController";
import { InputWithIcon } from "../base";

import styles_ui from "./UI.module.scss";
import { hexToRgb } from "../utils";
import {
  InteractivePlayStateContext,
  InteractivePlayStateContextType,
} from "./InteractivePlayStateContext";

const InteractivePlayStateProvider: React.FC<{
  children:
    | React.ReactNode
    | ((state: InteractivePlayStateContextType) => ReactElement);
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

  const toggleMode = useCallback(() => {
    if (
      config.playOptions.isPlaying ||
      config.playOptions.disabledController ||
      autoplayState === AUTO_PLAY_STATE.PLAYING
    ) {
      return false;
    }
    setNumberOfPlays(Infinity);
    setMode((prevMode) =>
      prevMode === GAME_MODE.MANUAL ? GAME_MODE.AUTOPLAY : GAME_MODE.MANUAL,
    );
  }, [
    autoplayState,
    config.playOptions.disabledController,
    config.playOptions.isPlaying,
  ]);

  const changeSelection = useCallback(
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
      toggleMode,
    ],
  );

  const { backgroundColorHex = "#ffff", textColorHex = "#ffff" } =
    config.inputStyle ?? {};
  const { panelBackgroundColorHex = "#081E64", bottom = "15px" } =
    config.panel ?? {};

  return (
    <InteractivePlayStateContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}

      {config.playOptions.displayController && (
        <div
          className={cx(styles_ui.base, styles_ui.betForm)}
          // style={
          //   {
          //     "--bet-bottom": bottom,
          //     "--bet-panel-background": hexToRgb(panelBackgroundColorHex),
          //     "--bg-color-rgb": hexToRgb(backgroundColorHex),
          //     "--text-color-hex": hexToRgb(textColorHex),
          //   } as React.CSSProperties
          // }
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
    </InteractivePlayStateContext.Provider>
  );
};

export default InteractivePlayStateProvider;
