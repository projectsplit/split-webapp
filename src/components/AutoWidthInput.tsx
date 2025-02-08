import React, { useRef, useEffect, forwardRef } from 'react';

interface AutoWidthInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const AutoWidthInput = forwardRef<HTMLInputElement, AutoWidthInputProps>(
  ({ value, style, ...restProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
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
        const newWidth = textRef.current.offsetWidth + 1; // Add a small buffer
        inputRef.current.style.width = `${newWidth}px`;
      }
    }, [value]);

    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <span
          ref={textRef}
          style={{
            ...style,
            visibility: 'hidden',
            whiteSpace: 'pre',
            position: 'absolute',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit',
          }}
        >
          {value || ' '}
        </span>
        <input
          {...restProps}
          ref={inputRef}
          type="text"
          value={value}
          onFocus={handleFocus}
          style={{
            ...style,
            borderRadius: '0',
            boxSizing: 'border-box',
            padding: '0',
            border: '0',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit',
            width: '1px',
            height: 'inherit',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        />
      </div>
    );
  }
);

export default AutoWidthInput;