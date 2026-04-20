import type { IconType } from 'react-icons';
import { TechnicalInput } from '../TechnicalInput/TechnicalInput';
import { Select, TrailingIcon } from './SelectField.styled';

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: IconType;
  accent?: 'primary' | 'error' | 'error-soft';
}

export const SelectField = ({
  value,
  onChange,
  options,
  icon: Icon,
  accent,
}: SelectFieldProps) => {
  return (
    <TechnicalInput accent={accent}>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
      {Icon && (
        <TrailingIcon>
          <Icon />
        </TrailingIcon>
      )}
    </TechnicalInput>
  );
};
