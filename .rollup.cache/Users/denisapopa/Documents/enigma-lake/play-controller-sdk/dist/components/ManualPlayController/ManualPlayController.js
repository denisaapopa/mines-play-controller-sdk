import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Currency, sendSetUserCurrencyEvent, } from "@enigma-lake/zoot-platform-sdk";
import GroupRow from "../base/GroupRow/GroupRow";
import InputWithIcon from "../base/InputWithIcon/InputWithIcon";
import SelectMenu from "../base/SelectMenu";
import Button from "../base/Button";
import { useGameState } from "../GameState/GameStateContext";
import { PLAY_DOUBLE, PLAY_HALVE } from "../types/playController";
import styles_group from "../base/GroupRow/GroupRow.module.scss";
import styles_form from './ManualPlayController.module.scss';
const ManualPlayController = () => {
    const { config } = useGameState();
    const { currentCurrency, currencies, winText } = config.currencyOptions;
    const { isPlaying, canCashout, disabledController, playHook } = config.playOptions;
    const { playAmount, playLimits, setPlayAmount } = playHook?.();
    const minPlayAmount = playLimits?.[currentCurrency].limits.min ?? 0;
    const maxPlayAmount = playLimits?.[currentCurrency].limits.max ?? 0;
    const backgroundColorHex = config.inputStyle?.backgroundColorHex ?? "#ffff";
    const textColorHex = config.inputStyle?.textColorHex ?? "#ffff";
    const onMinusClick = () => {
        if (disabledController) {
            return;
        }
        const newPlayAmount = Number((playAmount * PLAY_HALVE).toFixed(2));
        setPlayAmount(Math.max(newPlayAmount, minPlayAmount));
    };
    const onPlusClick = () => {
        if (disabledController) {
            return;
        }
        const newPlayAmount = Number((playAmount * PLAY_DOUBLE).toFixed(2));
        setPlayAmount(Math.min(newPlayAmount, maxPlayAmount));
    };
    const onClearAmountClick = () => {
        if (disabledController) {
            return;
        }
        setPlayAmount(minPlayAmount);
    };
    const onChangeAmount = (event) => {
        if (disabledController) {
            return;
        }
        setPlayAmount(Number(event.currentTarget.value));
    };
    const onBlurAmount = (event) => {
        if (disabledController) {
            return;
        }
        const newPlayAmount = Number(event.currentTarget.value);
        if (newPlayAmount < minPlayAmount) {
            setPlayAmount(minPlayAmount);
        }
        else if (newPlayAmount > maxPlayAmount) {
            setPlayAmount(maxPlayAmount);
        }
        else {
            setPlayAmount(newPlayAmount);
        }
    };
    const validatePlayAmount = (amount) => {
        return amount >= minPlayAmount && amount <= maxPlayAmount;
    };
    return (_jsxs(_Fragment, { children: [_jsxs(GroupRow, { className: styles_group.group, children: [_jsx(InputWithIcon, { className: styles_group.groupItem, value: playAmount, type: "number", onClear: onClearAmountClick, onChange: onChangeAmount, onBlur: onBlurAmount, placeholder: minPlayAmount.toString(), max: maxPlayAmount, min: minPlayAmount, disabled: disabledController || isPlaying, backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: _jsx(SelectMenu, { currencies: currencies, selectedCurrency: currentCurrency, setSelectedCurrency: sendSetUserCurrencyEvent, disabled: disabledController || isPlaying, backgroundColorHex: backgroundColorHex, textColorHex: textColorHex }) }), _jsx(Button, { className: styles_group.groupItem, onClick: onMinusClick, theme: "ghost", disabled: disabledController || isPlaying, backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: _jsx("span", { className: styles_form.x2, children: "-" }) }), _jsx(Button, { className: styles_group.groupItem, onClick: onPlusClick, theme: "ghost", disabled: disabledController || isPlaying, backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: _jsx("span", { className: styles_form.x2, children: "+" }) })] }), canCashout ? (_jsxs(Button, { disabled: disabledController || !isPlaying, className: styles_form.buttonCashout, onClick: config.onCashout, theme: "primary", backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: ["Cashout ", winText] })) : (_jsx(Button, { disabled: disabledController || isPlaying ||
                    !validatePlayAmount(playAmount), className: currentCurrency === Currency.GOLD
                    ? styles_form.buttonGold
                    : styles_form.buttonSweeps, onClick: () => config.onPlay(), theme: "primary", backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: "Play now" }))] }));
};
export default ManualPlayController;
//# sourceMappingURL=ManualPlayController.js.map