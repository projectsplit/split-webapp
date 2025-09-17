import { forwardRef, useRef, useEffect } from 'react';

interface AutoWidthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  category?: "Amounts" | "Shares" | "Percentages";
  isText?: boolean;
}

const AutoWidthInput = forwardRef<HTMLInputElement, AutoWidthInputProps>(
  ({ value, style, category, onChange, isText, ...restProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (typeof ref === "function") {
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
        const newWidth = textRef.current.offsetWidth + 1;
        inputRef.current.style.width = `${newWidth}px`;
      }
    }, [value]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (isText && onChange) return onChange(e);

  if (category === "Amounts") {
    if (onChange) {
      onChange(e);
    }
    return;
  }

  let inputValue = e.target.value.replace(/[,]/g, '.'); // Replace comma with dot
  const isValid = /^-?\d*\.?\d*$/.test(inputValue);
  if (!isValid && inputValue !== "") return;

  if (category === "Shares" || category === "Percentages") {
    const parts = inputValue.split(".");
    if (parts[1] && parts[1].length > 2) {
      inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
      e.target.value = inputValue;
    }

    if (category === "Shares") {
      const integerPart = parts[0].replace(/^-/, "");
      if (integerPart && integerPart.length > 6) {
        const decimalPart = parts[1] ? `.${parts[1].slice(0, 2)}` : "";
        inputValue = `${integerPart.slice(0, 6)}${decimalPart}`;
        e.target.value = inputValue;
      } else if (parseFloat(inputValue) < 0) {
        inputValue = "";
        e.target.value = inputValue;
      }
    }
  }

  if (onChange) {
    onChange(e);
  }
};

    return (
      <div style={{ display: "inline-block", position: "relative" }}>
        <span
          ref={textRef}
          style={{
            ...style,
            visibility: "hidden",
            whiteSpace: "pre",
            position: "absolute",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
          }}
        >
          {value || " "}
        </span>
        <input
          {...restProps}
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={isText ? "" : "0"}
          style={{
            ...style,
            borderRadius: "0",
            boxSizing: "border-box",
            padding: "0",
            border: "0",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
            width: "0px",
            height: "inherit",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            minWidth: "10px",
          }}
        />
      </div>
    );
  }
);

export default AutoWidthInput;