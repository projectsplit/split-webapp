import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { MdAnalytics, MdTune, MdArrowBack } from 'react-icons/md';
import { usePrometheusMode } from '../usePrometheusMode';
import { usePrometheusSetup, useSimulationResponse } from '../PrometheusProvider';
import { useGetCalculatedWealth } from '@/api/auth/QueryHooks/useGetCalculatedWealth';
import { useGetRiskFactors } from '@/api/auth/QueryHooks/useGetRiskFactors';
import { SimNav } from '../Simulation/components/SimNav/SimNav';
import { SimulationWaveOverlay } from '@/components/Animations/SimulationWaveOverlay';
import { useRunWhatIfSimulation } from '@/api/auth/CommandHooks/useRunWhatIfSimulation';
import { WhatIfRequest, WhatIfResponse } from './interfaces';
import { formatDelta } from './utils';
import { DecisionLevers } from './components/DecisionLevers/DecisionLevers';
import { SettingsComparison } from './components/SettingsComparison/SettingsComparison';
import { ResiliencyImpact } from './components/ResiliencyImpact/ResiliencyImpact';
import { NarrativeIntelligence } from './components/NarrativeIntelligence/NarrativeIntelligence';
import { ComparisonChart } from './components/ComparisonChart/ComparisonChart';
import { StrategicSummary } from './components/StrategicSummary/StrategicSummary';
import {
  PageRoot,
  Main,
  PageHeader,
  BackLink,
  PageTitle,
  ResultsGrid,
  LeftColumn,
  RightColumn,
  DeltaStatsGrid,
  DeltaStatBox,
  DeltaStatLabel,
  DeltaStatValue,
  FAB,
  Vignette,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  EmptyButton,
} from './WhatIf.styled';

const defaultRequest: WhatIfRequest = {
  buffer_delta: 0,
  expense_cut: 0,
  salary_delta: 0,
  disabled_risks: {},
  risk_caps: {},
  exclude_property: false,
};

