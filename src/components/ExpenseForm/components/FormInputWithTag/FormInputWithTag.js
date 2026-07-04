import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useRef } from 'react';
import { StyledFormInputWithTag, StyledInput } from './FormInputWithTag.styled';
import { FaTags } from 'react-icons/fa';
const FormInput = forwardRef(({ description, labelMenuIsOpen, error, ...props }, ref) => {
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
    return (_jsxs(StyledFormInputWithTag, { "$hasError": !!error, children: [_jsxs("div", { className: "labelIconAndInputField", children: [_jsx(StyledInput, { "$hasError": !!error, children: _jsx("div", { className: "input-container", children: _jsx("input", { className: "input", ...props, ref: ref, onFocus: handleFocus, defaultValue: props.defaultValue }) }) }), _jsx("div", { className: "labelSelectorWrapper", children: _jsxs("div", { className: "labelSelector", onClick: () => (labelMenuIsOpen.value = true), children: [_jsx(FaTags, { className: "tagIcon" }), "Labels"] }) })] }), _jsx("div", { className: "meta", children: error && _jsx("span", { className: "error", children: error }) })] }));
});
export default FormInput;
