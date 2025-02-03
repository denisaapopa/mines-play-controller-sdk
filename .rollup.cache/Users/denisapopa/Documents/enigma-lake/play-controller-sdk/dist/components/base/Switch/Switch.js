import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { Fragment } from "react";
import cx from "classnames";
import styles from "./Switch.module.scss";
export const Switch = ({ enabled, setEnabled, }) => {
    return (_jsx("label", { htmlFor: "material-switch", children: _jsx(HeadlessSwitch, { checked: enabled, onChange: setEnabled, as: Fragment, children: ({ checked, disabled }) => (_jsxs("div", { className: cx(styles.base), children: [_jsx("span", { children: " Manual" }), _jsx("div", { className: cx(styles.switcher, checked ? styles.blue : styles.gray, disabled && styles.disabled), children: _jsx("span", { className: cx(styles.thumb, checked && styles["move-right"]) }) }), _jsx("span", { children: " Auto" })] })) }) }));
};
//# sourceMappingURL=Switch.js.map