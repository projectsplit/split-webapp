import { forwardRef } from 'react';
import { caretToEndOnFocus } from '@/helpers/caretToEndOnFocus';
import { StyledFormInputWithTag, StyledInput } from './FormInputWithTag.styled';
import { FaTags } from 'react-icons/fa';
import { Signal } from '@preact/signals-react';

const FormInputWithTag = forwardRef<HTMLInputElement, InputProps>(
  ({ description, labelMenuIsOpen, error, ...props }, ref) => {
    return (
      <StyledFormInputWithTag $hasError={!!error}>
        <div className="labelIconAndInputField">
          <StyledInput $hasError={!!error}>
            <div className="input-container">
              <input
                className="input"
                {...props}
                ref={ref}
                onFocus={caretToEndOnFocus(ref)}
                defaultValue={props.defaultValue}
              />
            </div>
          </StyledInput>
          <div className="labelSelectorWrapper">
            <div
              className="labelSelector"
              onClick={() => (labelMenuIsOpen.value = true)}
            >
              <FaTags className="tagIcon" />
              Labels
            </div>
          </div>
        </div>
        <div className="meta">
          {error && <span className="error">{error}</span>}
        </div>
      </StyledFormInputWithTag>
    );
  }
);

export default FormInputWithTag;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  error?: string;
  labelMenuIsOpen: Signal<boolean>;
}
