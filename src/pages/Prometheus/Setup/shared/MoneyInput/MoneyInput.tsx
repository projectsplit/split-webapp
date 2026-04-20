import { TechnicalInput } from '../TechnicalInput/TechnicalInput';
import { Prefix, AmountInput, Suffix } from './MoneyInput.styled';

interface MoneyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  currencyLabel?: string;
  currencySymbol?: string;
  accent?: 'primary' | 'error' | 'error-soft';
  mutedPrefix?: boolean;
  inputType?: 'number' | 'text';
}

export const MoneyInput = ({
  value,
  onChange,
  placeholder = '0.00',
  size = 'md',
  currencyLabel = 'USD',
  currencySymbol = '$',
  accent,
  mutedPrefix,
  inputType = 'number',
}: MoneyInputProps) => {
  const pad = size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md';

  return (
    <TechnicalInput accent={accent} pad={pad}>
      <Prefix $size={size} $muted={mutedPrefix}>
        {currencySymbol}
      </Prefix>
      <AmountInput
        $size={size}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {currencyLabel && <Suffix $size={size}>{currencyLabel}</Suffix>}
    </TechnicalInput>
  );
};
