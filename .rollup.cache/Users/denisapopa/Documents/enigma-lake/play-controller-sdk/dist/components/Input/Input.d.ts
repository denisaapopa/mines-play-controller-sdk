import React from "react";
declare type ValueOf<T> = T[keyof T];
export declare const types: {
    readonly text: "text";
    readonly password: "password";
    readonly number: "number";
    readonly htmlNumber: "htmlNumber";
    readonly email: "email";
    readonly integer: "integer";
};
export type Type = ValueOf<typeof types>;
export type Props = React.ComponentProps<"input"> & {
    backgroundColorHex: string;
    textColorHex: string;
};
declare const Input: ({ className, onChange, type, backgroundColorHex, textColorHex, ...restProps }: Props) => import("react/jsx-runtime").JSX.Element;
export default Input;
