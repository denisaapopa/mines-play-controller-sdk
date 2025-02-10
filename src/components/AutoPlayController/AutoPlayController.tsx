import { Currency } from "@enigma-lake/zoot-platform-sdk";

import Button from "../base/Button";
import { usePlayController } from "../hooks/usePlayController";
import { AUTO_PLAY_STATE } from "../../types/gameMode";
import PlayAmountControl from "../base/PlayController/PlayController";

import styles_ui from "../InteractivePlayState/UI.module.scss";

const AutoPlayController = () => {
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
    autoPlay: { isDisabled, state, onPlay, onStopPlay },
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

      {state === AUTO_PLAY_STATE.PLAYING ? (
        <Button
          disabled={state !== AUTO_PLAY_STATE.PLAYING}
          className={styles_ui.buttonCashout}
          onClick={onStopPlay}
        >
          Stop Autoplay
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
          Start Autoplay
        </Button>
      )}
    </>
  );
};

export default AutoPlayController;
