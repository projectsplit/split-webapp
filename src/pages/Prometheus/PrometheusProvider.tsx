import { createContext, useContext, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Signal, useSignal } from '@preact/signals-react';
import { FinancialState } from './interfaces';
import { SimulationResponse } from './Simulation/interfaces';
import { useGetMostRecentRiskSetup } from '@/api/auth/QueryHooks/useGetMostRecentRiskSetup';
import { useGetCalculatedWealth } from '@/api/auth/QueryHooks/useGetCalculatedWealth';

type PrometheusContextValue = {
  setup: Signal<FinancialState>;
  lastCalculatedSetup: Signal<FinancialState | null>;
  simulationResponse: Signal<SimulationResponse | null>;
};

const PrometheusContext = createContext<PrometheusContextValue | null>(null);

const useCtx = () => {
  const ctx = useContext(PrometheusContext);
  if (!ctx) {
    throw new Error('Prometheus hooks must be used within PrometheusProvider');
  }
  return ctx;
};

export const usePrometheusSetup = (): Signal<FinancialState> => useCtx().setup;
export const useLastCalculatedSetup = (): Signal<FinancialState | null> => useCtx().lastCalculatedSetup;
export const useSimulationResponse = (): Signal<SimulationResponse | null> => useCtx().simulationResponse;

export const PrometheusProvider = () => {
  const setup = useSignal<FinancialState>(initialState);
  const lastCalculatedSetup = useSignal<FinancialState | null>(null);
  const simulationResponse = useSignal<SimulationResponse | null>(null);
  const hydrated = useRef(false);
  const { data: setupData } = useGetMostRecentRiskSetup();
  const { data: calculatedWealth } = useGetCalculatedWealth();

  useEffect(() => {
    if (!setupData || hydrated.current) return;
    hydrated.current = true;
    const hydratedSetup: FinancialState = {
      economy: setupData.economy,
      financials: setupData.financials,
      risk_toggles: setupData.risk_toggles,
      custom_risks: setupData.custom_risks,
      correlations: setupData.correlations ?? { pairs: {} },
    };
    setup.value = hydratedSetup;
    lastCalculatedSetup.value = JSON.parse(JSON.stringify(hydratedSetup));
  }, [setupData, setup, lastCalculatedSetup]);

  useEffect(() => {
    if (calculatedWealth && !simulationResponse.value) {
      simulationResponse.value = calculatedWealth;
    }
  }, [calculatedWealth, simulationResponse]);

  return (
    <PrometheusContext.Provider value={{ setup, lastCalculatedSetup, simulationResponse }}>
      <Outlet />
    </PrometheusContext.Provider>
  );
};

const initialState: FinancialState = {
  economy: 'US',
  financials: {
    savings: 0,
    net_salary: 0,
    savings_rate: 0,
    equity_value: 0,
    bond_value: 0,
    property_value: 0,
    bond_tenor: 10,
  },
  risk_toggles: {
    equities: false,
    yields: false,
    inflation: true,
    property: false,
    savings: false,
    salary: false,
    career_loss: false,
    career_opt_loss: 0,
    career_pess_loss: 0,
    career_recoverable: 0,
    career_once_every: 5,
    severance_invest_rate: 0,
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
    pairs: {},
  },
};
