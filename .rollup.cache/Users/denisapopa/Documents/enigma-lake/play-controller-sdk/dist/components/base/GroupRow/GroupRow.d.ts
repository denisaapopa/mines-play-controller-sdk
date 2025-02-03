import { ComponentProps } from "react";
export type Props = ComponentProps<"div"> & {
    label?: string;
};
declare const GroupRow: ({ className, children, label, ...restProps }: Props) => import("react/jsx-runtime").JSX.Element;
export default GroupRow;
