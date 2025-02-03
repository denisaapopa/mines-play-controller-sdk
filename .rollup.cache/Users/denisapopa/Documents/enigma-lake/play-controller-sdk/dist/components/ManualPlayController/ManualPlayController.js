import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Currency, sendSetUserCurrencyEvent, } from "@enigma-lake/zoot-platform-sdk";
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
    const { isPlaying, canCashout, disabledController, playHook } = config.playOptions;
    const { playAmount, playLimits, setPlayAmount } = playHook?.();
    const minPlayAmount = playLimits?.[currentCurrency].limits.min ?? 0;
    const maxPlayAmount = playLimits?.[currentCurrency].limits.max ?? 0;
    const backgroundColorHex = config.inputStyle?.backgroundColorHex ?? "#ffff";
    const textColorHex = config.inputStyle?.textColorHex ?? "#ffff";
    const isDisabled = () => disabledController || isPlaying;
    const adjustPlayAmount = (multiplier) => {
        if (isDisabled()) {
            return;
        }
        const newAmount = Math.max(minPlayAmount, Math.min(playAmount * multiplier, maxPlayAmount));
        setPlayAmount(Number(newAmount.toFixed(2)));
    };
    const onChangeAmount = (event) => {
        if (isDisabled()) {
            return;
        }
        setPlayAmount(Number(event.currentTarget.value));
    };
    const onBlurAmount = (event) => {
        if (isDisabled()) {
            return;
        }
        const newAmount = Number(event.currentTarget.value);
        setPlayAmount(Math.max(minPlayAmount, Math.min(newAmount, maxPlayAmount)));
    };
    const isValidPlayAmount = playAmount >= minPlayAmount && playAmount <= maxPlayAmount;
    return (_jsxs(_Fragment, { children: [_jsxs(GroupRow, { className: styles_group.group, children: [_jsx(InputWithIcon, { className: styles_group.groupItem, value: playAmount, type: "number", onClear: () => !isDisabled() && setPlayAmount(minPlayAmount), onChange: onChangeAmount, onBlur: onBlurAmount, placeholder: minPlayAmount.toString(), max: maxPlayAmount, min: minPlayAmount, disabled: isDisabled(), backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: _jsx(SelectMenu, { currencies: currencies, selectedCurrency: currentCurrency, setSelectedCurrency: sendSetUserCurrencyEvent, disabled: isDisabled(), backgroundColorHex: backgroundColorHex, textColorHex: textColorHex }) }), _jsx(Button, { className: styles_group.groupItem, onClick: () => adjustPlayAmount(PLAY_HALVE), theme: "ghost", disabled: isDisabled(), backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: _jsx("span", { className: styles_form.x2, children: "-" }) }), _jsx(Button, { className: styles_group.groupItem, onClick: () => adjustPlayAmount(PLAY_DOUBLE), theme: "ghost", disabled: isDisabled(), backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: _jsx("span", { className: styles_form.x2, children: "+" }) })] }), canCashout ? (_jsxs(Button, { disabled: disabledController || !isPlaying, className: styles_form.buttonCashout, onClick: config.onCashout, theme: "primary", backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: ["Cashout ", winText] })) : (_jsx(Button, { disabled: isDisabled() || !isValidPlayAmount, className: currentCurrency === Currency.GOLD
                    ? styles_form.buttonGold
                    : styles_form.buttonSweeps, onClick: config.onPlay, theme: "primary", backgroundColorHex: backgroundColorHex, textColorHex: textColorHex, children: "Play now" }))] }));
};
export default ManualPlayController;
//# sourceMappingURL=ManualPlayController.js.map