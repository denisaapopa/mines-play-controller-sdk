import {
  Currency,
  sendSetUserCurrencyEvent,
} from "@enigma-lake/zoot-platform-sdk";
import { useRef } from "react";
import cx from "classnames";

import GroupRow from "../base/GroupRow/GroupRow";
import InputWithIcon from "../base/InputWithIcon/InputWithIcon";
import SelectMenu from "../base/SelectMenu";
import Button from "../base/Button";

import { useInteractivePlayState } from "../InteractivePlayState/InteractivePlayStateContext";
import { PLAY_DOUBLE, PLAY_HALVE } from "../../types/playController";
import { AUTO_PLAY_STATE } from "../../types/gameMode";

import styles_group from "../base/GroupRow/GroupRow.module.scss";
import styles_ui from "../InteractivePlayState/UI.module.scss";

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
  } = useInteractivePlayState();
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
      <GroupRow>
        <InputWithIcon
          className={styles_group.groupItem}
          value={playAmount}
          type="number"
          onChange={(e) => setPlayAmount(Number(e.currentTarget.value))}
          placeholder={minPlayAmount.toString()}
          max={maxPlayAmount}
          min={minPlayAmount}
          currency={currentCurrency}
          label="Play Amount"
          disabled={
            disabledController || autoplayState === AUTO_PLAY_STATE.PLAYING
          }
        >
          <SelectMenu
            currencies={currencies}
            selectedCurrency={currentCurrency}
            setSelectedCurrency={sendSetUserCurrencyEvent}
            disabled={
              disabledController || autoplayState === AUTO_PLAY_STATE.PLAYING
            }
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
        >
          <span className={styles_group.x2}>-</span>
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
        >
          <span className={cx(styles_group.x2, styles_group.last)}>+</span>
        </Button>
      </GroupRow>

      {autoplayState === AUTO_PLAY_STATE.PLAYING ? (
        <Button
          disabled={autoplayState !== AUTO_PLAY_STATE.PLAYING}
          className={styles_ui.buttonCashout}
          onClick={stopAutoplay}
        >
          Stop Autoplay
        </Button>
      ) : (
        <Button
          disabled={disabledController}
          className={
            currentCurrency === Currency.GOLD
              ? styles_ui.buttonGold
              : styles_ui.buttonSweeps
          }
          onClick={handlePlay}
        >
          Start Autoplay
        </Button>
      )}
    </>
  );
};

export default AutoPlayController;
