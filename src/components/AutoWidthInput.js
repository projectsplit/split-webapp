import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useRef, useEffect } from 'react';
const AutoWidthInput = forwardRef(({ value, style, category, onChange, isText, ...restProps }, ref) => {
    const inputRef = useRef(null);
    const textRef = useRef(null);
    useEffect(() => {
        if (typeof ref === 'function') {
            ref(inputRef.current);
        }
        else if (ref) {
            ref.current =
                inputRef.current;
        }
    }, [ref]);
    const handleFocus = () => {
        if (inputRef.current) {
            setTimeout(() => {
                const length = inputRef.current?.value.length || 0;
                inputRef.current?.setSelectionRange(length, length);
            }, 0);
        }
    };
    useEffect(() => {
        if (textRef.current && inputRef.current) {
            const newWidth = textRef.current.offsetWidth + 1;
            inputRef.current.style.width = `${newWidth}px`;
        }
    }, [value]);
    const handleChange = (e) => {
        if (isText && onChange)
            return onChange(e);
        if (category === 'Amounts') {
            if (onChange) {
                onChange(e);
            }
            return;
        }
        let inputValue = e.target.value.replace(/[,]/g, '.'); // Replace comma with dot
        const isValid = /^-?\d*\.?\d*$/.test(inputValue);
        if (!isValid && inputValue !== '')
            return;
        if (category === 'Shares' || category === 'Percentages') {
            const parts = inputValue.split('.');
            if (parts[1] && parts[1].length > 2) {
                inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
                e.target.value = inputValue;
            }
            if (category === 'Shares') {
                const integerPart = parts[0].replace(/^-/, '');
                if (integerPart && integerPart.length > 6) {
                    const decimalPart = parts[1] ? `.${parts[1].slice(0, 2)}` : '';
                    inputValue = `${integerPart.slice(0, 6)}${decimalPart}`;
                    e.target.value = inputValue;
                }
                else if (parseFloat(inputValue) < 0) {
                    inputValue = '';
                    e.target.value = inputValue;
                }
            }
        }
        if (onChange) {
            onChange(e);
        }
    };
    return (_jsxs("div", { style: { display: 'inline-block', position: 'relative' }, children: [_jsx("span", { ref: textRef, style: {
                    ...style,
                    visibility: 'hidden',
                    whiteSpace: 'pre',
                    position: 'absolute',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    lineHeight: 'inherit',
                }, children: value || ' ' }), _jsx("input", { ...restProps, ref: inputRef, type: "text", value: value, onChange: handleChange, onFocus: handleFocus, placeholder: isText ? '' : '0', style: {
                    ...style,
                    borderRadius: '0',
                    boxSizing: 'border-box',
                    padding: '0',
                    border: '0',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    lineHeight: 'inherit',
                    width: '0px',
                    height: 'inherit',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    minWidth: '10px',
                } })] }));
});
export default AutoWidthInput;
