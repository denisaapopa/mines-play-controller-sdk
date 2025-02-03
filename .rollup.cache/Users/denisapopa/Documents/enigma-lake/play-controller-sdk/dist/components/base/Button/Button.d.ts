import React from "react";
export declare const themes: {
    primary: string;
    success: string;
    ghost: string;
};
export type Theme = (typeof themes)[keyof typeof themes];
export type Props = React.ComponentProps<"button"> & {
    theme?: Theme;
    backgroundColorHex: string;
    textColorHex: string;
};
declare const Button: {
    ({ backgroundColorHex, textColorHex, ...props }: Props): import("react/jsx-runtime").JSX.Element;
    themes: {
        primary: string;
        success: string;
        ghost: string;
    };
    defaultTheme: string;
};
export default Button;
