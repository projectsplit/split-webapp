import { useState } from 'react';
import { MdClose, MdInfoOutline } from 'react-icons/md';
import { Condition, OP_LABELS, OP_ORDER } from '../../interfaces';
import { monthsToCareerGross, careerGrossToMonths } from '../../utils';
import { formatCompact } from '@/pages/Prometheus/WhatIf/utils';
import {
  Card,
  CardHeader,
  FactorLabel,
  CurrentValue,
  OperatorRow,
  OpButton,
  StyledRange,
  BoundsRow,
  BoundLabel,
  RemoveButton,
} from '../ConditionCard/ConditionCard.styled';
import {
  HeaderInfo,
  InfoIcon,
  Tooltip,
  SummaryBlock,
  SummaryHeadline,
  SummaryRow,
  SummaryLabel,
  FixedTag,
  SummaryValue,
  SummaryDivider,
  NoteLine,
} from './CareerLossCard.styled';

interface CareerLossCardProps {
  condition: Condition;
  netSalary: number;
  careerRecoverable: number;
  currency: string;
  onChange: (updated: Condition) => void;
  onRemove: () => void;
}

const TOOLTIP_TEXT =
  'Career loss is modelled as months of lost income. Gross loss is capped at 12 months (one year\'s salary). When a loss event occurs, you receive a fixed severance payment. The net cost to your wealth is the gross loss minus severance — which can be negative if your severance package is generous relative to the time unemployed. This is what is displayed as net gain';

export const CareerLossCard = ({
  condition,
  netSalary,
  careerRecoverable,
  currency,
  onChange,
  onRemove,
}: CareerLossCardProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const months = Math.round(careerGrossToMonths(condition.value, netSalary));
  const grossThreshold = monthsToCareerGross(months, netSalary);
  const severance = careerRecoverable * netSalary;
  const netCost = grossThreshold - severance;
  const hasSeverance = careerRecoverable > 0;
  const generousPackage = careerRecoverable >= 1.0;

  const handleMonthsChange = (newMonths: number) => {
    onChange({
      ...condition,
      value: monthsToCareerGross(newMonths, netSalary),
    });
  };

  const monthsLabel = months === 1 ? 'month' : 'months';

  return (
    <Card>
      <CardHeader>
        <HeaderInfo>
          <FactorLabel>Career Loss</FactorLabel>
          <InfoIcon
            type="button"
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
            onFocus={() => setTooltipOpen(true)}
            onBlur={() => setTooltipOpen(false)}
            aria-label="About career loss"
          >
            <MdInfoOutline />
          </InfoIcon>
          {tooltipOpen && <Tooltip>{TOOLTIP_TEXT}</Tooltip>}
        </HeaderInfo>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CurrentValue>
            {months} {monthsLabel}
          </CurrentValue>
          <RemoveButton onClick={onRemove}>
            <MdClose />
          </RemoveButton>
        </div>
      </CardHeader>

      <OperatorRow>
        {OP_ORDER.map((op) => (
          <OpButton
            key={op}
            $active={condition.op === op}
            onClick={() => onChange({ ...condition, op })}
          >
            {OP_LABELS[op]}
          </OpButton>
        ))}
      </OperatorRow>

      <StyledRange
        min={0}
        max={12}
        step={1}
        value={months}
        onChange={(e) => handleMonthsChange(Number(e.target.value))}
      />
      <BoundsRow>
        <BoundLabel>0 months</BoundLabel>
        <BoundLabel>12 months</BoundLabel>
      </BoundsRow>

      <SummaryBlock>
        <SummaryHeadline>
          Unemployed {OP_LABELS[condition.op]} {months} {monthsLabel}
        </SummaryHeadline>

        <SummaryRow>
          <SummaryLabel>Gross income lost</SummaryLabel>
          <SummaryValue>
            {formatCompact(grossThreshold)} {currency}
          </SummaryValue>
        </SummaryRow>

        {hasSeverance && (
          <SummaryRow>
            <SummaryLabel>
              Severance received <FixedTag>(fixed)</FixedTag>
            </SummaryLabel>
            <SummaryValue $variant="muted">
              {formatCompact(severance)} {currency}
            </SummaryValue>
          </SummaryRow>
        )}

        <SummaryDivider />

        <SummaryRow>
          <SummaryLabel>
            {netCost < 0 ? 'Net gain' : 'Net cost to wealth'}
          </SummaryLabel>
          <SummaryValue $variant={netCost < 0 ? 'gain' : 'cost'}>
            {formatCompact(Math.abs(netCost))} {currency}
          </SummaryValue>
        </SummaryRow>

        {netCost < 0 && (
          <NoteLine $variant="gain">
            Severance exceeds lost income.
          </NoteLine>
        )}

        {generousPackage && (
          <NoteLine>
            Severance package exceeds salary — short unemployment events result in
            a net financial gain.
          </NoteLine>
        )}
      </SummaryBlock>
    </Card>
  );
};
