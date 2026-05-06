import { MdTune, MdAdd, MdPlayArrow } from 'react-icons/md';
import { Signal } from '@preact/signals-react';
import { Condition } from '../../interfaces';
import { FactorsResponse } from '@/pages/Prometheus/WhatIf/interfaces';
import { ConditionCard } from '../ConditionCard/ConditionCard';
import {
  SelectorPanel,
  SelectorHeader,
  SelectorTitle,
  SelectorContent,
  AddButton,
  RunQueryButton,
  EmptyConditions,
} from './RiskSelector.styled';

interface RiskSelectorProps {
  conditions: Signal<Condition[]>;
  factors: FactorsResponse | undefined;
  onAddClick: () => void;
  onRun: () => void;
  isPending: boolean;
  bondTenor: number;
}

const getFactorBounds = (
  factorName: string,
  factors: FactorsResponse | undefined,
): { min: number; max: number } => {
  if (!factors) return { min: -1, max: 1 };
  const riskStats = factors.risks[factorName];
  if (riskStats) return { min: riskStats.min, max: riskStats.max };
  const factorStats = factors.factors[factorName];
  if (factorStats) return { min: factorStats.min, max: factorStats.max };
  return { min: -1, max: 1 };
};

export const RiskSelector = ({
  conditions,
  factors,
  onAddClick,
  onRun,
  isPending,
  bondTenor,
}: RiskSelectorProps) => {
  const handleChange = (index: number, updated: Condition) => {
    const next = [...conditions.value];
    next[index] = updated;
    conditions.value = next;
  };

  const handleRemove = (index: number) => {
    conditions.value = conditions.value.filter((_, i) => i !== index);
  };

  return (
    <SelectorPanel>
      <SelectorHeader>
        <SelectorTitle>
          <MdTune /> Risk Selector
        </SelectorTitle>
      </SelectorHeader>

      <SelectorContent>
        {conditions.value.length === 0 ? (
          <EmptyConditions>
            No conditions defined yet.
            <br />
            Add risk factors to query conditional probabilities.
          </EmptyConditions>
        ) : (
          conditions.value.map((cond, i) => {
            const bounds = getFactorBounds(cond.factor, factors);
            return (
              <ConditionCard
                key={`${cond.factor}-${i}`}
                condition={cond}
                min={bounds.min}
                max={bounds.max}
                onChange={(updated) => handleChange(i, updated)}
                onRemove={() => handleRemove(i)}
                bondTenor={bondTenor}
              />
            );
          })
        )}

        <AddButton onClick={onAddClick}>
          <MdAdd /> Add Condition
        </AddButton>

        {conditions.value.length > 0 && (
          <RunQueryButton onClick={onRun} disabled={isPending}>
            <MdPlayArrow />
            {isPending ? 'QUERYING...' : 'RUN QUERY'}
          </RunQueryButton>
        )}
      </SelectorContent>
    </SelectorPanel>
  );
};