export const WhatIfScenarios = () => {
  usePrometheusMode();
  const navigate = useNavigate();
  const setup = usePrometheusSetup();
  const { financials } = setup.value;
  const simulationResponse = useSimulationResponse();
  const { data: fetchedWealth } = useGetCalculatedWealth();
  const simResult = simulationResponse.value ?? fetchedWealth ?? null;
  const currency = simResult?.economy?.requested?.toUpperCase() ?? 'USD';
  const { data: factors, isFetching: isLoadingFactors } = useGetRiskFactors();

  const serverErrors = useSignal<any[]>([]);
  const { runWithCache, saveSnapshot, getSnapshot, isPending } =
    useRunWhatIfSimulation(serverErrors);
  const snapshot = getSnapshot();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [request, setRequest] = useState<WhatIfRequest>(
    snapshot?.request ?? { ...defaultRequest },
  );

  const totalPortfolio = financials.equity_value + financials.bond_value;
  const defaultEquityPct =
    totalPortfolio > 0
      ? Math.round((financials.equity_value / totalPortfolio) * 100)
      : 50;
  const [equitySplit, setEquitySplit] = useState(
    snapshot?.equitySplit ?? defaultEquityPct,
  );

  const [savingsLimit, setSavingsLimit] = useState(
    Math.max(Math.round(financials.savings * 0.5), 1000),
  );
  const [salaryLimit, setSalaryLimit] = useState(
    Math.max(Math.round(financials.net_salary * 0.5), 500),
  );
  const [response, setResponse] = useState<WhatIfResponse | null>(
    snapshot?.response ?? null,
  );

  const handleRun = useCallback(async () => {
    if (isPending) return;
    const req = { ...request };
    if (equitySplit !== defaultEquityPct) {
      req.reweight = {
        equity: equitySplit / 100,
        bond: (100 - equitySplit) / 100,
        total: totalPortfolio,
      };
    }
    try {
      const result = await runWithCache(req);
      setResponse(result);
      saveSnapshot({ request: req, response: result, equitySplit });
      setDrawerOpen(false);
    } catch {
      /* captured by onError */
    }
  }, [
    request,
    equitySplit,
    defaultEquityPct,
    totalPortfolio,
    isPending,
    runWithCache,
    saveSnapshot,
  ]);

  return (
    <PageRoot>
      <SimulationWaveOverlay isActive={isPending} isResim={true} />
      <SimNav activeKey="whatif" />
      <Main>
        <PageHeader>
          <BackLink onClick={() => navigate('/prometheus/simulations')}>
            <MdArrowBack /> Back to Simulations
          </BackLink>
          <PageTitle>What If Analysis</PageTitle>
        </PageHeader>

        {response ? (
          <ResultsGrid>
            <LeftColumn>
              <SettingsComparison
                request={request}
                financials={financials}
                equitySplit={equitySplit}
                defaultEquityPct={defaultEquityPct}
              />
              <ResiliencyImpact
                baseline={response.baseline}
                scenario={response.scenario}
                delta={response.delta}
              />
              <NarrativeIntelligence narrative={response.narrative} />
            </LeftColumn>
            <RightColumn>
              <ComparisonChart
                baseline={response.baseline}
                scenario={response.scenario}
              />
              <DeltaStatsGrid>
                <DeltaStatBox>
                  <DeltaStatLabel>MEAN CHANGE</DeltaStatLabel>
                  <DeltaStatValue
                    $positive={response.delta.delta_mean > 0}
                  >
                    {formatDelta(response.delta.delta_mean)}
                  </DeltaStatValue>
                </DeltaStatBox>
                <DeltaStatBox>
                  <DeltaStatLabel>MEDIAN CHANGE</DeltaStatLabel>
                  <DeltaStatValue
                    $positive={response.delta.delta_median > 0}
                  >
                    {formatDelta(response.delta.delta_median)}
                  </DeltaStatValue>
                </DeltaStatBox>
                <DeltaStatBox>
                  <DeltaStatLabel>P5 CHANGE</DeltaStatLabel>
                  <DeltaStatValue
                    $positive={response.delta.delta_p5 > 0}
                  >
                    {formatDelta(response.delta.delta_p5)}
                  </DeltaStatValue>
                </DeltaStatBox>
                <DeltaStatBox>
                  <DeltaStatLabel>P95 CHANGE</DeltaStatLabel>
                  <DeltaStatValue
                    $positive={response.delta.delta_p95 > 0}
                  >
                    {formatDelta(response.delta.delta_p95)}
                  </DeltaStatValue>
                </DeltaStatBox>
              </DeltaStatsGrid>
              <StrategicSummary narrative={response.narrative} />
            </RightColumn>
          </ResultsGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <MdAnalytics />
            </EmptyIcon>
            <EmptyTitle>Configure Your First Scenario</EmptyTitle>
            <EmptyText>
              Adjust your financial levers and run a what-if analysis to
              compare against your baseline simulation.
            </EmptyText>
            <EmptyButton onClick={() => setDrawerOpen(true)}>
              OPEN SCENARIO PANEL
            </EmptyButton>
          </EmptyState>
        )}
      </Main>

      <FAB onClick={() => setDrawerOpen(true)}>
        <MdTune /> ADJUST SCENARIO
      </FAB>

      <DecisionLevers
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        request={request}
        onChange={setRequest}
        financials={financials}
        factors={factors}
        currency={currency}
        equitySplit={equitySplit}
        onEquitySplitChange={setEquitySplit}
        savingsLimit={savingsLimit}
        onSavingsLimitChange={setSavingsLimit}
        salaryLimit={salaryLimit}
        onSalaryLimitChange={setSalaryLimit}
        onRun={handleRun}
        isPending={isPending}
        isLoadingFactors={isLoadingFactors}
      />

      <Vignette />
    </PageRoot>
  );
};
