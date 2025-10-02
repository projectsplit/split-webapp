import { forwardRef, useRef } from "react";
import { StyledFormInput, StyledInput } from "./FormInput.styled";
import { FaTags } from "react-icons/fa";

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ description, error, ...props }, ref) => {
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
      <StyledFormInput $hasError={!!error}>
        <div className="labelIconAndInputField">
          <div className="labelSelectorWrapper">
            <div className="labelSelector" onClick={() => console.log("clicked")}>
              <FaTags className="tagIcon" />
            </div>
          </div>
          <StyledInput $hasError={!!error}>
            <div className="input-container">
              <input
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
      </StyledFormInput>
    );
  }
);

export default FormInput;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  error?: string;
}
