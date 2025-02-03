import { Switch as HeadlessSwitch } from "@headlessui/react";
import { Fragment } from "react";
import cx from "classnames";
import styles from "./Switch.module.scss";

export const Switch = ({ enabled, setEnabled }: { enabled: boolean; setEnabled: () => void }) => {
    return (
        <label htmlFor="material-switch">
            <HeadlessSwitch checked={enabled} onChange={setEnabled} as={Fragment}>
                {({ checked, disabled }) => (
                    <button

                        className={cx(
                            styles.base,
                            checked ? styles.blue : styles.gray,
                            disabled && styles.disabled
                        )}
                    >
                        <span
                            className={cx('size-4 rounded-full bg-white transition', checked ? 'translate-x-6' : 'translate-x-1')}
                        />
                        <span className="sr-only">Auto</span>
                    </button>
                )}</HeadlessSwitch>
        </label>

    )

}
