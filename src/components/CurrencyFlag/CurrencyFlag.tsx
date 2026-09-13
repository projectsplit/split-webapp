import { currencyData } from '../../helpers/openExchangeRates';
import { StyledCurrencyFlag } from './CurrencyFlag.styled';

interface CurrencyFlagProps {
  code: string | undefined;
}

export default function CurrencyFlag({ code }: CurrencyFlagProps) {
  const flagClass = code
    ? currencyData.find((currency) => currency.symbol === code)?.flagClass
    : undefined;

  if (!flagClass) return null;

  return (
    <StyledCurrencyFlag
      className={`${flagClass.replace('ff-xl', 'ff-sm')} currencyFlag`}
    />
  );
}
