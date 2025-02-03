import cx from "classnames";
import React from 'react';

import { hexToRgb } from "../../utils";
import styles from "./Button.module.scss";


export const themes = {
  primary: "primary",
  success: "success",
  ghost: "ghost",
};

const DEFAULT_THEME = themes.primary;

export type Theme = (typeof themes)[keyof typeof themes];

export type Props = React.ComponentProps<"button"> & {
  theme?: Theme;
  backgroundColorHex: string;
  textColorHex: string;
};

 const Button = ({backgroundColorHex, textColorHex, ...props}: Props) => {
  return (
    <button
      {...props}
      className={cx(
        styles.base,
        styles[`base__theme-${props.theme ?? DEFAULT_THEME}`],
        props.disabled && styles[`base__state-disabled`],
        props.className
      )}
      style={
        {
          "--bg-color-rgb": hexToRgb(backgroundColorHex),
          "--text-color-hex": textColorHex,
        } as React.CSSProperties
      }
    />
  );
}

Button.themes = themes;
Button.defaultTheme = DEFAULT_THEME;

export default Button;