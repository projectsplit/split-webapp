import { useNavigate } from 'react-router-dom';
import { TopBar } from './components/TopBar/TopBar';
import { Intro } from './components/Intro/Intro';
import { Matrix } from './components/Matrix/Matrix';
import { Analysis } from './components/Analysis/Analysis';
import { PageRoot, Main, Vignette } from './Correlation.styled';
import { usePrometheusMode } from '../usePrometheusMode';
import { usePrometheusSetup } from '../PrometheusProvider';
import { useActiveRisks } from './hooks/useActiveRisks';
import routes from '@/routes';

export const PrometheusCorrelation = () => {
  const setup = usePrometheusSetup();
  const navigate = useNavigate();
  usePrometheusMode();

  const items = useActiveRisks(setup);

  const handleBack = () => navigate(routes.PROMETHEUS_SETUP);
  const handleFinalize = () => {
    // TODO: submit setup to engine
  };

  return (
    <PageRoot>
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
