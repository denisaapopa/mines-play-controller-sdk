import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { sendSetUserCurrencyEvent, } from "@enigma-lake/zoot-platform-sdk";
import { useRef } from "react";
import GroupRow from "../base/GroupRow/GroupRow";
import InputWithIcon from "../base/InputWithIcon/InputWithIcon";
import SelectMenu from "../base/SelectMenu";
import Button from "../base/Button";
import { useGameState } from "../GameState/GameStateContext";
import { PLAY_DOUBLE, PLAY_HALVE } from "../types/playController";
import styles_group from "../base/GroupRow/GroupRow.module.scss";
import styles_form from "./AutoPlayController.module.scss";
import { Input } from "../base";
const AutoPlayController = () => {
    const { config, setNumberOfPlays, numberOfPlays, setPlayedRounds, playedRounds, selection, isAutoPlaying, setIsAutoPlaying, } = useGameState();
    const { currentCurrency, currencies } = config.currencyOptions;
    const { disabledController, playHook, showToast, autoPlayDelay = 1500 } = config.playOptions;
    const { playAmount, playLimits, setPlayAmount } = playHook?.();
    const minPlayAmount = playLimits?.[currentCurrency].limits.min ?? 0;
    const maxPlayAmount = playLimits?.[currentCurrency].limits.max ?? 0;
    const backgroundColorHex = config.inputStyle?.backgroundColorHex ?? "#ffff";
    const textColorHex = config.inputStyle?.textColorHex ?? "#ffff";
    const playIntervalRef = useRef(null);
    const handlePlay = () => {
        if (disabledController)
            return;
        if (selection.length === 0) {
            showToast({
                type: "info",
                message: "Please select at least one tile to start autoplay.",
            });
            return;
        }
        let currentPlayedRounds = playedRounds;
        let remainingPlays = numberOfPlays; // Track the decreasing value
        const loopRounds = () => {
            if (remainingPlays === 0 || currentPlayedRounds < remainingPlays) {
                if (!isAutoPlaying) {
                    setIsAutoPlaying(true);
                }
                currentPlayedRounds += 1;
                setPlayedRounds(currentPlayedRounds);
                if (numberOfPlays > 0) {
                    setNumberOfPlays((prev) => Math.max(prev - 1, 0)); // Decrease but not below 0
                }
                config.onAutoPlay(selection, () => {
                    playIntervalRef.current = setTimeout(loopRounds, autoPlayDelay);
                });
            }
            else {
                stopAutoplay();
            }
        };
        loopRounds();
    };
    const stopAutoplay = () => {
        if (playIntervalRef.current) {
            clearTimeout(playIntervalRef.current);
            playIntervalRef.current = null;
        }
        setIsAutoPlaying(false);
        setPlayedRounds(0);
    };
    const canStopAutoplay = isAutoPlaying && (numberOfPlays === 0 || playedRounds < numberOfPlays);
    return (_jsxs(_Fragment, { children: [_jsx(GroupRow, { className: styles_group.group, children: _jsx(Input, { className: styles_group.groupItem, value: numberOfPlays, type: "number", onChange: (e) => setNumberOfPlays(Number(e.currentTarget.value)), placeholder: "Number of Plays", min: 0, disabled: disabledController || isAutoPlaying, backgroundColorHex: backgroundColorHex, textColorHex: textColorHex }) }), _jsxs(GroupRow, { className: styles_group.group, children: [_jsx(InputWithIcon, { className: styles_group.groupItem, value: playAmount, type: "number", onChange: (e) => setPlayAmount(Number(e.currentTarget.value)), placeholder: minPlayAmount.toString(), max: maxPlayAmount, min: minPlayAmount, disabled: disabledController || isAutoPlaying, backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: _jsx(SelectMenu, { currencies: currencies, selectedCurrency: currentCurrency, setSelectedCurrency: sendSetUserCurrencyEvent, disabled: disabledController || isAutoPlaying, backgroundColorHex: backgroundColorHex, textColorHex: textColorHex }) }), _jsx(Button, { className: styles_group.groupItem, onClick: () => setPlayAmount(Math.max(playAmount * PLAY_HALVE, minPlayAmount)), theme: "ghost", disabled: disabledController || isAutoPlaying, backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: "-" }), _jsx(Button, { className: styles_group.groupItem, onClick: () => setPlayAmount(Math.min(playAmount * PLAY_DOUBLE, maxPlayAmount)), theme: "ghost", disabled: disabledController || isAutoPlaying, backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: "+" })] }), canStopAutoplay ? (_jsx(Button, { disabled: !isAutoPlaying, className: styles_form.buttonCashout, onClick: stopAutoplay, theme: "primary", backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: "Stop Playing" })) : (_jsx(Button, { disabled: disabledController || isAutoPlaying, className: styles_form.buttonSweeps, onClick: handlePlay, theme: "primary", backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: "Autoplay Now" }))] }));
};
export default AutoPlayController;
//# sourceMappingURL=AutoPlayController.js.map