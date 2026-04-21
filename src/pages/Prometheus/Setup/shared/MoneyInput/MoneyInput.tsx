import { currencyMask } from '../../../../../helpers/currencyMask';
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
  inputType = 'text',
}: MoneyInputProps) => {
  const pad = size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md';

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ticker should be uppercase for currencyMask
    const ticker = (currencyLabel || 'USD').toUpperCase();
    const maskedEvent = currencyMask(e, ticker, value, false);
    onChange(maskedEvent.target.value);
  };

  return (
    <TechnicalInput accent={accent} pad={pad}>
      <Prefix $size={size} $muted={mutedPrefix}>
        {currencySymbol}
      </Prefix>
      <AmountInput
        $size={size}
        type={inputType}
        inputMode="decimal"
        placeholder={placeholder}
        value={value}
        onChange={handleAmountChange}
        spellCheck="false"
        autoComplete="off"
      />
      {currencyLabel && <Suffix $size={size}>{currencyLabel}</Suffix>}
    </TechnicalInput>
  );
};
