import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { MdArrowBack, MdAutoStories, MdBarChart, MdTimeline } from 'react-icons/md';
import { usePrometheusMode } from '../../../usePrometheusMode';
import { SimulationResponse, SimulationScenario } from '../../interfaces';
import { findScenario } from '../../utils/findScenario';
import { formatSimCurrency } from '../../utils/formatCurrency';
import { PERCENTILE_BUILDERS, PERCENTILE_META } from '../../utils/buildNarrative';
import { SimNav } from '../SimNav/SimNav';
import { PDFChart } from './PDFChart';
import { PathMetrics } from './PathMetrics';
import {
  PageRoot,
  Main,
  BackButton,
  Header,
  PercentileTag,
  Title,
  Subtitle,
  WealthDisplay,
  WealthLabel,
  TwoCol,
  Card,
  CardTitle,
  NarrativeText,
  Vignette,
} from './PercentileBreakdown.styled';

interface LocationState {
  simulationResponse: SimulationResponse;
  percentile: number;
}

export const PercentileBreakdown = () => {
  usePrometheusMode();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  if (!state?.simulationResponse || state.percentile == null) {
    return <Navigate to="/prometheus/simulations" replace />;
  }

  const { simulationResponse: response, percentile } = state;
  const scenario = findScenario(response.scenarios, percentile);

  if (!scenario) {
    return <Navigate to="/prometheus/simulations" replace />;
  }

  const startingWealth = response.starting_wealth;
  const meta = PERCENTILE_META[percentile];
  const builder = PERCENTILE_BUILDERS[percentile];
  const narrative = builder ? builder(scenario, startingWealth) : '';

  const ordinalLabel = percentile === 0.5
    ? '0.5th Percentile'
    : `${percentile}${nth(percentile)} Percentile`;

  return (
    <PageRoot>
      <SimNav activeKey="sims" />
      <Main>
        <BackButton
          onClick={() =>
            navigate('/prometheus/simulations', {
              state: { simulationResponse: response },
            })
          }
        >
          <MdArrowBack /> Back to Simulation
        </BackButton>

        <Header>
          <PercentileTag>{ordinalLabel}</PercentileTag>
          <Title>{meta?.title ?? `Percentile ${percentile}`}</Title>
          <Subtitle>{meta?.subtitle ?? ''}</Subtitle>
          <WealthLabel>SIMULATED TOTAL WEALTH</WealthLabel>
          <WealthDisplay>{formatSimCurrency(scenario.wealth)}</WealthDisplay>
        </Header>

        <Card style={{ marginBottom: '1.5rem' }}>
          <CardTitle><MdTimeline /> Probability Density Function</CardTitle>
          <PDFChart summary={response.summary} selectedWealth={scenario.wealth} />
        </Card>

        <TwoCol>
          <Card>
            <CardTitle><MdAutoStories /> Path Narrative</CardTitle>
            <NarrativeText>"{narrative}"</NarrativeText>
          </Card>

          <Card>
            <CardTitle><MdBarChart /> Path Metrics</CardTitle>
            <PathMetrics scenario={scenario} startingWealth={startingWealth} />
          </Card>
        </TwoCol>
      </Main>
      <Vignette />
    </PageRoot>
  );
};

const nth = (p: number): string => {
  const n = Math.floor(p);
  if (n % 100 >= 11 && n % 100 <= 13) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};
