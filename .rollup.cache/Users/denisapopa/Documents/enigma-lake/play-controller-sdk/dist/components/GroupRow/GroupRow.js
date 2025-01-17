import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from "classnames";
import styles from "./GroupRow.module.scss";
const GroupRow = ({ className, children, label, ...restProps }) => {
    return (_jsxs("div", { ...restProps, className: cx(styles.base, className), children: [label && _jsx("div", { className: styles.label, children: label }), _jsx("div", { className: styles.group, children: children })] }));
};
export default GroupRow;
//# sourceMappingURL=GroupRow.js.map