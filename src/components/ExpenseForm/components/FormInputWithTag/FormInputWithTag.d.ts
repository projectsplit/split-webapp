import { Signal } from '@preact/signals-react';
declare const FormInput: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
export default FormInput;
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    description?: string;
    error?: string;
    labelMenuIsOpen: Signal<boolean>;
}
