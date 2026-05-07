import { useState, useCallback } from 'react';
import { MdTune, MdExpandMore, MdClose, MdAdd, MdPlayArrow } from 'react-icons/md';
import { Signal } from '@preact/signals-react';
import { SweepOp, SWEEP_OP_LABELS, SWEEP_OP_ORDER } from '../../interfaces';
import {
  formatThresholdDisplay,
  parseThresholdInput,
  getUnitLabel,
  getFactorUnit,
} from '../../utils';
import { formatFactorName } from '@/pages/Prometheus/Conditional/utils';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelBody,
  FieldGroup,
  FieldLabel,
  FactorButton,
  FactorPlaceholder,
  OpGrid,
  OpButton,
  ThresholdList,
  ThresholdChip,
  ChipRemove,
  AddRow,
  ThresholdInput,
  UnitHint,
  AddButton,
  ExecuteButton,
} from './ParameterPanel.styled';

interface ParameterPanelProps {
  factor: Signal<string>;
  op: Signal<SweepOp>;
  thresholds: Signal<number[]>;
  onFactorClick: () => void;
  onRun: () => void;
  isPending: boolean;
  bondTenor: number;
}

export const ParameterPanel = ({
  factor,
  op,
  thresholds,
  onFactorClick,
  onRun,
  isPending,
  bondTenor,
}: ParameterPanelProps) => {
  const [inputValue, setInputValue] = useState('');

  const unit = factor.value ? getFactorUnit(factor.value) : null;
  const unitLabel = unit ? getUnitLabel(unit) : '';

  const handleAddThreshold = useCallback(() => {
    if (!factor.value || !inputValue.trim()) return;
    const parsed = parseThresholdInput(inputValue.trim(), factor.value);
    if (parsed === null) return;
    if (thresholds.value.includes(parsed)) return;
    thresholds.value = [...thresholds.value, parsed].sort((a, b) => a - b);
    setInputValue('');
  }, [inputValue, factor, thresholds]);

  const handleRemoveThreshold = useCallback(
    (val: number) => {
      thresholds.value = thresholds.value.filter((t) => t !== val);
    },
    [thresholds],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddThreshold();
    }
  };

  const canRun = factor.value && thresholds.value.length >= 2;

  return (
    <Panel>
      <PanelHeader>
        <MdTune />
        <PanelTitle>Parameters</PanelTitle>
      </PanelHeader>
      <PanelBody>
        <FieldGroup>
          <FieldLabel>Risk Factor</FieldLabel>
          <FactorButton onClick={onFactorClick}>
            {factor.value ? (
              formatFactorName(factor.value, bondTenor)
            ) : (
              <FactorPlaceholder>Select a factor...</FactorPlaceholder>
            )}
            <MdExpandMore />
          </FactorButton>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Operator</FieldLabel>
          <OpGrid>
            {SWEEP_OP_ORDER.map((o) => (
              <OpButton
                key={o}
                $active={op.value === o}
                onClick={() => {
                  op.value = o;
                }}
              >
                {SWEEP_OP_LABELS[o]}
              </OpButton>
            ))}
          </OpGrid>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>
            Threshold Values{unitLabel ? ` (${unitLabel})` : ''}
          </FieldLabel>
          <ThresholdList>
            {thresholds.value.map((val) => (
              <ThresholdChip key={val}>
                {factor.value
                  ? formatThresholdDisplay(val, factor.value)
                  : val}
                <ChipRemove onClick={() => handleRemoveThreshold(val)}>
                  <MdClose />
                </ChipRemove>
              </ThresholdChip>
            ))}
          </ThresholdList>
          {factor.value && (
            <AddRow>
              <ThresholdInput
                type="text"
                inputMode="decimal"
                placeholder={`e.g. ${unitLabel === 'bps' ? '50' : '-10'}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {unitLabel && <UnitHint>{unitLabel}</UnitHint>}
              <AddButton onClick={handleAddThreshold}>
                <MdAdd /> Add
              </AddButton>
            </AddRow>
          )}
        </FieldGroup>

        <ExecuteButton
          onClick={onRun}
          disabled={!canRun || isPending}
        >
          <MdPlayArrow />
          {isPending ? 'RUNNING...' : 'EXECUTE SWEEP'}
        </ExecuteButton>
      </PanelBody>
    </Panel>
  );
};
