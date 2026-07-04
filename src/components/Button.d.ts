import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children: ReactNode;
}
declare const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps>;
export default Button;
