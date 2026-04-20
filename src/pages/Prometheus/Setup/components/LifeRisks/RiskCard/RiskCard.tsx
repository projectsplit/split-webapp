import { useState } from 'react';
import type { RiskConfig } from '../risks.data';
import { LabeledField } from '../../../shared/LabeledField/LabeledField';
import { MoneyInput } from '../../../shared/MoneyInput/MoneyInput';
import { SelectField } from '../../../shared/SelectField/SelectField';
import { TechnicalInput } from '../../../shared/TechnicalInput/TechnicalInput';
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
  DurationInput,
} from './RiskCard.styled';

interface RiskCardProps {
  config: RiskConfig;
}

export const RiskCard = ({ config }: RiskCardProps) => {
  const Icon = config.icon;
  const accent = config.variant === 'primary' ? 'error' : 'error-soft';

  const [amount, setAmount] = useState(config.defaultAmount);
  const [frequency, setFrequency] = useState(config.frequencyOptions[0]);
  const [optimistic, setOptimistic] = useState(
    config.defaultOptimisticDuration
  );
  const [pessimistic, setPessimistic] = useState(
    config.defaultPessimisticDuration
  );

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

          <LabeledField label="Occurrence Frequency (Binomial)">
            <SelectField
              value={frequency}
              onChange={setFrequency}
              options={config.frequencyOptions}
              accent={accent}
            />
          </LabeledField>

          <DurationRow>
            <LabeledField label="Optimistic Duration">
              <TechnicalInput accent={accent} pad="sm">
                <DurationInput
                  value={optimistic}
                  onChange={(e) => setOptimistic(e.target.value)}
                />
              </TechnicalInput>
            </LabeledField>
            <LabeledField label="Pessimistic Duration">
              <TechnicalInput accent={accent} pad="sm">
                <DurationInput
                  value={pessimistic}
                  onChange={(e) => setPessimistic(e.target.value)}
                />
              </TechnicalInput>
            </LabeledField>
          </DurationRow>
        </Body>
      </Card>
    </Outer>
  );
};
