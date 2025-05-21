import { forwardRef, useRef } from "react";
import { StyledInput } from "./FormInput.styled";

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
      <StyledInput $hasError={!!error}>
        <div className="input-container">
          <input
            {...props}
            ref={ref}
            onFocus={handleFocus}
            defaultValue={props.defaultValue}
          />
        </div>
        <div className="meta">
          {description && <span className="description">{description}</span>}
          {error && <span className="error">{error}</span>}
        </div>
      </StyledInput>
    );
  }
);

export default FormInput;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  error?: string;
}
