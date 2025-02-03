import { Switch as HeadlessSwitch } from "@headlessui/react";
import { Fragment } from "react";
import cx from "classnames";
import styles from "./Switch.module.scss";

export const Switch = ({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: () => void;
}) => {
  return (
    <label htmlFor="material-switch">
      <HeadlessSwitch checked={enabled} onChange={setEnabled} as={Fragment}>
        {({ checked, disabled }) => (
          <div className={cx(styles.base)}>
            <span> Manual</span>
            <div
              className={cx(
                styles.switcher,
                checked ? styles.blue : styles.gray,
                disabled && styles.disabled,
              )}
            >
              <span
                className={cx(styles.thumb, checked && styles["move-right"])}
              />
            </div>
            <span> Auto</span>
          </div>
        )}
      </HeadlessSwitch>
    </label>
  );
};
