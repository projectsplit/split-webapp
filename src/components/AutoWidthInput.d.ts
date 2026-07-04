interface AutoWidthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    category?: 'Amounts' | 'Shares' | 'Percentages';
    isText?: boolean;
}
declare const AutoWidthInput: import("react").ForwardRefExoticComponent<AutoWidthInputProps & import("react").RefAttributes<HTMLInputElement>>;
export default AutoWidthInput;
