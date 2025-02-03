import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import styles from "./SelectMenu.module.scss";
import { hexToRgb } from "../../utils";
const SelectMenu = ({ currencies, selectedCurrency, setSelectedCurrency, textColorHex, backgroundColorHex, disabled = false, }) => {
    const handleOnChange = (newCurrency) => {
        if (disabled) {
            return;
        }
        setSelectedCurrency({ currency: newCurrency });
    };
    return (_jsxs(Listbox, { value: selectedCurrency, onChange: handleOnChange, children: [_jsxs(ListboxButton, { className: styles.button, style: {
                    "--bg-color-rgb": hexToRgb(backgroundColorHex ?? "#ffffff"),
                    "--text-color-hex": textColorHex ?? "#ffffff",
                }, children: [_jsx("div", { className: styles[`${selectedCurrency}_icon`] }), _jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M6 9L12 15L18 9", stroke: textColorHex ?? "#ffffff", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })] }), _jsx(ListboxOptions, { anchor: "right end", className: styles.menu, style: {
                    "--bg-color-rgb": hexToRgb(backgroundColorHex ?? "#ffffff"),
                    "--text-color-hex": textColorHex ?? "#ffffff",
                }, children: currencies.map((option) => (_jsxs(ListboxOption, { value: option, className: styles.menu_item, children: [_jsx("div", { className: styles[`${option}_icon`] }), _jsx("div", { className: styles.menu_name, children: option })] }, option))) })] }));
};
export default SelectMenu;
//# sourceMappingURL=SelectMenu.js.map