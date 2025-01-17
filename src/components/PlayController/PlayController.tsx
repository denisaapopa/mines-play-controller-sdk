import {
  Currency,
  sendSetUserCurrencyEvent,
} from "@enigma-lake/zoot-platform-sdk";
import React, { ChangeEvent, useState, FocusEvent, useEffect } from "react";
import cx from "classnames";

import GroupRow from "../GroupRow/GroupRow";
import InputWithIcon from "../InputWithIcon/InputWithIcon";
import SelectMenu from "../SelectMenu/SelectMenu";
import Button from "../Button/Button";
import styles_group from "./../GroupRow/GroupRow.module.scss";

import styles_form from "./PlayController.module.scss";
import styles_ui from './UI.module.scss';
import { PlayControllerProps } from "./types";

const BET_HALVE = 0.5;
const BET_DOUBLE = 2;

const PlayController = ({
  currencyOptions,
  playOptions,
  inputStyle,
  onPlay,
  onCashout
}: PlayControllerProps) => {
  const { currentCurrency, currencies, formatCurrency } = currencyOptions;
  const { winAmount = 0, isPlaying, canCashout, disabledController, playHook } = playOptions;

  const { playAmount, playLimits, setPlayAmount, availableBalance } = playHook();
  const minPlayAmount = playLimits?.[currentCurrency].limits.min ?? 0;
  const maxPlayAmount = playLimits?.[currentCurrency].limits.max ?? 0;

  const [tempPlayAmount, setTempPlayAmount] = useState(playAmount);

  useEffect(() => {
    setTempPlayAmount(minPlayAmount)
  }, [currentCurrency])


  const backgroundColorHex = inputStyle?.backgroundColorHex ?? "#ffff";
  const textColorHex = inputStyle?.textColorHex ?? "#ffff";

  const winText =
    currentCurrency === Currency.SWEEPS
      ? `${formatCurrency(winAmount, Currency.SWEEPS)} SC`
      : `${formatCurrency(winAmount, Currency.GOLD)} GC`;


  const onMinusClick = () => {
    const newPlayAmount = Number((playAmount * BET_HALVE).toFixed(2));
    setPlayAmount(Math.max(newPlayAmount, minPlayAmount));
    setTempPlayAmount(Math.max(newPlayAmount, minPlayAmount));
  };

  const onPlusClick = () => {
    const newPlayAmount = Number((playAmount * BET_DOUBLE).toFixed(2));
    setPlayAmount(Math.min(newPlayAmount, maxPlayAmount));
    setTempPlayAmount(Math.min(newPlayAmount, maxPlayAmount));
  };


  const onClearAmountClick = () => {
    if (disabledController) {
      return;
    }
    setTempPlayAmount(minPlayAmount);
    setPlayAmount(minPlayAmount);
  };

  const onChangeAmountClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabledController) {
      return;
    }
    setTempPlayAmount(Number(event.currentTarget.value));
  };

  const onBlurAmount = (event: FocusEvent<HTMLInputElement>) => {
    const newPlayAmount = Number(event.currentTarget.value);
    if (newPlayAmount < minPlayAmount) {
      setPlayAmount(minPlayAmount);
      setTempPlayAmount(minPlayAmount);
    } else if (newPlayAmount > maxPlayAmount) {
      setPlayAmount(maxPlayAmount);
      setTempPlayAmount(maxPlayAmount);
    } else if (newPlayAmount > availableBalance) {
      setPlayAmount(availableBalance);
      setTempPlayAmount(availableBalance);
    } else {
      setPlayAmount(newPlayAmount);
      setTempPlayAmount(newPlayAmount);

    }
  };

  const validatePlayAmount = (amount: number) => {
    return amount >= minPlayAmount && amount <= maxPlayAmount && amount <= availableBalance;
  };

  return (
    <div
      className={cx(
        styles_ui.base,
        styles_ui.betForm
      )}
      style={
        {
          "--bet-bottom": "50px",
        } as React.CSSProperties
      }
    >
      <GroupRow className={styles_ui.group}>
        <InputWithIcon
          className={styles_group.groupItem}
          value={tempPlayAmount}
          type="number"
          color="white"
          onClear={onClearAmountClick}
          onChange={onChangeAmountClick}
          onBlur={onBlurAmount}
          placeholder={minPlayAmount.toString()}
          max={maxPlayAmount}
          min={minPlayAmount}
          disabled={disabledController || isPlaying}
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          <SelectMenu
            currencies={currencies}
            selectedCurrency={currentCurrency}
            setSelectedCurrency={sendSetUserCurrencyEvent}
            disabled={disabledController || isPlaying}
            backgroundColorHex={backgroundColorHex}
            textColorHex={textColorHex}
          />
        </InputWithIcon>
        <Button
          className={styles_group.groupItem}
          onClick={onMinusClick}
          theme="ghost"
          disabled={disabledController || isPlaying}
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          <span className={styles_form.x2}>-</span>
        </Button>
        <Button
          className={styles_group.groupItem}
          onClick={onPlusClick}
          theme="ghost"
          disabled={disabledController || isPlaying}
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          <span className={styles_form.x2}>+</span>
        </Button>
      </GroupRow>

      {canCashout ? (
        <Button
          disabled={disabledController || !isPlaying}
          className={styles_form.placeBetCashout}
          onClick={onCashout}
          theme="primary"
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          Cashout {winText}
        </Button>
      ) : (
        <Button
          disabled={
            disabledController || isPlaying ||
            !validatePlayAmount(playAmount)
          }
          className={
            currentCurrency === Currency.GOLD
              ? styles_form.placeBetGold
              : styles_form.placeBetSweeps
          }
          onClick={onPlay}
          theme="primary"
          backgroundColorHex={backgroundColorHex}
          textColorHex={textColorHex}
        >
          Play now
        </Button>
      )}
    </div>
  );
};

export default PlayController;