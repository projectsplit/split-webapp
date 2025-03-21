import { forwardRef, useRef } from "react";
import { styled } from "styled-components";

const Input_old = forwardRef<HTMLInputElement, InputProps>(({ description, error, ...props }, ref) => {

  const inputRef = useRef<HTMLInputElement>();

  if (ref && typeof ref === "object" && ref.current) {
    inputRef.current = ref.current
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
});

export default Input_old;

const StyledInput = styled.div<{ $hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.layer2};
  border-radius: 8px;
  .input-container {
    border-radius: 8px;
    border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.errorColor : theme.lineColor)};
    padding: 0.5em 1em;
    transition: border-color 0.15s;

    &:focus-within {
      border-color: ${({ theme, $hasError }) => ($hasError ? theme.errorColor : theme.highlightColor)};
    }

    input {
      border: none;
      background: transparent;
      color: inherit;
      font: inherit;
      width: 100%;
      outline: none;
      padding: 0;

      &::placeholder {
        color: ${({ theme }) => theme.secondaryTextColor};
        opacity: 1;
      }
    }
  }

  .meta {
    display: flex;
    justify-content: space-between;
    padding: 0px 4px;
    font-size: 12px;
    background-color:  ${({ theme }) => theme.backgroundcolor};
   
    .description {
      color: ${({ theme }) => theme.secondaryTextColor};
    }

    .error {
      color: ${({ theme }) => theme.errorColor};
      font-weight: 400;
    }
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  error?: string;
}