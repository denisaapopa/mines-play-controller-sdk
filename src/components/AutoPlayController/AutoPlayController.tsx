import {
  Currency,
  sendSetUserCurrencyEvent,
} from "@enigma-lake/zoot-platform-sdk";
import { useRef } from "react";

import GroupRow from "../base/GroupRow/GroupRow";
import InputWithIcon from "../base/InputWithIcon/InputWithIcon";
import SelectMenu from "../base/SelectMenu";
import Button from "../base/Button";

import { useGameState } from "../GameState/GameStateContext";
import { PLAY_DOUBLE, PLAY_HALVE } from "../../types/playController";

import styles_group from "../base/GroupRow/GroupRow.module.scss";
import styles_form from "./AutoPlayController.module.scss";
import { AUTO_PLAY_STATE } from "../../types/gameMode";

const AUTO_STOP_DELAY = 1000;

const AutoPlayController = () => {
  const {
    config,
    setNumberOfPlays,
    numberOfPlays,
    setPlayedRounds,
    playedRounds,
    selection,
    setAutoplayState,
    autoplayState,
  } = useGameState();
  const { currentCurrency, currencies } = config.currencyOptions;
  const {
    disabledController,
    playHook,
    showToast,
    autoPlayDelay = 1500,
  } = config.playOptions;

  const { playAmount, playLimits, setPlayAmount } = playHook?.() ?? {};
  const minPlayAmount = playLimits?.[currentCurrency]?.limits.min ?? 0;
  const maxPlayAmount = playLimits?.[currentCurrency]?.limits.max ?? 0;

  const { backgroundColorHex = "#ffff", textColorHex = "#ffff" } =
    config.inputStyle ?? {};

  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoplayActiveRef = useRef(false);

  const stopAutoplay = () => {
    isAutoplayActiveRef.current = false;
    if (playIntervalRef.current) {
      clearTimeout(playIntervalRef.current);
      playIntervalRef.current = null;
    }

    setAutoplayState(AUTO_PLAY_STATE.SELECTING);

    setTimeout(() => {
      setPlayedRounds(0);
    }, AUTO_STOP_DELAY);
  };

  const loopRounds = (currentPlayedRounds: number, remainingPlays: number) => {
    if (!isAutoplayActiveRef.current) {
      return;
    }

    if (remainingPlays < 1 || numberOfPlays === 0) {
      setNumberOfPlays(Infinity);
      stopAutoplay();
      return;
    }

    setPlayedRounds(currentPlayedRounds + 1);
    setNumberOfPlays((prev) => Math.max(prev - 1, 0));

    config.onAutoPlay(selection, () => {
      if (!isAutoplayActiveRef.current) {
        return;
      }

      playIntervalRef.current = setTimeout(
        () => loopRounds(currentPlayedRounds + 1, remainingPlays - 1),
        autoPlayDelay,
      );
    });
  };

  const handlePlay = () => {
    if (disabledController) {
      return;
    }

    if (selection.length === 0) {
      showToast?.({
        type: "info",
        message: "Please select at least one tile to start autoplay.",
      });
      return;
    }

    isAutoplayActiveRef.current = true;
    setAutoplayState(AUTO_PLAY_STATE.PLAYING);

    loopRounds(playedRounds, numberOfPlays);
  };

  return (
    <>
      <GroupRow className={styles_group.group}>
        <InputWithIcon
          className={styles_group.groupItem}
          value={numberOfPlays === Infinity ? 0 : numberOfPlays}
          type="number"
          onChange={(e) => setNumberOfPlays(Number(e.currentTarget.value))}
          placeholder="Number of Plays"
          min={0}
          disabled={
            disabledController || autoplayState === AUTO_PLAY_STATE.PLAYING
          }
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          {numberOfPlays === Infinity ? (
            <svg
              fill="currentColor"
              viewBox="0 0 64 64"
              className={styles_group.svg_icon}
            >
              <path d="M47.746 15.695c-9.287 0-13.851 7.073-17.908 13.345-4.377 6.752-7.473 10.836-13.531 10.836a7.846 7.846 0 0 1-7.847-7.847 7.845 7.845 0 0 1 7.847-7.846 9.29 9.29 0 0 1 6.915 2.669l1.014-1.549c1.094-1.708 2.349-3.602 3.79-5.524a17.365 17.365 0 0 0-11.743-4.084h.024C7.302 15.695 0 22.998 0 32.002 0 41.007 7.302 48.31 16.307 48.31c11.103 0 16.387-8.006 20.63-14.705 3.79-5.872 6.352-9.448 10.81-9.448a7.846 7.846 0 0 1 7.846 7.846 7.846 7.846 0 0 1-7.847 7.847 9.27 9.27 0 0 1-5.791-1.78l.027.018a65.172 65.172 0 0 1-5.047 6.937l.082-.104a17.38 17.38 0 0 0 10.358 3.392c.113 0 .225 0 .334-.003h-.016C56.698 48.31 64 41.007 64 32.002c0-9.004-7.302-16.307-16.307-16.307h.053Z"></path>
            </svg>
          ) : null}
        </InputWithIcon>
      </GroupRow>

      <GroupRow className={styles_group.group}>
        <InputWithIcon
          className={styles_group.groupItem}
          value={playAmount}
          type="number"
          onChange={(e) => setPlayAmount(Number(e.currentTarget.value))}
          placeholder={minPlayAmount.toString()}
          max={maxPlayAmount}
          min={minPlayAmount}
          disabled={
            disabledController || autoplayState === AUTO_PLAY_STATE.PLAYING
          }
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          <SelectMenu
            currencies={currencies}
            selectedCurrency={currentCurrency}
            setSelectedCurrency={sendSetUserCurrencyEvent}
            disabled={
              disabledController || autoplayState === AUTO_PLAY_STATE.PLAYING
            }
            backgroundColorHex={backgroundColorHex}
            textColorHex={textColorHex}
          />
        </InputWithIcon>

        <Button
          className={styles_group.groupItem}
          onClick={() =>
            setPlayAmount(Math.max(playAmount * PLAY_HALVE, minPlayAmount))
          }
          theme="ghost"
          disabled={
            disabledController || autoplayState === AUTO_PLAY_STATE.PLAYING
          }
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          -
        </Button>

        <Button
          className={styles_group.groupItem}
          onClick={() =>
            setPlayAmount(Math.min(playAmount * PLAY_DOUBLE, maxPlayAmount))
          }
          theme="ghost"
          disabled={
            disabledController || autoplayState === AUTO_PLAY_STATE.PLAYING
          }
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          +
        </Button>
      </GroupRow>

      {autoplayState === AUTO_PLAY_STATE.PLAYING ? (
        <Button
          disabled={autoplayState !== AUTO_PLAY_STATE.PLAYING}
          className={styles_form.buttonCashout}
          onClick={stopAutoplay}
          theme="primary"
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          Stop Playing
        </Button>
      ) : (
        <Button
          disabled={disabledController}
          className={
            currentCurrency === Currency.GOLD
              ? styles_form.buttonGold
              : styles_form.buttonSweeps
          }
          onClick={handlePlay}
          theme="primary"
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          Autoplay Now
        </Button>
      )}
    </>
  );
};

export default AutoPlayController;
