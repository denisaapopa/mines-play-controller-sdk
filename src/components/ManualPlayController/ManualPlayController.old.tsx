import {
  Currency,
  sendSetUserCurrencyEvent,
} from "@enigma-lake/zoot-platform-sdk";
import { ChangeEvent, FocusEvent } from "react";
import cx from "classnames";

import GroupRow from "../base/GroupRow/GroupRow";
import InputWithIcon from "../base/InputWithIcon/InputWithIcon";
import SelectMenu from "../base/SelectMenu";
import Button from "../base/Button";

import { useInteractivePlayState } from "../InteractivePlayState/InteractivePlayStateContext";
import { PLAY_DOUBLE, PLAY_HALVE } from "../../types/playController";

import styles_group from "../base/GroupRow/GroupRow.module.scss";
import styles_ui from "../InteractivePlayState/UI.module.scss";

const ManualPlayController = () => {
  const { config } = useInteractivePlayState();
  const { currentCurrency, currencies, winText } = config.currencyOptions;
  const { isPlaying, canCashout, disabledController, playHook } =
    config.playOptions;

  const { playAmount, playLimits, setPlayAmount } = playHook?.();
  const minPlayAmount = playLimits?.[currentCurrency].limits.min ?? 0;
  const maxPlayAmount = playLimits?.[currentCurrency].limits.max ?? 0;

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
      <GroupRow>
        <InputWithIcon
          className={styles_group.groupItem}
          value={playAmount}
          type="number"
          onChange={onChangeAmount}
          onBlur={onBlurAmount}
          placeholder={minPlayAmount.toString()}
          max={maxPlayAmount}
          min={minPlayAmount}
          disabled={isDisabled()}
          currency={currentCurrency}
          label="Play Amount"
        >
          <SelectMenu
            currencies={currencies}
            selectedCurrency={currentCurrency}
            setSelectedCurrency={sendSetUserCurrencyEvent}
            disabled={isDisabled()}
          />
        </InputWithIcon>
        <Button
          className={styles_group.groupItem}
          onClick={() => adjustPlayAmount(PLAY_HALVE)}
          theme="ghost"
          disabled={isDisabled()}
        >
          <span className={styles_group.x2}>-</span>
        </Button>
        <Button
          className={styles_group.groupItem}
          onClick={() => adjustPlayAmount(PLAY_DOUBLE)}
          theme="ghost"
          disabled={isDisabled()}
        >
          <span className={cx(styles_group.x2, styles_group.last)}>+</span>
        </Button>
      </GroupRow>

      {canCashout ? (
        <Button
          disabled={disabledController || !isPlaying}
          className={styles_ui.buttonCashout}
          onClick={config.onCashout}
        >
          Cashout {winText}
        </Button>
      ) : (
        <Button
          disabled={isDisabled() || !isValidPlayAmount}
          className={
            currentCurrency === Currency.GOLD
              ? styles_ui.buttonGold
              : styles_ui.buttonSweeps
          }
          onClick={config.onPlay}
        >
          Play now
        </Button>
      )}
    </>
  );
};

export default ManualPlayController;
