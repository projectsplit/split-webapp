import { SimulationScenario } from '../interfaces';
import { formatSimCurrency, formatPercent, formatBps } from './formatCurrency';

const KNOWN_FIELDS = new Set([
  'percentile', 'wealth', 'equity_return', 'portfolio_end',
  'income', 'expenses', 'bond_pnl', 'delta_y_bps',
  'delta_infl_1yr', 'property_return', 'property_end',
]);

const getCustomRiskHits = (scenario: SimulationScenario): string[] => {
  const hits: string[] = [];
  for (const [key, val] of Object.entries(scenario)) {
    if (KNOWN_FIELDS.has(key) || val === null || val === 0) continue;
    if (typeof val === 'number') {
      const label = key.replace(/_/g, ' ');
      hits.push(`a ${label} costing ${formatSimCurrency(Math.abs(val))}`);
    }
  }
  return hits;
};

// -------------------- component describers --------------------

const describeEquity = (ret: number): string => {
  const pct = formatPercent(ret);  // ret is already signed, e.g. -0.395 → "-39.5%"
  if (ret <= -0.3) return `equities collapse ${pct}`;
  if (ret <= -0.15) return `equities fall sharply ${pct}`;
  if (ret <= -0.05) return `equities decline ${pct}`;
  if (ret < 0) return `equities dip slightly at ${pct}`;
  if (ret < 0.05) return `equities are roughly flat at ${pct}`;
  if (ret < 0.15) return `equities gain ${pct}`;
  return `equities rally ${pct}`;
};

const describeInflation = (delta: number | null): string | null => {
  if (delta === null) return null;
  const sign = delta >= 0 ? '+' : '';
  const pp = `${sign}${delta.toFixed(1)}pp`;
  if (delta > 3) return `inflation surges ${pp} above expected levels, sharply eroding purchasing power`;
  if (delta > 1) return `inflation rises ${pp} above expected levels, pushing up the cost of living`;
  if (delta > 0.3) return `inflation edges ${pp} above expected levels`;
  if (delta > -0.3) return `inflation is broadly in line with expectations (${pp})`;
  if (delta > -1) return `inflation comes in ${pp} below expectations, relieving cost pressures`;
  return `inflation undershoots expectations by ${Math.abs(delta).toFixed(1)}pp, reducing expenses`;
};

const describeBonds = (pnl: number | null, bps: number | null): string | null => {
  if (pnl === null) return null;
  const rateCtx = bps !== null && Math.abs(bps) >= 15
    ? ` as rates ${bps > 0 ? 'rise' : 'fall'} ${formatBps(bps)}`  // bps already signed: +261bp or -50bp
    : '';
  if (pnl < -1000) return `bonds lose ${formatSimCurrency(Math.abs(pnl))}${rateCtx}`;
  if (pnl > 1000) return `bonds gain ${formatSimCurrency(pnl)}${rateCtx}`;
  return `bonds are roughly flat${rateCtx}`;
};

const describeProperty = (ret: number | null, end: number | null): string | null => {
  if (ret === null) return null;
  const pct = formatPercent(ret);  // signed
  const endStr = end !== null ? `, ending at ${formatSimCurrency(end)}` : '';
  if (ret <= -0.15) return `property crashes ${pct}${endStr}`;
  if (ret <= -0.05) return `property declines ${pct}${endStr}`;
  if (ret < 0.02) return `property is flat at ${pct}${endStr}`;
  if (ret < 0.1) return `property appreciates ${pct}${endStr}`;
  return `property surges ${pct}${endStr}`;
};

const describeWealthChange = (
  starting: number,
  ending: number,
): string => {
  const diff = ending - starting;
  const pct = (diff / starting) * 100;
  const sign = pct >= 0 ? '+' : '';
  if (diff >= 0) {
    return `wealth grows by ${formatSimCurrency(diff)} (${sign}${pct.toFixed(1)}%) to ${formatSimCurrency(ending)}`;
  }
  return `wealth falls by ${formatSimCurrency(Math.abs(diff))} (${pct.toFixed(1)}%) to ${formatSimCurrency(ending)}`;
};

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

// -------------------- narrative builders --------------------

export const buildBestEstimate = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `The median outcome over the next year.`,
    `${cap(describeEquity(s.equity_return))}, bringing the portfolio to ${formatSimCurrency(s.portfolio_end)}.`,
  ];

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) parts.push(`${cap(bond)}.`);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) parts.push(`${cap(prop)}.`);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) parts.push(`${cap(infl)}.`);

  parts.push(
    `After earning ${formatSimCurrency(s.income)} in income and spending ${formatSimCurrency(s.expenses)} on expenses, ${describeWealthChange(startingWealth, s.wealth)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(`This path also includes ${risks.join(' and ')}.`);
  }

  return parts.join(' ');
};

export const buildDifficultYear = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `A below-average but plausible year — worse than 9 in 10 outcomes.`,
  ];

  const drivers: string[] = [];
  drivers.push(describeEquity(s.equity_return));

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) drivers.push(bond);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) drivers.push(prop);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) drivers.push(infl);

  parts.push(`${cap(drivers.join(', '))}.`);

  parts.push(
    `Income of ${formatSimCurrency(s.income)} partially offsets expenses of ${formatSimCurrency(s.expenses)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(`The path is further hit by ${risks.join(' and ')}.`);
  }

  parts.push(`Overall, ${describeWealthChange(startingWealth, s.wealth)}.`);

  return parts.join(' ');
};

export const buildRoughYear = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `A stress scenario — only 1 in 20 years would be this bad or worse.`,
  ];

  const drivers: string[] = [];
  drivers.push(describeEquity(s.equity_return));

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) drivers.push(bond);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) drivers.push(prop);

  parts.push(`${cap(drivers.join(', '))}.`);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) {
    parts.push(
      `${cap(infl)}, pushing expenses to ${formatSimCurrency(s.expenses)}.`,
    );
  } else {
    parts.push(`Expenses reach ${formatSimCurrency(s.expenses)}.`);
  }

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(
      `On top of the market losses, ${risks.join(' and ')} compound the damage.`,
    );
  }

  parts.push(
    `Income of ${formatSimCurrency(s.income)} is not enough to cushion the blow — ${describeWealthChange(startingWealth, s.wealth)}.`,
  );

  return parts.join(' ');
};

export const buildNightmare = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `A tail-risk scenario — this severe only 1 in 200 years.`,
  ];

  parts.push(`${cap(describeEquity(s.equity_return))}.`);

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) parts.push(`${cap(bond)}.`);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) parts.push(`${cap(prop)}.`);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) parts.push(`${cap(infl)}.`);

  parts.push(
    `Expenses reach ${formatSimCurrency(s.expenses)} against income of only ${formatSimCurrency(s.income)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(
      `Multiple risk events strike simultaneously: ${risks.join(', ')}.`,
    );
  }

  parts.push(
    `The combined effect: ${describeWealthChange(startingWealth, s.wealth)}, with the portfolio at ${formatSimCurrency(s.portfolio_end)}.`,
  );

  return parts.join(' ');
};
