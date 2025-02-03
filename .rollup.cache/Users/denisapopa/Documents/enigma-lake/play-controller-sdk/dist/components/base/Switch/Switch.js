import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { Fragment } from "react";
import cx from "classnames";
import styles from "./Switch.module.scss";
export const Switch = ({ enabled, setEnabled }) => {
    return (_jsx("label", { htmlFor: "material-switch", children: _jsx(HeadlessSwitch, { checked: enabled, onChange: setEnabled, as: Fragment, children: ({ checked, disabled }) => (_jsxs("button", { className: cx(styles.base, checked ? styles.blue : styles.gray, disabled && styles.disabled), children: [_jsx("span", { className: cx('size-4 rounded-full bg-white transition', checked ? 'translate-x-6' : 'translate-x-1') }), _jsx("span", { className: "sr-only", children: "Auto" })] })) }) }));
};
//# sourceMappingURL=Switch.js.map