import cx from "classnames";
import React, { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import styles from "./Button.module.scss";

const themes = {
  primary: "primary",
  success: "success",
  ghost: "ghost",
};

type Props = React.ComponentProps<"button"> & {
  theme?: (typeof themes)[keyof typeof themes];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  disabled,
  className = "",
  theme = "primary",
  onClick = () => {},
  ...props
}: Props) => {
  const debouncedOnClick = useDebouncedCallback(onClick, 20);

  const handleOnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      debouncedOnClick(event);
    },
    [debouncedOnClick],
  );

  return (
    <button
      {...props}
      className={cx(styles.base, styles[`base__theme-${theme}`], className, {
        [styles["base__state-disabled"]]: disabled,
      })}
      disabled={disabled}
      onClick={handleOnClick}
    />
  );
};

Button.themes = themes;

export default Button;
