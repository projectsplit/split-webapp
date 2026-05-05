import { MdClose } from 'react-icons/md';
import { Condition, OP_LABELS, OP_ORDER } from '../../interfaces';
import { formatFactorName, getClampedMax } from '../../utils';
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
} from './ConditionCard.styled';

interface ConditionCardProps {
  condition: Condition;
  min: number;
  max: number;
  onChange: (updated: Condition) => void;
  onRemove: () => void;
}

const formatBound = (val: number): string => {
  if (Math.abs(val) >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (Math.abs(val) >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
  if (Math.abs(val) < 1 && val !== 0) return `${(val * 100).toFixed(1)}%`;
  return val.toFixed(1);
};

export const ConditionCard = ({
  condition,
  min,
  max: rawMax,
  onChange,
  onRemove,
}: ConditionCardProps) => {
  const max = getClampedMax(condition.factor, rawMax);
  const step = (max - min) / 200;

  return (
    <Card>
      <CardHeader>
        <FactorLabel>{formatFactorName(condition.factor)}</FactorLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CurrentValue>{formatBound(condition.value)}</CurrentValue>
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
        min={min}
        max={max}
        step={step}
        value={condition.value}
        onChange={(e) =>
          onChange({ ...condition, value: Number(e.target.value) })
        }
      />
      <BoundsRow>
        <BoundLabel>{formatBound(min)}</BoundLabel>
        <BoundLabel>{formatBound(max)}</BoundLabel>
      </BoundsRow>
    </Card>
  );
};
