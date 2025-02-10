import { Currency } from "@enigma-lake/zoot-platform-sdk";

import Button from "../base/Button";
import { usePlayController } from "../hooks/usePlayController";
import { useInteractivePlayState } from "../InteractivePlayState/InteractivePlayStateContext";
import PlayAmountControl from "../base/PlayController/PlayController";

import styles_ui from "../InteractivePlayState/UI.module.scss";

const ManualPlayController = () => {
  const { config } = useInteractivePlayState();
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
          className={styles_ui.buttonCashout}
          onClick={config.onCashout}
        >
          Cashout {config.currencyOptions.winText}
        </Button>
      ) : (
        <Button
          disabled={isDisabled() || !isValidPlayAmount}
          className={
            currentCurrency === Currency.GOLD
              ? styles_ui.buttonGold
              : styles_ui.buttonSweeps
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
