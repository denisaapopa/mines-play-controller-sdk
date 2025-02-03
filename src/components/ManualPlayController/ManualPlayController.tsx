import {
  Currency,
  sendSetUserCurrencyEvent,
} from "@enigma-lake/zoot-platform-sdk";
import { ChangeEvent, FocusEvent } from "react";

import GroupRow from "../base/GroupRow/GroupRow";
import InputWithIcon from "../base/InputWithIcon/InputWithIcon";
import SelectMenu from "../base/SelectMenu";
import Button from "../base/Button";

import { useGameState } from "../GameState/GameStateContext";
import { PLAY_DOUBLE, PLAY_HALVE } from "../types/playController";

import styles_group from "../base/GroupRow/GroupRow.module.scss";
import styles_form from "./ManualPlayController.module.scss";

const ManualPlayController = () => {
  const { config } = useGameState();
  const { currentCurrency, currencies, winText } = config.currencyOptions;
  const { isPlaying, canCashout, disabledController, playHook } =
    config.playOptions;

  const { playAmount, playLimits, setPlayAmount } = playHook?.();
  const minPlayAmount = playLimits?.[currentCurrency].limits.min ?? 0;
  const maxPlayAmount = playLimits?.[currentCurrency].limits.max ?? 0;

  const backgroundColorHex = config.inputStyle?.backgroundColorHex ?? "#ffff";
  const textColorHex = config.inputStyle?.textColorHex ?? "#ffff";

  const isDisabled = () => disabledController || isPlaying;

  const adjustPlayAmount = (multiplier: number) => {
    if (isDisabled()) {
      return;
    }
    const newAmount = Math.max(
      minPlayAmount,
      Math.min(playAmount * multiplier, maxPlayAmount),
    );
    setPlayAmount(Number(newAmount.toFixed(2)));
  };

  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled()) {
      return;
    }
    setPlayAmount(Number(event.currentTarget.value));
  };

  const onBlurAmount = (event: FocusEvent<HTMLInputElement>) => {
    if (isDisabled()) {
      return;
    }
    const newAmount = Number(event.currentTarget.value);
    setPlayAmount(Math.max(minPlayAmount, Math.min(newAmount, maxPlayAmount)));
  };

  const isValidPlayAmount =
    playAmount >= minPlayAmount && playAmount <= maxPlayAmount;

  return (
    <>
      <GroupRow className={styles_group.group}>
        <InputWithIcon
          className={styles_group.groupItem}
          value={playAmount}
          type="number"
          onClear={() => !isDisabled() && setPlayAmount(minPlayAmount)}
          onChange={onChangeAmount}
          onBlur={onBlurAmount}
          placeholder={minPlayAmount.toString()}
          max={maxPlayAmount}
          min={minPlayAmount}
          disabled={isDisabled()}
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          <SelectMenu
            currencies={currencies}
            selectedCurrency={currentCurrency}
            setSelectedCurrency={sendSetUserCurrencyEvent}
            disabled={isDisabled()}
            backgroundColorHex={backgroundColorHex}
            textColorHex={textColorHex}
          />
        </InputWithIcon>
        <Button
          className={styles_group.groupItem}
          onClick={() => adjustPlayAmount(PLAY_HALVE)}
          theme="ghost"
          disabled={isDisabled()}
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          <span className={styles_form.x2}>-</span>
        </Button>
        <Button
          className={styles_group.groupItem}
          onClick={() => adjustPlayAmount(PLAY_DOUBLE)}
          theme="ghost"
          disabled={isDisabled()}
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          <span className={styles_form.x2}>+</span>
        </Button>
      </GroupRow>

      {canCashout ? (
        <Button
          disabled={disabledController || !isPlaying}
          className={styles_form.buttonCashout}
          onClick={config.onCashout}
          theme="primary"
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          Cashout {winText}
        </Button>
      ) : (
        <Button
          disabled={isDisabled() || !isValidPlayAmount}
          className={
            currentCurrency === Currency.GOLD
              ? styles_form.buttonGold
              : styles_form.buttonSweeps
          }
          onClick={config.onPlay}
          theme="primary"
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          Play now
        </Button>
      )}
    </>
  );
};

export default ManualPlayController;
