import { Currency } from "@enigma-lake/zoot-platform-sdk";

import PlayAmountControl from "../PlayController/PlayController";
import { usePlayController } from "../../hooks/usePlayController";
import { useAutoManualPlayState } from "../../AutoManualPlayStateProvider/AutoManualPlayStateContext";
import Button from "../Button";

import styles_button from "../Button/Button.module.scss";

const ManualPlayController = () => {
  const { config } = useAutoManualPlayState();
  const {
    currentCurrency,
    currencies,
    playAmount,
    minPlayAmount,
    maxPlayAmount,
    isValidPlayAmount,
    adjustPlayAmount,
    onChangeAmount,
    onBlurAmount,
    manualPlay: { isDisabled, onPlay, canCashout },
  } = usePlayController();

  return (
    <>
      <PlayAmountControl
        playAmount={playAmount}
        minPlayAmount={minPlayAmount}
        maxPlayAmount={maxPlayAmount}
        isDisabled={isDisabled}
        adjustPlayAmount={adjustPlayAmount}
        onChangeAmount={onChangeAmount}
        onBlurAmount={onBlurAmount}
        currentCurrency={currentCurrency}
        currencies={currencies}
      />

      {canCashout ? (
        <Button
          disabled={
            config.playOptions.disabledController ||
            !config.playOptions.isPlaying
          }
          className={styles_button.buttonCashout}
          onClick={config.onCashout}
        >
          Cashout {config.currencyOptions.winText}
        </Button>
      ) : (
        <Button
          disabled={isDisabled() || !isValidPlayAmount}
          className={
            currentCurrency === Currency.GOLD
              ? styles_button.buttonGold
              : styles_button.buttonSweeps
          }
          onClick={onPlay}
        >
          Play now
        </Button>
      )}
    </>
  );
};

export default ManualPlayController;
