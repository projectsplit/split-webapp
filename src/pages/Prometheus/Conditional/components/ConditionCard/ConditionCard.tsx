import { MdClose } from 'react-icons/md';
import { Condition, OP_LABELS, OP_ORDER } from '../../interfaces';
import { formatFactorName, formatFactorValue, getClampedMax, getClampedMin } from '../../utils';
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
  bondTenor: number;
}

export const ConditionCard = ({
  condition,
  min: rawMin,
  max: rawMax,
  onChange,
  onRemove,
  bondTenor,
}: ConditionCardProps) => {
  const min = getClampedMin(condition.factor, rawMin);
  const max = getClampedMax(condition.factor, rawMax);
  const step = (max - min) / 200;

  return (
    <Card>
      <CardHeader>
        <FactorLabel>{formatFactorName(condition.factor, bondTenor)}</FactorLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CurrentValue>{formatFactorValue(condition.value, condition.factor)}</CurrentValue>
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
        <BoundLabel>{formatFactorValue(min, condition.factor)}</BoundLabel>
        <BoundLabel>{formatFactorValue(max, condition.factor)}</BoundLabel>
      </BoundsRow>
    </Card>
  );
};
