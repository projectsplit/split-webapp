import { useState, useCallback } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { usePrometheusMode } from '../usePrometheusMode';
import { SimulationResponse } from './interfaces';
import { SimNav } from './components/SimNav/SimNav';
import { WealthMountain } from './components/WealthMountain/WealthMountain';
import { DistributionStats } from './components/DistributionStats/DistributionStats';
import { ScenarioNarratives } from './components/ScenarioNarratives/ScenarioNarratives';
import { ResiliencyScore } from './components/ResiliencyScore/ResiliencyScore';
import { SimulationWaveOverlay } from '@/components/Animations/SimulationWaveOverlay';
import { useRunMCSimulation } from '@/api/auth/CommandHooks/useRunMCSimulation';
import {
  PageRoot,
  Main,
  PageHeader,
  PageTitle,
  PageSubtitle,
  Section,
  SectionTitle,
  SectionIcon,
  Vignette,
} from './Simulation.styled';
import { MdDataExploration, MdAutoStories } from 'react-icons/md';

export const PrometheusSimulation = () => {
  usePrometheusMode();
  const location = useLocation();
  const navigate = useNavigate();

  const response = location.state?.simulationResponse as SimulationResponse | undefined;
  const simulationInput = location.state?.simulationInput;

  const serverErrors = useSignal<any[]>([]);
  const {mutate:runSimulation, isPending} = useRunMCSimulation(navigate, serverErrors);

  const handleReSimulate = useCallback(() => {
    if (isPending) return;
    if (!simulationInput) {
      navigate('/prometheus/setup');
      return;
    }
    runSimulation(simulationInput);
  }, [simulationInput, isPending, runSimulation, navigate]);

  if (!response) {
    return <Navigate to="/prometheus/setup" replace />;
  }

  const initialWealth = response.starting_wealth;

  const simLabel =
    response.n_sims >= 1_000_000
      ? `${(response.n_sims / 1_000_000).toFixed(0)}M`
      : response.n_sims.toLocaleString();

  const currency = response.economy.requested?.toUpperCase() ?? 'USD';

  return (
    <PageRoot>
      <SimulationWaveOverlay isActive={isPending} isResim={true} />
      <SimNav activeKey="sims" />

      <Main>
        <PageHeader>
          <PageTitle>Simulation Engine</PageTitle>
          <PageSubtitle>
            {simLabel} MONTE CARLO PATHS // 1-YEAR HORIZON // BASE ECONOMY: {currency}
          </PageSubtitle>
        </PageHeader>

        <WealthMountain
          response={response}
          initialWealth={initialWealth}
          onReSimulate={handleReSimulate}
        />

        <Section>
          <SectionTitle>
            <SectionIcon><MdDataExploration /></SectionIcon>
            Distribution Statistics
          </SectionTitle>
          <DistributionStats summary={response.summary} />
        </Section>

        <Section>
          <SectionTitle>
            <SectionIcon><MdAutoStories /></SectionIcon>
            Qualitative Scenario Narratives
          </SectionTitle>
          <ScenarioNarratives scenarios={response.scenarios} startingWealth={initialWealth} />
        </Section>

        <Section>
          <ResiliencyScore summary={response.summary} nSims={response.n_sims} />
        </Section>
      </Main>

      <Vignette />
    </PageRoot>
  );
};
