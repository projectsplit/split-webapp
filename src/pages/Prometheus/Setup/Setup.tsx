import { useNavigate } from 'react-router-dom';
import { TopBar } from './components/TopBar/TopBar';
import { Hero } from './components/Hero/Hero';
import { AssetPortfolios } from './components/AssetPortfolios/AssetPortfolios';
import { LifeRisks } from './components/LifeRisks/LifeRisks';
import { PrimaryAction } from './components/PrimaryAction/PrimaryAction';
import { AmbientBackground } from './components/AmbientBackground/AmbientBackground';
import {
  PageRoot,
  Main,
  ColumnGrid,
  LeftColumn,
  RightColumn,
} from './Setup.styled';
import { usePrometheusMode } from '../usePrometheusMode';
import { usePrometheusSetup } from '../PrometheusProvider';
import routes from '@/routes';

export const PrometheusSetup = () => {
  const setup = usePrometheusSetup();
  const navigate = useNavigate();
  usePrometheusMode();

  const handleBack = () => navigate('/');
  const handleComplete = () => navigate(routes.PROMETHEUS_CORRELATION);

  return (
    <PageRoot>
      <AmbientBackground />
      <TopBar onBack={handleBack} />
      <Main>
        <Hero />
        <ColumnGrid>
          <LeftColumn>
            <AssetPortfolios setup={setup} />
          </LeftColumn>
          <RightColumn>
            <LifeRisks setup={setup} />
          </RightColumn>
        </ColumnGrid>
        <PrimaryAction onClick={handleComplete} />
      </Main>
    </PageRoot>
  );
};
