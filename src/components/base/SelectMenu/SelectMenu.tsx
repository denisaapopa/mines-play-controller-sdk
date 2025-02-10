import cx from "classnames";
import { Currency } from "@enigma-lake/zoot-platform-sdk";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { GoldIcon } from "./GoldIcon";
import { SweepsIcon } from "./SweepsIcon";
import styles from "./SelectMenu.module.scss";

interface ISelectMenuProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: { currency: Currency }) => void;
  disabled?: boolean;
}

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      className={styles.arrow}
      d="M6 9L12 15L18 9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const getIcon = (option: Currency) =>
  option === Currency.SWEEPS ? <SweepsIcon /> : <GoldIcon />;

const SelectMenu = ({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
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
        className={cx(styles.button, { [styles.disabled]: disabled })}
      >
        {getIcon(selectedCurrency)}
        <ArrowIcon />
      </ListboxButton>
      <ListboxOptions anchor="right end" className={styles.menu}>
        {currencies.map((option) => (
          <ListboxOption
            key={option}
            value={option}
            className={cx(styles.menu_item, {
              [styles.selected]: selectedCurrency === option,
            })}
          >
            {getIcon(option)}
            <div className={cx(styles.menu_name)}>{option}</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default SelectMenu;
