import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { InsightsCarousel } from './components/InsightsCarousel/InsightsCarousel';
import { Initialization } from './components/Initialization/Initialization';
import { PageRoot, Main } from './Welcome.styled';
import { usePrometheusMode } from '../usePrometheusMode';

export const PROMETHEUS_WELCOME_SEEN_KEY = 'prometheusWelcomeSeen';

export const PrometheusWelcome = () => {
  const navigate = useNavigate();
  usePrometheusMode();

  const handleInitialize = () => {
    // localStorage.setItem(PROMETHEUS_WELCOME_SEEN_KEY, 'true');
    navigate('/prometheus/setup');
  };

  return (
    <PageRoot>
      {/* <AmbientEffects /> */}
      <Main>
        <Header />
        <InsightsCarousel />
        <Initialization onInitialize={handleInitialize} />
      </Main>
    </PageRoot>
  );
};
