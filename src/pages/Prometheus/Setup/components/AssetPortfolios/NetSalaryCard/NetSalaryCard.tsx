import { useEffect, useMemo, useRef, useState } from 'react';
import { MdPayments, MdExpandMore } from 'react-icons/md';
import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';
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

interface NetSalaryCardProps {
  setup: Signal<FinancialState>;
}

export const NetSalaryCard = ({ setup }: NetSalaryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const enabled = setup.value.risk_toggles.salary;
  const amountNum = setup.value.financials.net_salary;
  const amount = amountNum ? String(amountNum) : '';
  const [currency, setCurrency] = useState('Currency: USD');

  const setEnabled = (next: boolean) => {
    setup.value = {
      ...setup.value,
      risk_toggles: { ...setup.value.risk_toggles, salary: next },
    };
  };

  const setAmount = (next: string) => {
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
