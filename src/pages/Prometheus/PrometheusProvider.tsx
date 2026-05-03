import { createContext, useContext, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Signal, useSignal } from '@preact/signals-react';
import { FinancialState } from './interfaces';
import { useGetMostRecentRiskSetup } from '@/api/auth/QueryHooks/useGetMostRecentRiskSetup';

const PrometheusContext = createContext<Signal<FinancialState> | null>(null);

export const usePrometheusSetup = (): Signal<FinancialState> => {
  const ctx = useContext(PrometheusContext);
  if (!ctx) {
    throw new Error('usePrometheusSetup must be used within PrometheusProvider');
  }
  return ctx;
};

export const PrometheusProvider = () => {
  const setup = useSignal<FinancialState>(initialState);
  const hydrated = useRef(false);
  const { data } = useGetMostRecentRiskSetup();

  console.log(data)

  useEffect(() => {
    if (!data || hydrated.current) return;
    hydrated.current = true;
    setup.value = {
      economy: data.economy,
      financials: data.financials,
      risk_toggles: data.risk_toggles,
      custom_risks: data.custom_risks,
      correlations: data.correlations ?? { pairs: {} },
    };
  }, [data, setup]);

  return (
    <PrometheusContext.Provider value={setup}>
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
