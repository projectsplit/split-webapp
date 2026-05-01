export interface Financials {
  savings: number;
  net_salary: number;
  savings_rate: number;
  equity_value: number;
  bond_value: number;
  property_value: number;
  bond_tenor: number;
}

export interface RiskToggles {
  equities: boolean;
  yields: boolean;
  inflation: boolean;
  property: boolean;
  savings:boolean;
  salary: boolean;
  career_loss: boolean;
  career_opt_loss: number;
  career_pess_loss: number;
  career_recoverable: number;
  severance_invest_rate: number;
}

export interface CustomRisk {
  name: string;
  once_every_x_years: number;
  opt_loss: number;
  pess_loss: number;
  sev_dist?: 'L' | 'N' | string; // 'L' for Lognormal, etc.
  freq_dist?: 'P' | 'B' | string; // 'P' for Poisson, etc.
  recoverable: number;
  attributable: number;
}

export interface Correlations {
  pairs: {
    [key: string]: {
      [target: string]: number;
    };
  };
}

export interface FinancialState {
  economy:string;
  financials: Financials;
  risk_toggles: RiskToggles;
  custom_risks: CustomRisk[];
  correlations: Correlations;
}