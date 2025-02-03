import { Currency } from "@enigma-lake/zoot-platform-sdk";
interface ISelectMenuProps {
    currencies: Currency[];
    selectedCurrency: Currency;
    setSelectedCurrency: (currency: {
        currency: Currency;
    }) => void;
    textColorHex?: string;
    backgroundColorHex?: string;
    disabled?: boolean;
}
declare const SelectMenu: ({ currencies, selectedCurrency, setSelectedCurrency, textColorHex, backgroundColorHex, disabled, }: ISelectMenuProps) => import("react/jsx-runtime").JSX.Element;
export default SelectMenu;
