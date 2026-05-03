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
import { useRunMCSimulation } from '@/api/auth/CommandHooks/useRunMCSimulation';
import { useSignal } from '@preact/signals-react';
import { SimulationWaveOverlay } from '@/components/Animations/SimulationWaveOverlay';

const input = {
  economy: 'UK',
  financials: {
    savings: 10000,
    net_salary: 38400,
    savings_rate: 0.13,
    equity_value: 95000,
    bond_value: 12000,
    property_value: 0,
    bond_tenor: 2,
  },
  risk_toggles: {
    equities: true,
    yields: true,
    inflation: true,
    property: false,
    savings: true,
    salary: true,
    career_loss: true,
    career_opt_loss: 9600,
    career_pess_loss: 32000,
    career_recoverable: 1,
    severance_invest_rate: 0.2,
  },
  custom_risks: [
    {
      name: 'Medical Bill',
      once_every_x_years: 10,
      opt_loss: 1000,
      pess_loss: 10000,
      sev_dist: 'L',
      freq_dist: 'P',
      recoverable: 0,
      attributable: 0,
    },
    {
      name: 'Home Damage',
      once_every_x_years: 20,
      opt_loss: 50,
      pess_loss: 1500,
      sev_dist: 'L',
      freq_dist: 'P',
      recoverable: 0,
      attributable: 0,
    },
  ],
  correlations: {
    pairs: {
      Equity: {
        'Career Loss': 0.5,
      },
      PC1: {
        InfPC1: 0.4,
      },
    },
  },
};
export const PrometheusCorrelation = () => {
  const serverErrors = useSignal<any[]>([]);
  const setup = usePrometheusSetup();
  const navigate = useNavigate();
  usePrometheusMode();

  const items = useActiveRisks(setup);
  const { mutate: runSimulation, isPending } = useRunMCSimulation(
    navigate,
    serverErrors
  );

  const handleBack = () => navigate(routes.PROMETHEUS_SETUP);
  const handleFinalize = () => {
    runSimulation(input);
    // TODO: submit setup to engine
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
