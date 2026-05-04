import { useNavigate } from 'react-router-dom';
import { TopBar } from './components/TopBar/TopBar';
import { Intro } from './components/Intro/Intro';
import { Matrix } from './components/Matrix/Matrix';
import { Analysis } from './components/Analysis/Analysis';
import { PageRoot, Main, Vignette } from './Correlation.styled';
import { usePrometheusMode } from '../usePrometheusMode';
import {
  usePrometheusSetup,
  useLastCalculatedSetup,
  useSimulationResponse,
} from '../PrometheusProvider';
import { useActiveRisks } from './hooks/useActiveRisks';
import routes from '@/routes';
import { useRunMCSimulation } from '@/api/auth/CommandHooks/useRunMCSimulation';
import { useSignal } from '@preact/signals-react';
import { SimulationWaveOverlay } from '@/components/Animations/SimulationWaveOverlay';

export const PrometheusCorrelation = () => {
  const serverErrors = useSignal<any[]>([]);
  const setup = usePrometheusSetup();
  const lastCalculatedSetup = useLastCalculatedSetup();
  const simulationResponse = useSimulationResponse();
  const navigate = useNavigate();
  usePrometheusMode();

  const items = useActiveRisks(setup);
  const { mutateAsync: runSimulation, isPending } = useRunMCSimulation(serverErrors);

  const handleBack = () => navigate(routes.PROMETHEUS_SETUP);

  const handleFinalize = async () => {
    const isUnchanged =
      lastCalculatedSetup.value !== null &&
      JSON.stringify(lastCalculatedSetup.value) === JSON.stringify(setup.value);

    if (isUnchanged && simulationResponse.value) {
      navigate('/prometheus/simulations', { replace: true });
      return;
    }

    try {
      const input = setup.value;
      const data = await runSimulation(input);
      lastCalculatedSetup.value = JSON.parse(JSON.stringify(input));
      simulationResponse.value = data;
      navigate('/prometheus/simulations', { replace: true });
    } catch {
      /* error captured in serverErrors via onError */
    }
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
