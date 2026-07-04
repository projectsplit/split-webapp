import React from 'react';
import { MyButtonVariant } from './StyledMyButton';
interface SpinnerProps {
    variant: string;
}
export declare const Spinner: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, SpinnerProps>> & string;
declare const MyButton: ({ children, variant, disabled, isLoading, hasFailed, onClick, fontSize, style, }: MyButtonProps) => import("react/jsx-runtime").JSX.Element;
export default MyButton;
interface MyButtonProps {
    variant?: MyButtonVariant;
    disabled?: boolean;
    isLoading?: boolean;
    hasFailed?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    primaryBackgroundColor?: string;
    fontSize?: string;
    style?: React.CSSProperties;
}
