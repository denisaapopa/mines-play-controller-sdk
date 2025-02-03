import { jsx as _jsx } from "react/jsx-runtime";
import cx from "classnames";
import { hexToRgb } from "../../utils";
import styles from "./Button.module.scss";
export const themes = {
    primary: "primary",
    success: "success",
    ghost: "ghost",
};
const DEFAULT_THEME = themes.primary;
const Button = ({ backgroundColorHex, textColorHex, ...props }) => {
    return (_jsx("button", { ...props, className: cx(styles.base, styles[`base__theme-${props.theme ?? DEFAULT_THEME}`], props.disabled && styles[`base__state-disabled`], props.className), style: {
            "--bg-color-rgb": hexToRgb(backgroundColorHex),
            "--text-color-hex": textColorHex,
        } }));
};
Button.themes = themes;
Button.defaultTheme = DEFAULT_THEME;
export default Button;
//# sourceMappingURL=Button.js.map