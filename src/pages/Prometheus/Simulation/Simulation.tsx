import { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { usePrometheusMode } from '../usePrometheusMode';
import {
  usePrometheusSetup,
  useLastCalculatedSetup,
  useSimulationResponse,
} from '../PrometheusProvider';
import { SimNav } from './components/SimNav/SimNav';
import { WealthMountain } from './components/WealthMountain/WealthMountain';
import { DistributionStats } from './components/DistributionStats/DistributionStats';
import { ScenarioNarratives } from './components/ScenarioNarratives/ScenarioNarratives';
import { ResiliencyScore } from './components/ResiliencyScore/ResiliencyScore';
import { SimulationWaveOverlay } from '@/components/Animations/SimulationWaveOverlay';
import { useRunMCSimulation } from '@/api/auth/CommandHooks/useRunMCSimulation';
import { useGetCalculatedWealth } from '@/api/auth/QueryHooks/useGetCalculatedWealth';
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
  const setup = usePrometheusSetup();
  const lastCalculatedSetup = useLastCalculatedSetup();
  const simulationResponse = useSimulationResponse();

  const { isLoading, data: fetchedWealth } = useGetCalculatedWealth();

  const response = simulationResponse.value ?? fetchedWealth ?? null;

  const serverErrors = useSignal<any[]>([]);
  const { mutateAsync: runSimulation, isPending } = useRunMCSimulation(serverErrors);

  const handleReSimulate = useCallback(async () => {
    if (isPending) return;
    const input = setup.value;
    try {
      const data = await runSimulation(input);
      lastCalculatedSetup.value = JSON.parse(JSON.stringify(input));
      simulationResponse.value = data;
    } catch {
      // error already captured in serverErrors via onError
    }
  }, [setup, isPending, runSimulation, lastCalculatedSetup, simulationResponse]);

  if (!response && isLoading) {
    return (
      <PageRoot>
        <SimulationWaveOverlay isActive={true} isResim={false} />
        <SimNav activeKey="sims" />
        <Main />
        <Vignette />
      </PageRoot>
    );
  }

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
          <ScenarioNarratives response={response} />
        </Section>

        <Section>
          <ResiliencyScore summary={response.summary} nSims={response.n_sims} />
        </Section>
      </Main>

      <Vignette />
    </PageRoot>
  );
};
