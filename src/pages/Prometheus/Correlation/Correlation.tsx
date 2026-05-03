import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { TopBar } from './components/TopBar/TopBar';
import { Intro } from './components/Intro/Intro';
import { Matrix } from './components/Matrix/Matrix';
import { Analysis } from './components/Analysis/Analysis';
import { PageRoot, Main, Vignette } from './Correlation.styled';
import { usePrometheusMode } from '../usePrometheusMode';
import { usePrometheusSetup } from '../PrometheusProvider';
import { useActiveRisks } from './hooks/useActiveRisks';
import routes from '@/routes';
import { useRunMCSimulation, SIMULATION_CACHE_KEY } from '@/api/auth/CommandHooks/useRunMCSimulation';
import { useSignal } from '@preact/signals-react';
import { SimulationWaveOverlay } from '@/components/Animations/SimulationWaveOverlay';

export const PrometheusCorrelation = () => {
  const serverErrors = useSignal<any[]>([]);
  const setup = usePrometheusSetup();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  usePrometheusMode();

  const items = useActiveRisks(setup);
  const { mutate: runSimulation, isPending } = useRunMCSimulation(
    navigate,
    serverErrors
  );

  const handleBack = () => navigate(routes.PROMETHEUS_SETUP);
  const handleFinalize = () => {
    const cached = queryClient.getQueryData<{ input: any; response: any }>(SIMULATION_CACHE_KEY);
    if (cached && JSON.stringify(cached.input) === JSON.stringify(setup.value)) {
      navigate('/prometheus/simulations', {
        replace: true,
        state: { simulationResponse: cached.response, simulationInput: cached.input },
      });
      return;
    }
    runSimulation(setup.value);
  };

  return (
    <PageRoot>
      <SimulationWaveOverlay isActive={isPending} isResim={false} />
      <TopBar onBack={handleBack} onFinalize={handleFinalize} />
      <Main>
        <Intro />
        <Matrix setup={setup} items={items} />
        <Analysis setup={setup} items={items} />
      </Main>
      <Vignette />
    </PageRoot>
  );
};
