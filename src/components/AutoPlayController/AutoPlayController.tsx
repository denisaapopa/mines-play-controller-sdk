import { sendSetUserCurrencyEvent } from "@enigma-lake/zoot-platform-sdk";
import { useState, useRef } from "react";

import GroupRow from "../base/GroupRow/GroupRow";
import InputWithIcon from "../base/InputWithIcon/InputWithIcon";
import SelectMenu from "../base/SelectMenu";
import Button from "../base/Button";

import { useGameState } from "../GameState/GameStateContext";
import { PLAY_DOUBLE, PLAY_HALVE } from "../types/playController";

import styles_group from "../base/GroupRow/GroupRow.module.scss";
import styles_form from "./AutoPlayController.module.scss";
import { Input } from "../base";

const AUTO_STOP_DELAY = 1000;

const AutoPlayController = () => {
  const {
    config,
    setNumberOfPlays,
    numberOfPlays,
    setPlayedRounds,
    playedRounds,
    selection,
    isAutoPlaying,
    setIsAutoPlaying,
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
  const [forceStop, setForceStop] = useState(false);

  const stopAutoplay = () => {
    if (playIntervalRef.current) {
      clearTimeout(playIntervalRef.current);
      playIntervalRef.current = null;
    }

    setForceStop(true);
    setIsAutoPlaying(false);

    setTimeout(() => {
      setPlayedRounds(0);
      setForceStop(false);
    }, AUTO_STOP_DELAY);
  };

  const loopRounds = (currentPlayedRounds: number, remainingPlays: number) => {
    if (forceStop || remainingPlays <= 0) {
      return stopAutoplay();
    }

    if (!isAutoPlaying) {
      setIsAutoPlaying(true);
    }

    setPlayedRounds(currentPlayedRounds + 1);
    setNumberOfPlays((prev) => Math.max(prev - 1, 0));

    config.onAutoPlay(selection, () => {
      playIntervalRef.current = setTimeout(
        () => loopRounds(currentPlayedRounds + 1, remainingPlays - 1),
        autoPlayDelay,
      );
    });
  };

  const handlePlay = () => {
    if (disabledController || selection.length === 0) {
      showToast?.({
        type: "info",
        message: "Please select at least one tile to start autoplay.",
      });
      return;
    }

    loopRounds(playedRounds, numberOfPlays);
  };

  const canStopAutoplay =
    (isAutoPlaying && (numberOfPlays === 0 || playedRounds < numberOfPlays)) ||
    forceStop;

  return (
    <>
      <GroupRow className={styles_group.group}>
        <Input
          className={styles_group.groupItem}
          value={numberOfPlays}
          type="number"
          onChange={(e) => setNumberOfPlays(Number(e.currentTarget.value))}
          placeholder="Number of Plays"
          min={0}
          disabled={disabledController || isAutoPlaying}
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        />
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
          disabled={disabledController || isAutoPlaying}
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          <SelectMenu
            currencies={currencies}
            selectedCurrency={currentCurrency}
            setSelectedCurrency={sendSetUserCurrencyEvent}
            disabled={disabledController || isAutoPlaying}
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
          disabled={disabledController || isAutoPlaying}
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
          disabled={disabledController || isAutoPlaying}
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          +
        </Button>
      </GroupRow>

      {canStopAutoplay ? (
        <Button
          disabled={!isAutoPlaying}
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
          disabled={disabledController || isAutoPlaying || forceStop}
          className={styles_form.buttonSweeps}
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
