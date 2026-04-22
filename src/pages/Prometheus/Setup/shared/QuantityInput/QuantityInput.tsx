import { TechnicalInput } from '../TechnicalInput/TechnicalInput';
import { Label, BaseInput } from './QuantityInput.styled';

interface QuantityInputProps {
  value: string | number;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: 'primary' | 'error' | 'error-soft';
  placeholder?: string;
  allowDecimal?: boolean;
}

const sanitize = (raw: string, allowDecimal: boolean): string => {
  if (!allowDecimal) return raw.replace(/[^0-9]/g, '');
  const cleaned = raw.replace(/[^0-9.]/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot === -1) return cleaned;
  const whole = cleaned.slice(0, firstDot + 1);
  const fraction = cleaned.slice(firstDot + 1).replace(/\./g, '').slice(0, 2);
  return whole + fraction;
};

export const QuantityInput = ({
  value,
  onChange,
  prefix,
  suffix,
  size = 'md',
  accent,
  placeholder,
  allowDecimal = false,
}: QuantityInputProps) => {
  return (
    <TechnicalInput accent={accent} pad={size === 'lg' ? 'md' : 'sm'}>
      {prefix && <Label $size={size} $muted>{prefix}</Label>}
      <BaseInput
        $size={size}
        type="text"
        inputMode={allowDecimal ? 'decimal' : 'numeric'}
        value={value}
        onChange={(e) => onChange(sanitize(e.target.value, allowDecimal))}
        placeholder={placeholder}
      />
      {suffix && <Label $size={size}>{suffix}</Label>}
    </TechnicalInput>
  );
};
