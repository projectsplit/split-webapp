import React, { useRef, useEffect, forwardRef } from "react";

interface AutoWidthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  category?: "Amounts" | "Shares" | "Percentages";
}

const AutoWidthInput = forwardRef<HTMLInputElement, AutoWidthInputProps>(
  ({ value, style, category, onChange, ...restProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (typeof ref === "function") {
        ref(inputRef.current);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current =
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
        const newWidth = textRef.current.offsetWidth + 1; // Add a small buffer
        inputRef.current.style.width = `${newWidth}px`;
      }
    }, [value]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      // Allow empty string, digits, decimal point, and optional negative sign
      const isValid = /^-?\d*\.?\d*$/.test(inputValue);
      if (!isValid && inputValue !== "") return; // Ignore invalid input

      // For Shares and Percentages, limit to two decimal places during input
      if (category === "Shares" || category === "Percentages") {
        const parts = inputValue.split(".");
        if (parts[1] && parts[1].length > 2) {
          // Truncate to two decimal places
          inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
          e.target.value = inputValue;
        }

        // For Shares, limit the integer part to six digits (max 999999)
        if (category === "Shares") {
          const integerPart = parts[0].replace(/^-/, ""); // Remove negative sign for validation
          if (integerPart && integerPart.length > 6) {
            // Clamp to six digits, preserving decimal part if present
            const decimalPart = parts[1] ? `.${parts[1].slice(0, 2)}` : "";
            inputValue = `${integerPart.slice(0, 6)}${decimalPart}`;
            e.target.value = inputValue;
          } else if (parseFloat(inputValue) < 0) {
            // Prevent negative values for Shares
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
          placeholder="0"
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
