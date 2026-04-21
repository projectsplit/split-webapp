import { useMemo, useState } from 'react';
import { MdPayments, MdExpandMore } from 'react-icons/md';
import { MoneyInput } from '../../../shared/MoneyInput/MoneyInput';
import { SelectField } from '../../../shared/SelectField/SelectField';
import { ToggleSwitch } from '../../../shared/ToggleSwitch/ToggleSwitch';
import {
  CardWrapper,
  CardHeader,
  HeaderLeft,
  IconBox,
  Title,
  Subtitle,
  CardBody,
  Grid,
} from './NetSalaryCard.styled';

export const NetSalaryCard = () => {
  const [amount, setAmount] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [currency, setCurrency] = useState('Currency: USD');

  const currencyInfo = useMemo(() => {
    const s = currency.toLowerCase();
    if (s.includes('usd')) return { symbol: '$', label: 'USD' };
    if (s.includes('eur')) return { symbol: '€', label: 'EUR' };
    if (s.includes('gbp')) return { symbol: '£', label: 'GBP' };
    return { symbol: '$', label: 'USD' };
  }, [currency]);

  return (
    <CardWrapper>
      <CardHeader>
        <HeaderLeft>
          <IconBox>
            <MdPayments />
          </IconBox>
          <div>
            <Title>Annual Salary</Title>
            <Subtitle>Post-Tax</Subtitle>
          </div>
        </HeaderLeft>
        <ToggleSwitch
          checked={enabled}
          onChange={setEnabled}
          ariaLabel="Toggle Annual Salary"
        />
      </CardHeader>

      <CardBody>
        <MoneyInput
          value={amount}
          onChange={setAmount}
          placeholder="0.00"
          size="md"
          currencySymbol={currencyInfo.symbol}
          currencyLabel={currencyInfo.label}
        />
        <Grid>
          <SelectField
            value={currency}
            onChange={setCurrency}
            options={['Currency: USD', 'Currency: EUR', 'Currency: GBP']}
            icon={MdPayments}
          />
        </Grid>
      </CardBody>
    </CardWrapper>
  );
};
