import { forwardRef, useRef } from "react";
import { StyledFormInputWithTag, StyledInput } from "./FormInputWithTag.styled";
import { FaTags } from "react-icons/fa";
import { Signal } from "@preact/signals-react";

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ description, labelMenuIsOpen, error, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>();

    if (ref && typeof ref === "object" && ref.current) {
      inputRef.current = ref.current;
    }

    const handleFocus = () => {
      if (ref && typeof ref === "object" && ref.current) {
        setTimeout(() => {
          const length = ref.current?.value.length || 0;
          ref.current?.setSelectionRange(length, length);
        }, 0);
      }
    };

    return (
      <StyledFormInputWithTag $hasError={!!error}>
        <div className="labelIconAndInputField">
          <div className="labelSelectorWrapper">
            <div
              className="labelSelector"
              onClick={() => (labelMenuIsOpen.value = true)}
            >
              <FaTags className="tagIcon" />
            </div>
          </div>
          <StyledInput $hasError={!!error}>
            <div className="input-container">
              <input
              className='input'
                {...props}
                ref={ref}
                onFocus={handleFocus}
                defaultValue={props.defaultValue}
              />
            </div>
          </StyledInput>
        </div>
        <div className="meta">
          {error && <span className="error">{error}</span>}
        </div>
      </StyledFormInputWithTag>
    );
  }
);

export default FormInput;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  error?: string;
  labelMenuIsOpen: Signal<boolean>;
}
