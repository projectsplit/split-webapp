import { useEffect, useMemo, useRef, useState } from 'react';
import { MdPayments, MdExpandMore } from 'react-icons/md';
import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';
import { MoneyInput } from '../../../shared/MoneyInput/MoneyInput';
import { SelectField } from '../../../shared/SelectField/SelectField';
import { ToggleSwitch } from '../../../shared/ToggleSwitch/ToggleSwitch';
import { QuantityInput } from '../../../shared/QuantityInput/QuantityInput';
import { LabeledField } from '../../../shared/LabeledField/LabeledField';
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

interface NetSalaryCardProps {
  setup: Signal<FinancialState>;
}

export const NetSalaryCard = ({ setup }: NetSalaryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const enabled = setup.value.risk_toggles.salary;
  
  const [amount, setAmount] = useState(
    setup.value.financials.net_salary
      ? setup.value.financials.net_salary.toLocaleString('en-US')
      : ''
  );

  useEffect(() => {
    const signalValue = setup.value.financials.net_salary;
    const currentLocalClean = Number(amount.replace(/,/g, ''));
    if (signalValue !== currentLocalClean) {
      setAmount(signalValue ? signalValue.toLocaleString('en-US') : '');
    }
  }, [setup.value.financials.net_salary]);

  const setEnabled = (next: boolean) => {
    setup.value = {
      ...setup.value,
      risk_toggles: { ...setup.value.risk_toggles, salary: next },
    };
  };

  const handleAmountChange = (next: string) => {
    setAmount(next);
    const parsed = Number(next.replace(/,/g, ''));
    const value = Number.isFinite(parsed) ? parsed : 0;
    const shouldEnable = value !== 0 && !enabled;

    setup.value = {
      ...setup.value,
      financials: { ...setup.value.financials, net_salary: value },
      ...(shouldEnable
        ? {
            risk_toggles: { ...setup.value.risk_toggles, salary: true },
          }
        : {}),
    };
  };

  const [currency, setCurrency] = useState('Currency: USD');

  const [savingsRateInput, setSavingsRateInput] = useState(() => {
    const stored = setup.value.financials.savings_rate;
    return stored ? String(stored * 100) : '';
  });

  useEffect(() => {
    const stored = setup.value.financials.savings_rate;
    const localNum = Number(savingsRateInput);
    if (Number.isFinite(localNum) && Math.abs(localNum / 100 - stored) < 1e-9) {
      return;
    }
    setSavingsRateInput(stored ? String(stored * 100) : '');
  }, [setup.value.financials.savings_rate]);

  const handleSavingsRateChange = (next: string) => {
    setSavingsRateInput(next);
    const parsed = Number(next);
    if (!Number.isFinite(parsed)) return;
    const clamped = Math.min(100, Math.max(0, parsed));
    setup.value = {
      ...setup.value,
      financials: { ...setup.value.financials, savings_rate: clamped / 100 },
    };
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (cardRef.current && cardRef.current.contains(event.target as Node)) {
        return;
      }
      if (
        setup.value.financials.net_salary === 0 &&
        setup.value.risk_toggles.salary
      ) {
        setup.value = {
          ...setup.value,
          risk_toggles: { ...setup.value.risk_toggles, salary: false },
        };
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setup]);

  const currencyInfo = useMemo(() => {
    const s = currency.toLowerCase();
    if (s.includes('usd')) return { symbol: '$', label: 'USD' };
    if (s.includes('eur')) return { symbol: '€', label: 'EUR' };
    if (s.includes('gbp')) return { symbol: '£', label: 'GBP' };
    return { symbol: '$', label: 'USD' };
  }, [currency]);

  return (
    <CardWrapper ref={cardRef}>
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
          onChange={handleAmountChange}
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
          <LabeledField label="Monthly Investment Rate">
            <QuantityInput
              suffix="%"
              value={savingsRateInput}
              onChange={handleSavingsRateChange}
              size="sm"
              placeholder="0"
              allowDecimal
            />
          </LabeledField>
        </Grid>
      </CardBody>
    </CardWrapper>
  );
};
