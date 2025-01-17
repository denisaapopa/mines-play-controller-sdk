import cx from "classnames";
import React from "react";

import { cleanInputInteger } from "./cleanInputInteger";
import { cleanInputNumber } from "./cleanInputNumber";

import styles from "./Input.module.scss";
import { hexToRgb } from "../PlayController/utils";

declare type ValueOf<T> = T[keyof T];

export const types = {
  text: "text",
  password: "password",
  number: "number",
  htmlNumber: "htmlNumber",
  email: "email",
  integer: "integer",
} as const;

export type Type = ValueOf<typeof types>;

export type Props = React.ComponentProps<"input"> & {
  backgroundColorHex: string;
  textColorHex: string;
};

const  Input = ({ className, onChange, type, backgroundColorHex, textColorHex, ...restProps }: Props) => {
  const handleChange = (() => {
    if (type === "number") {
      return function handleChangeNumber(
        event: React.ChangeEvent<HTMLInputElement>
      ) {
        const { value } = event.target;
        event.target.value = cleanInputNumber(value);
        onChange?.(event);
      };
    }

    if (type === "integer") {
      return function handleChangeInteger(
        event: React.ChangeEvent<HTMLInputElement>
      ) {
        const { value } = event.target;
        event.target.value = cleanInputInteger(value);
        onChange?.(event);
      };
    }

    return onChange;
  })();
  return (
    <input
      {...restProps}
      onChange={handleChange}
      className={cx(styles.base, className)}
      style={
        {
          "--bg-color-rgb": hexToRgb(backgroundColorHex),
          "--text-color-hex": textColorHex,
        } as React.CSSProperties
      }
    />
  );
}

export default Input;
