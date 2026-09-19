import { forwardRef } from 'react';
import { StyledInput } from './FormInput.styled';
import { caretToEndOnFocus } from '@/helpers/caretToEndOnFocus';

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ description, error, ...props }, ref) => {
    return (
      <StyledInput $hasError={!!error}>
        <div className="input-container">
          <input
            {...props}
            ref={ref}
            onFocus={caretToEndOnFocus(ref)}
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
