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
import { useSignal } from '@preact/signals-react';
import { FinancialState } from '../interfaces';

export const PrometheusSetup = () => {
  const setup = useSignal<FinancialState>(initialState);
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
            <AssetPortfolios setup={setup}/>
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

const initialState: FinancialState = {
  financials: {
    savings: 0,
    net_salary: 0,
    savings_rate: 0,
    equity_value: 0,
    bond_value: 0,
    property_value: 0,
    bond_tenor: 10
  },
  risk_toggles: {
    equities: false,
    yields: false,
    inflation: true,
    property: false,
    savings:false,
    salary: true,
    career_loss: false,
    career_opt_loss: 0,
    career_pess_loss: 0,
    career_recoverable: 0
  },
  custom_risks: [
    {
      name: 'Critical Home Damage',
      once_every_x_years: 20,
      opt_loss: 0,
      pess_loss: 0,
      recoverable: 0,
      attributable: 0,
    },
  ],
  correlations: {
    pairs: {
      "Equity": { "Career Loss": 0.5 },
      "PC1": { "InfPC1": 0.4 }
    }
  }
};