import { Switch as HeadlessSwitch } from "@headlessui/react";
import { Fragment } from "react";
import cx from "classnames";
import styles from "./Switch.module.scss";

export const Switch = ({
  enabled,
  setEnabled,
  isPlaying,
}: {
  enabled: boolean;
  setEnabled: () => void;
  isPlaying: boolean;
}) => {
  return (
    <label htmlFor="material-switch">
      <HeadlessSwitch
        checked={enabled}
        onChange={setEnabled}
        as={Fragment}
        disabled={isPlaying}
      >
        <div className={cx(styles.base)}>
          <div
            className={cx(styles.switcher, enabled ? styles.blue : styles.gray)}
          >
            <span
              className={cx(styles.thumb, enabled && styles["move-right"])}
            />
          </div>

          <span>Auto</span>
        </div>
      </HeadlessSwitch>
    </label>
  );
};
