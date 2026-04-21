import { useNavigate } from 'react-router-dom';
import { TopBar } from './components/TopBar/TopBar';
import { Hero } from './components/Hero/Hero';
import { AssetPortfolios } from './components/AssetPortfolios/AssetPortfolios';
import { LifeRisks } from './components/LifeRisks/LifeRisks';
import { PrimaryAction } from './components/PrimaryAction/PrimaryAction';
import { BottomNav } from './components/BottomNav/BottomNav';
import { AmbientBackground } from './components/AmbientBackground/AmbientBackground';
import {
  PageRoot,
  Main,
  ColumnGrid,
  LeftColumn,
  RightColumn,
} from './Setup.styled';
import { usePrometheusMode } from '../usePrometheusMode';

export const PrometheusSetup = () => {
  const navigate = useNavigate();
  usePrometheusMode();

  const handleBack = () => navigate("/");
  const handleComplete = () => {
    // TODO: submit setup and route to engine output screen
  };

  return (
    <PageRoot>
      <AmbientBackground />
      <TopBar onBack={handleBack} />
      <Main>
        <Hero />
        {/* <NetWorthCard amount="$536,000" delta="+1.2%" /> */}
        <ColumnGrid>
          <LeftColumn>
            <AssetPortfolios />
          </LeftColumn>
          <RightColumn>
            <LifeRisks />
          </RightColumn>
        </ColumnGrid>
        <PrimaryAction onClick={handleComplete} />
      </Main>
      <BottomNav active="risk" />
    </PageRoot>
  );
};
