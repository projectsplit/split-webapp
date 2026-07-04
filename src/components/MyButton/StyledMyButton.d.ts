export declare const StyledMyButton: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, StyledMyButtonProps>> & string;
declare const buttonVariants: {
    readonly primary: {
        readonly background: "#f0f0f0";
        readonly color: "#2d2d2d";
        readonly hover: "#a3a3a3";
        readonly active: "#a3a3a3";
    };
    readonly secondary: {
        readonly background: "#2d2d2d";
        readonly color: "#f0f0f0";
        readonly hover: "#1a1b1d";
        readonly active: "#1a1b1d";
    };
};
export type MyButtonVariant = keyof typeof buttonVariants;
export interface StyledMyButtonProps {
    variant: MyButtonVariant;
    disabled?: boolean;
    isLoading?: boolean;
    hasFailed?: boolean;
    fontSize?: string;
    style?: React.CSSProperties;
}
export {};
