import { FaAngleDown } from 'react-icons/fa';
import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
import { StyledCurrencySelector } from './CurrencySelector.styled';

interface CurrencySelectorProps {
  code: string | undefined;
  onClick: () => void;
}

export default function CurrencySelector({
  code,
  onClick,
}: CurrencySelectorProps) {
  return (
    <StyledCurrencySelector className="currencySelector" onClick={onClick}>
      <CurrencyFlag code={code} />
      <span className="currencyCode">{code}</span>
      <FaAngleDown className="angleDown" />
    </StyledCurrencySelector>
  );
}
