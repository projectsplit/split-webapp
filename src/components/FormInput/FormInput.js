import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useRef } from 'react';
import { StyledInput } from './FormInput.styled';
const FormInput = forwardRef(({ description, error, ...props }, ref) => {
    const inputRef = useRef();
    if (ref && typeof ref === 'object' && ref.current) {
        inputRef.current = ref.current;
    }
    const handleFocus = () => {
        if (ref && typeof ref === 'object' && ref.current) {
            setTimeout(() => {
                const length = ref.current?.value.length || 0;
                ref.current?.setSelectionRange(length, length);
            }, 0);
        }
    };
    return (_jsxs(StyledInput, { "$hasError": !!error, children: [_jsx("div", { className: "input-container", children: _jsx("input", { ...props, ref: ref, onFocus: handleFocus, defaultValue: props.defaultValue }) }), _jsxs("div", { className: "meta", children: [description && _jsx("span", { className: "description", children: description }), error && _jsx("span", { className: "error", children: error })] })] }));
});
export default FormInput;
