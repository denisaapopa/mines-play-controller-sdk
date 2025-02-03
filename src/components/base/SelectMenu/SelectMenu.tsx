import { Currency } from "@enigma-lake/zoot-platform-sdk";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import React from "react";

import styles from "./SelectMenu.module.scss";

import { hexToRgb } from "../../utils";

interface ISelectMenuProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: { currency: Currency }) => void;
  textColorHex?: string;
  backgroundColorHex?: string;
  disabled?: boolean;
}

const SelectMenu = ({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
  textColorHex,
  backgroundColorHex,
  disabled = false,
}: ISelectMenuProps) => {
  const handleOnChange = (newCurrency: Currency) => {
    if (disabled) {
      return;
    }
    setSelectedCurrency({ currency: newCurrency });
  };

  return (
    <Listbox value={selectedCurrency} onChange={handleOnChange}>
      <ListboxButton
        className={styles.button}
        style={
          {
            "--bg-color-rgb": hexToRgb(backgroundColorHex ?? "#ffffff"),
            "--text-color-hex": textColorHex ?? "#ffffff",
          } as React.CSSProperties
        }
      >
        <div className={styles[`${selectedCurrency}_icon`]} />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke={textColorHex ?? "#ffffff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ListboxButton>
      <ListboxOptions
        anchor="right end"
        className={styles.menu}
        style={
          {
            "--bg-color-rgb": hexToRgb(backgroundColorHex ?? "#ffffff"),
            "--text-color-hex": textColorHex ?? "#ffffff",
          } as React.CSSProperties
        }
      >
        {currencies.map((option) => (
          <ListboxOption
            key={option}
            value={option}
            className={styles.menu_item}
          >
            <div className={styles[`${option}_icon`]} />
            <div className={styles.menu_name}>{option}</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default SelectMenu;
