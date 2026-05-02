import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { usePrometheusMode } from '../usePrometheusMode';
import { SimulationResponse } from './interfaces';
import { SimNav } from './components/SimNav/SimNav';
import { WealthMountain } from './components/WealthMountain/WealthMountain';
import { DistributionStats } from './components/DistributionStats/DistributionStats';
import { ScenarioNarratives } from './components/ScenarioNarratives/ScenarioNarratives';
import { ResiliencyScore } from './components/ResiliencyScore/ResiliencyScore';
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

  if (!response) {
    return <Navigate to="/prometheus/correlation" replace />;
  }

  const initialWealth = response.starting_wealth;

  const simLabel =
    response.n_sims >= 1_000_000
      ? `${(response.n_sims / 1_000_000).toFixed(0)}M`
      : response.n_sims.toLocaleString();

  const currency = response.economy.requested?.toUpperCase() ?? 'USD';

  return (
    <PageRoot>
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
          onReSimulate={() => navigate('/prometheus/correlation')}
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
