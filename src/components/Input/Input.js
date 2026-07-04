import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledInput } from './Input.styled';
export default React.forwardRef(function Input({ onChange, placeholder, value, className, type, step, spellCheck, autoFocus, error, width, backgroundcolor, inputMode, }, ref) {
    return (_jsx(StyledInput, { onChange: onChange, placeholder: placeholder, value: value, className: className, type: type, step: step, spellCheck: spellCheck, autoFocus: autoFocus, error: error, width: width, backgroundcolor: backgroundcolor, inputMode: inputMode }));
});
