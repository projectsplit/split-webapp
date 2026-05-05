import { MdTune } from 'react-icons/md';
import { WhatIfRequest } from '../../interfaces';
import { Financials } from '@/pages/Prometheus/interfaces';
import { formatDelta, formatDeltaMonthly, formatCompact } from '../../utils';
import {
  Panel,
  PanelGlow,
  PanelHeader,
  PanelTitle,
  CompRow,
  RowLabel,
  BaselineValue,
  ScenarioValue,
} from './SettingsComparison.styled';

interface SettingsComparisonProps {
  request: WhatIfRequest;
  financials: Financials;
  equitySplit: number;
  defaultEquityPct: number;
}

export const SettingsComparison = ({
  request,
  financials,
  equitySplit,
  defaultEquityPct,
}: SettingsComparisonProps) => {
  const defaultBondPct = 100 - defaultEquityPct;
  const bondSplit = 100 - equitySplit;
  const disabledCount = Object.keys(request.disabled_risks).length;
  const cappedCount = Object.keys(request.risk_caps).filter(
    (k) => request.risk_caps[k][0] > 0 || request.risk_caps[k][1] > 0,
  ).length;

  return (
    <Panel>
      <PanelGlow />
      <PanelHeader>
        <MdTune />
        <PanelTitle>Settings Comparison</PanelTitle>
      </PanelHeader>

      <CompRow>
        <RowLabel>CASH INJECTION</RowLabel>
        <BaselineValue>$0</BaselineValue>
        <ScenarioValue $color="secondary">
          {formatDelta(request.buffer_delta)}
        </ScenarioValue>
      </CompRow>

      <CompRow>
        <RowLabel>INCOME CHANGE</RowLabel>
        <BaselineValue>$0/yr</BaselineValue>
        <ScenarioValue $color="secondary">
          {formatDeltaMonthly(request.salary_delta)}
        </ScenarioValue>
      </CompRow>

      <CompRow>
        <RowLabel>EXPENSE CUT</RowLabel>
        <BaselineValue>0%</BaselineValue>
        <ScenarioValue $color="secondary">
          {request.expense_cut > 0
            ? `${Math.round(request.expense_cut * 100)}% (−${formatCompact(
                financials.net_salary *
                  (1 - financials.savings_rate) *
                  request.expense_cut,
              )}/yr)`
            : '0%'}
        </ScenarioValue>
      </CompRow>

      <CompRow>
        <RowLabel>EQ/BOND SPLIT</RowLabel>
        <BaselineValue>
          {defaultEquityPct}/{defaultBondPct}
        </BaselineValue>
        <ScenarioValue $color="primary">
          {equitySplit}/{bondSplit}
        </ScenarioValue>
      </CompRow>

      {disabledCount > 0 && (
        <CompRow>
          <RowLabel>DISABLED RISKS</RowLabel>
          <BaselineValue>None</BaselineValue>
          <ScenarioValue $color="tertiary">
            {disabledCount} risk(s)
          </ScenarioValue>
        </CompRow>
      )}

      {cappedCount > 0 && (
        <CompRow>
          <RowLabel>RISK CAPS</RowLabel>
          <BaselineValue>Uncapped</BaselineValue>
          <ScenarioValue $color="tertiary">{cappedCount} cap(s)</ScenarioValue>
        </CompRow>
      )}

      {request.exclude_property && (
        <CompRow>
          <RowLabel>PROPERTY</RowLabel>
          <BaselineValue>Included</BaselineValue>
          <ScenarioValue $color="tertiary">Excluded</ScenarioValue>
        </CompRow>
      )}
    </Panel>
  );
};
