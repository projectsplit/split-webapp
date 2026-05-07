import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { MdSsidChart, MdArrowBack } from 'react-icons/md';
import { usePrometheusMode } from '../usePrometheusMode';
import { usePrometheusSetup } from '../PrometheusProvider';
import { useGetRiskFactors } from '@/api/auth/QueryHooks/useGetRiskFactors';
import { useRunConditionalSweep } from '@/api/auth/CommandHooks/useRunConditionalSweep';
import { SimNav } from '../Simulation/components/SimNav/SimNav';
import { SimulationWaveOverlay } from '@/components/Animations/SimulationWaveOverlay';
import { SweepOp, ConditionalSweepResponse } from './interfaces';
import { ParameterPanel } from './components/ParameterPanel/ParameterPanel';
import { FactorSelectDrawer } from './components/FactorSelectDrawer/FactorSelectDrawer';
import { SweepChart } from './components/SweepChart/SweepChart';
import { SweepNarrativePanel } from './components/NarrativePanel/NarrativePanel';
import {
  PageRoot,
  Main,
  PageHeader,
  BackLink,
  PageTitle,
  Subtitle,
  ContentGrid,
  LeftColumn,
  RightColumn,
  Vignette,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  EmptyButton,
} from './ThresholdSensitivity.styled';

export const ThresholdSensitivity = () => {
  usePrometheusMode();
  const navigate = useNavigate();
  const setup = usePrometheusSetup();
  const bondTenor = setup.value.financials.bond_tenor;
  const riskToggles = setup.value.risk_toggles;
  const { data: factors, isFetching } = useGetRiskFactors();

  const serverErrors = useSignal<any[]>([]);
  const factor = useSignal<string>('');
  const op = useSignal<SweepOp>('le');
  const thresholds = useSignal<number[]>([]);

  const { mutateAsync, isPending } = useRunConditionalSweep(serverErrors);
  const [response, setResponse] = useState<ConditionalSweepResponse | null>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRun = useCallback(async () => {
    if (isPending || !factor.value || thresholds.value.length < 2) return;
    try {
      const result = await mutateAsync({
        factor: factor.value,
        op: op.value,
        thresholds: thresholds.value,
      });
      setResponse(result);
    } catch {
      /* captured by onError */
    }
  }, [isPending, factor, op, thresholds, mutateAsync]);

  const baseline =
    response?.rows[0]?.baseline_p_bust ?? 0;

  return (
    <PageRoot>
      <SimulationWaveOverlay isActive={isPending} isResim={true} />
      <SimNav activeKey="sensitivity" />
      <Main>
        <PageHeader>
          <BackLink onClick={() => navigate('/prometheus/simulations')}>
            <MdArrowBack /> Back to Simulations
          </BackLink>
          <PageTitle>Threshold Sensitivity</PageTitle>
          <Subtitle>P(Ruin) evolution across factor thresholds</Subtitle>
        </PageHeader>

        <ContentGrid>
          <LeftColumn>
            <ParameterPanel
              factor={factor}
              op={op}
              thresholds={thresholds}
              onFactorClick={() => setDrawerOpen(true)}
              onRun={handleRun}
              isPending={isPending}
              bondTenor={bondTenor}
            />
            {response && (
              <SweepNarrativePanel
                narrative={response.narrative}
                factorExplanations={response.factor_explanations}
                bondTenor={bondTenor}
              />
            )}
          </LeftColumn>

          <RightColumn>
            {response ? (
              <SweepChart
                rows={response.rows}
                thresholds={response.thresholds}
                baseline={baseline}
                factorName={response.factor}
              />
            ) : (
              <EmptyState>
                <EmptyIcon>
                  <MdSsidChart />
                </EmptyIcon>
                <EmptyTitle>Configure Your Sweep</EmptyTitle>
                <EmptyText>
                  Select a risk factor and define threshold values to visualise
                  how P(Ruin) evolves across different stress levels.
                </EmptyText>
                <EmptyButton onClick={() => setDrawerOpen(true)}>
                  SELECT RISK FACTOR
                </EmptyButton>
              </EmptyState>
            )}
          </RightColumn>
        </ContentGrid>
      </Main>

      <FactorSelectDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        factor={factor}
        thresholds={thresholds}
        factors={factors}
        isLoading={isFetching}
        bondTenor={bondTenor}
        riskToggles={riskToggles}
      />

      <Vignette />
    </PageRoot>
  );
};
