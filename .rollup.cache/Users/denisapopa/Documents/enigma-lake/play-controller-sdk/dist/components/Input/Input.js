import { jsx as _jsx } from "react/jsx-runtime";
import cx from "classnames";
import { cleanInputInteger } from "./cleanInputInteger";
import { cleanInputNumber } from "./cleanInputNumber";
import styles from "./Input.module.scss";
import { hexToRgb } from "../PlayController/utils";
export const types = {
    text: "text",
    password: "password",
    number: "number",
    htmlNumber: "htmlNumber",
    email: "email",
    integer: "integer",
};
const Input = ({ className, onChange, type, backgroundColorHex, textColorHex, ...restProps }) => {
    const handleChange = (() => {
        if (type === "number") {
            return function handleChangeNumber(event) {
                const { value } = event.target;
                event.target.value = cleanInputNumber(value);
                onChange?.(event);
            };
        }
        if (type === "integer") {
            return function handleChangeInteger(event) {
                const { value } = event.target;
                event.target.value = cleanInputInteger(value);
                onChange?.(event);
            };
        }
        return onChange;
    })();
    return (_jsx("input", { ...restProps, onChange: handleChange, className: cx(styles.base, className), style: {
            "--bg-color-rgb": hexToRgb(backgroundColorHex),
            "--text-color-hex": textColorHex,
        } }));
};
export default Input;
//# sourceMappingURL=Input.js.map