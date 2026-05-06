import {
  MdClose,
  MdWaterDrop,
  MdDonutSmall,
  MdPlayArrow,
  MdHealthAndSafety,
} from 'react-icons/md';
import { Financials } from '@/pages/Prometheus/interfaces';
import { WhatIfRequest, FactorsResponse } from '../../interfaces';
import { formatDelta, formatDeltaMonthly, formatCompact } from '../../utils';
import { LeverSlider } from './LeverSlider';
import { RiskProtection } from './RiskProtection';
import { StyledRange } from './LeverSlider.styled';
import {
  Overlay,
  Drawer,
  Handle,
  DrawerHeader,
  DrawerTitle,
  CloseButton,
  DrawerContent,
  DrawerGrid,
  DrawerLeftCol,
  DrawerRightCol,
  GlassPanel,
  PanelSectionHeader,
  PanelSectionIcon,
  PanelSectionLabel,
  SplitDisplay,
  SplitLabel,
  SplitBar,
  SplitSegment,
  ExpenseCutDisplay,
  RunButton,
  RiskLoadingWrap,
  RiskLoadingOrb,
  RiskLoadingLabel,
  RiskSkeletonCard,
  RiskSkeletonStack,
} from './DecisionLevers.styled';

interface DecisionLeversProps {
  open: boolean;
  onClose: () => void;
  request: WhatIfRequest;
  onChange: (req: WhatIfRequest) => void;
  financials: Financials;
  factors: FactorsResponse | undefined;
  currency: string;
  equitySplit: number;
  onEquitySplitChange: (val: number) => void;
  savingsLimit: number;
  onSavingsLimitChange: (val: number) => void;
  salaryLimit: number;
  onSalaryLimitChange: (val: number) => void;
  onRun: () => void;
  isPending: boolean;
  isLoadingFactors: boolean;
}

export const DecisionLevers = ({
  open,
  onClose,
  request,
  onChange,
  financials,
  factors,
  currency,
  equitySplit,
  onEquitySplitChange,
  savingsLimit,
  onSavingsLimitChange,
  salaryLimit,
  onSalaryLimitChange,
  onRun,
  isPending,
  isLoadingFactors,
}: DecisionLeversProps) => {
  const bondSplit = 100 - equitySplit;
  const expensePct = Math.round(request.expense_cut * 100);
  const estimatedExpenses =
    financials.net_salary * (1 - financials.savings_rate);
  const shavedAmount = estimatedExpenses * request.expense_cut;

  return (
    <>
      <Overlay $open={open} onClick={onClose} />
      <Drawer $open={open}>
        <Handle onClick={onClose} />
        <CloseButton onClick={onClose}>
          <MdClose />
        </CloseButton>
        <DrawerHeader>
          <DrawerTitle>Decision Levers</DrawerTitle>
          <RunButton onClick={onRun} disabled={isPending}>
            <MdPlayArrow />
            {isPending ? 'RUNNING...' : 'RUN SCENARIO'}
          </RunButton>
        </DrawerHeader>

        <DrawerContent>
          <DrawerGrid>
            <DrawerLeftCol>
              <GlassPanel $accent="secondary">
                <PanelSectionHeader>
                  <PanelSectionIcon $color="#4ae176">
                    <MdWaterDrop />
                  </PanelSectionIcon>
                  <PanelSectionLabel>Liquidity & Cashflow</PanelSectionLabel>
                </PanelSectionHeader>

                <LeverSlider
                  label="ONE-TIME SAVINGS ADJUSTMENT"
                  value={request.buffer_delta}
                  onChange={(v) => onChange({ ...request, buffer_delta: v })}
                  min={-financials.savings}
                  max={savingsLimit}
                  formatValue={formatDelta}
                  maxEditable
                  onMaxChange={onSavingsLimitChange}
                />
                <LeverSlider
                  label="ANNUAL INCOME CHANGE"
                  value={request.salary_delta}
                  onChange={(v) => onChange({ ...request, salary_delta: v })}
                  min={-financials.net_salary}
                  max={salaryLimit}
                  formatValue={formatDeltaMonthly}
                  maxEditable
                  onMaxChange={onSalaryLimitChange}
                />
                <LeverSlider
                  label="ANNUAL EXPENSE REDUCTION"
                  value={request.expense_cut}
                  onChange={(v) => onChange({ ...request, expense_cut: v })}
                  min={0}
                  max={1}
                  step={0.01}
                  formatValue={(v) => `${Math.round(v * 100)}%`}
                  formatBound={(v) => `${Math.round(v * 100)}%`}
                />
                {request.expense_cut > 0 && (
                  <ExpenseCutDisplay>
                    Saves ~{formatCompact(shavedAmount)}/yr ({expensePct}% of
                    est. {formatCompact(estimatedExpenses)} expenses)
                  </ExpenseCutDisplay>
                )}
              </GlassPanel>

              <GlassPanel $accent="primary">
                <PanelSectionHeader>
                  <PanelSectionIcon $color="#ddb7ff">
                    <MdDonutSmall />
                  </PanelSectionIcon>
                  <PanelSectionLabel>Portfolio Rebalancing</PanelSectionLabel>
                </PanelSectionHeader>
                <SplitDisplay>
                  <SplitLabel $color="#ddb7ff">
                    EQUITY: {equitySplit}%
                  </SplitLabel>
                  <SplitLabel>BONDS: {bondSplit}%</SplitLabel>
                </SplitDisplay>
                <SplitBar>
                  <SplitSegment $width={equitySplit} $color="#ddb7ff" />
                  <SplitSegment $width={bondSplit} $color="#393939" />
                </SplitBar>
                <StyledRange
                  min={0}
                  max={100}
                  value={equitySplit}
                  onChange={(e: any) =>
                    onEquitySplitChange(Number(e.target.value))
                  }
                />
              </GlassPanel>
            </DrawerLeftCol>

            <DrawerRightCol>
              {isLoadingFactors ? (
                <GlassPanel $accent="tertiary">
                  <PanelSectionHeader>
                    <PanelSectionIcon $color="#f9bb4d">
                      <MdHealthAndSafety />
                    </PanelSectionIcon>
                    <PanelSectionLabel>Risk Protection</PanelSectionLabel>
                  </PanelSectionHeader>
                  <RiskLoadingWrap>
                    <RiskLoadingOrb>
                      <MdHealthAndSafety />
                    </RiskLoadingOrb>
                    <RiskLoadingLabel>Loading risk factors...</RiskLoadingLabel>
                    <RiskSkeletonStack>
                      <RiskSkeletonCard />
                      <RiskSkeletonCard />
                      <RiskSkeletonCard />
                    </RiskSkeletonStack>
                  </RiskLoadingWrap>
                </GlassPanel>
              ) : (
                <RiskProtection
                  factors={factors}
                  currency={currency}
                  request={request}
                  onChange={onChange}
                />
              )}
            </DrawerRightCol>
          </DrawerGrid>
        </DrawerContent>
      </Drawer>
    </>
  );
};
