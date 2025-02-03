import { ComponentProps, PropsWithChildren } from "react";
export type Props = PropsWithChildren<ComponentProps<"input">> & {
    classNames?: {
        input?: string;
        icon?: string;
    };
    onClear?: () => void;
    withClear?: boolean;
    backgroundColorHex: string;
    textColorHex: string;
};
declare const InputWithIcon: ({ children, className, classNames, onClear, backgroundColorHex, textColorHex, ...restProps }: Props) => import("react/jsx-runtime").JSX.Element;
export default InputWithIcon;
