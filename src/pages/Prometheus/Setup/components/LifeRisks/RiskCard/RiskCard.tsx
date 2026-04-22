import { useEffect, useState } from 'react';
import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';
import type { RiskConfig } from '../risks.data';
import { LabeledField } from '../../../shared/LabeledField/LabeledField';
import { MoneyInput } from '../../../shared/MoneyInput/MoneyInput';
import { SelectField } from '../../../shared/SelectField/SelectField';
import { TechnicalInput } from '../../../shared/TechnicalInput/TechnicalInput';
import { QuantityInput } from '../../../shared/QuantityInput/QuantityInput';
import {
  Outer,
  Glow,
  Card,
  CardHeader,
  HeaderLeft,
  IconDisk,
  CardTitle,
  PresetTag,
  Body,
  DurationRow,
} from './RiskCard.styled';

interface RiskCardProps {
  config: RiskConfig;
  setup?: Signal<FinancialState>;
}

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => `${i + 1} months`);

export const RiskCard = ({ config, setup }: RiskCardProps) => {
  const Icon = config.icon;
  const accent = config.variant === 'primary' ? 'error' : 'error-soft';

  const [amount, setAmount] = useState(config.defaultAmount);
  const [frequency, setFrequency] = useState<string | number>(
    config.defaultFrequencyYears
  );
  const [optimistic, setOptimistic] = useState<string | number>(
    config.defaultOptimisticMonths
  );
  const [pessimistic, setPessimistic] = useState<string | number>(
    config.defaultPessimisticMonths
  );

  const isJobLoss = config.id === 'job-loss';

  const netSalary = setup?.value.financials.net_salary ?? 0;
  const salaryOn = setup?.value.risk_toggles.salary ?? false;

  useEffect(() => {
    if (!isJobLoss || !setup) return;

    const redundancy = Number(String(amount).replace(/,/g, '')) || 0;
    const optMonths = Number(optimistic) || 0;
    const pessMonths = Number(pessimistic) || 0;

    const active = salaryOn && netSalary > 0;
    const monthlySalary = netSalary > 0 ? netSalary / 12 : 0;

    const next = {
      career_loss: active,
      career_recoverable: active && netSalary > 0 ? redundancy / netSalary : 0,
      career_opt_loss: active ? monthlySalary * optMonths : 0,
      career_pess_loss: active ? monthlySalary * pessMonths : 0,
    };

    const current = setup.value.risk_toggles;
    if (
      current.career_loss === next.career_loss &&
      current.career_recoverable === next.career_recoverable &&
      current.career_opt_loss === next.career_opt_loss &&
      current.career_pess_loss === next.career_pess_loss
    ) {
      return;
    }

    setup.value = {
      ...setup.value,
      risk_toggles: { ...current, ...next },
    };
  }, [
    isJobLoss,
    setup,
    amount,
    optimistic,
    pessimistic,
    netSalary,
    salaryOn,
  ]);

  return (
    <Outer>
      <Glow $variant={config.variant} />
      <Card $variant={config.variant}>
        <CardHeader>
          <HeaderLeft>
            <IconDisk>
              <Icon />
            </IconDisk>
            <CardTitle>{config.title}</CardTitle>
          </HeaderLeft>
          {config.preset && <PresetTag>{config.preset}</PresetTag>}
        </CardHeader>

        <Body>
          <LabeledField label={config.amountLabel}>
            <MoneyInput
              value={amount}
              onChange={setAmount}
              inputType="text"
              size="sm"
              currencyLabel=""
              mutedPrefix
              accent={accent}
            />
          </LabeledField>

          <LabeledField label="Occurrence Frequency">
            <QuantityInput
              prefix="1 every"
              suffix="years"
              value={frequency}
              onChange={(val) => setFrequency(val)}
              size="sm"
              accent={accent}
            />
          </LabeledField>

          <DurationRow>
            <LabeledField label="Optimistic Duration">
              {isJobLoss ? (
                <SelectField
                  value={`${optimistic} months`}
                  onChange={(val) => setOptimistic(val.split(' ')[0])}
                  options={MONTH_OPTIONS}
                  accent={accent}
                />
              ) : (
                <QuantityInput
                  suffix="months"
                  value={optimistic}
                  onChange={(val) => setOptimistic(val)}
                  size="sm"
                  accent={accent}
                />
              )}
            </LabeledField>
            <LabeledField label="Pessimistic Duration">
              {isJobLoss ? (
                <SelectField
                  value={`${pessimistic} months`}
                  onChange={(val) => setPessimistic(val.split(' ')[0])}
                  options={MONTH_OPTIONS}
                  accent={accent}
                />
              ) : (
                <QuantityInput
                  suffix="months"
                  value={pessimistic}
                  onChange={(val) => setPessimistic(val)}
                  size="sm"
                  accent={accent}
                />
              )}
            </LabeledField>
          </DurationRow>
        </Body>
      </Card>
    </Outer>
  );
};
