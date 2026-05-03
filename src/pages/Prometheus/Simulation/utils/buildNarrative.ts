import { SimulationScenario } from '../interfaces';
import { formatSimCurrency, formatPercent, formatBps } from './formatCurrency';

const KNOWN_FIELDS = new Set([
  'percentile', 'wealth', 'equity_return', 'portfolio_end','bond_portfolio_end',
  'income', 'expenses', 'bond_pnl', 'delta_y_bps',
  'delta_infl_1yr', 'property_return', 'property_end',
  'career_severance',
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

const describeIncome = (s: SimulationScenario): string => {
  if (s.career_severance > 0) {
    const salary = s.income - s.career_severance;
    return `${formatSimCurrency(s.income)} in total income (${formatSimCurrency(salary)} salary + ${formatSimCurrency(s.career_severance)} severance package following a career loss event)`;
  }
  return `${formatSimCurrency(s.income)} in income`;
};

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

// -------------------- narrative builders --------------------

export const buildBestEstimate = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `The median outcome over the next year.`,
    `${cap(describeEquity(s.equity_return))}, bringing the combined equities and bonds portfolio to ${formatSimCurrency(s.portfolio_end+s.bond_portfolio_end)}.`,
  ];

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) parts.push(`${cap(bond)}.`);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) parts.push(`${cap(prop)}.`);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) parts.push(`${cap(infl)}.`);

  parts.push(
    `After earning ${describeIncome(s)} and spending ${formatSimCurrency(s.expenses)} on expenses, ${describeWealthChange(startingWealth, s.wealth)}.`,
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
    `${cap(describeIncome(s))} partially offsets expenses of ${formatSimCurrency(s.expenses)}.`,
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
    `${cap(describeIncome(s))} is not enough to cushion the blow — ${describeWealthChange(startingWealth, s.wealth)}.`,
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
    `Expenses reach ${formatSimCurrency(s.expenses)} against only ${describeIncome(s)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(
      `Multiple risk events strike simultaneously: ${risks.join(', ')}.`,
    );
  }

  parts.push(
    `The combined effect: ${describeWealthChange(startingWealth, s.wealth)}, with the combined equities and bonds portfolio at ${formatSimCurrency(s.portfolio_end + s.bond_portfolio_end)}.`,
  );

  return parts.join(' ');
};

// -------------------- upside narratives --------------------

export const buildExceptionalYear = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `An extraordinary year — only 1 in 200 years would be this good or better.`,
  ];

  parts.push(`${cap(describeEquity(s.equity_return))}.`);

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) parts.push(`${cap(bond)}.`);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) parts.push(`${cap(prop)}.`);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) parts.push(`${cap(infl)}.`);

  parts.push(
    `${cap(describeIncome(s))} and expenses of ${formatSimCurrency(s.expenses)} contribute to a remarkable outcome.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(`Despite ${risks.join(' and ')}, the strong returns dominate.`);
  }

  parts.push(
    `Overall, ${describeWealthChange(startingWealth, s.wealth)}, with the combined equities and bonds portfolio at ${formatSimCurrency(s.portfolio_end + s.bond_portfolio_end)}.`,
  );

  return parts.join(' ');
};

export const buildStrongYear = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `A very strong year — better than 99 in 100 outcomes.`,
  ];

  const drivers: string[] = [];
  drivers.push(describeEquity(s.equity_return));

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) drivers.push(bond);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) drivers.push(prop);

  parts.push(`${cap(drivers.join(', '))}.`);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) parts.push(`${cap(infl)}.`);

  parts.push(
    `After earning ${describeIncome(s)} and spending ${formatSimCurrency(s.expenses)} on expenses, ${describeWealthChange(startingWealth, s.wealth)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(`This path also includes ${risks.join(' and ')}.`);
  }

  return parts.join(' ');
};

export const buildGreatYear = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `An above-average year — better than 19 in 20 outcomes.`,
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
    `${cap(describeIncome(s))} and expenses of ${formatSimCurrency(s.expenses)} round out a strong position — ${describeWealthChange(startingWealth, s.wealth)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(`This path also includes ${risks.join(' and ')}.`);
  }

  return parts.join(' ');
};

export const buildGoodYear = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `A favourable year — better than 9 in 10 outcomes.`,
  ];

  const drivers: string[] = [];
  drivers.push(describeEquity(s.equity_return));

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) drivers.push(bond);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) drivers.push(prop);

  parts.push(`${cap(drivers.join(', '))}.`);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) parts.push(`${cap(infl)}.`);

  parts.push(
    `After earning ${describeIncome(s)} and spending ${formatSimCurrency(s.expenses)} on expenses, ${describeWealthChange(startingWealth, s.wealth)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(`This path also includes ${risks.join(' and ')}.`);
  }

  return parts.join(' ');
};

export const buildAboveAverage = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `A moderately good year — better than 3 in 4 outcomes.`,
  ];

  parts.push(
    `${cap(describeEquity(s.equity_return))}, bringing the combined equities and bonds portfolio to ${formatSimCurrency(s.portfolio_end + s.bond_portfolio_end)}.`,
  );

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) parts.push(`${cap(bond)}.`);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) parts.push(`${cap(prop)}.`);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) parts.push(`${cap(infl)}.`);

  parts.push(
    `After earning ${describeIncome(s)} and spending ${formatSimCurrency(s.expenses)} on expenses, ${describeWealthChange(startingWealth, s.wealth)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(`This path also includes ${risks.join(' and ')}.`);
  }

  return parts.join(' ');
};

export const buildBelowAverage = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `A below-median year — worse than 3 in 4 outcomes.`,
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
    `${cap(describeIncome(s))} partially offsets expenses of ${formatSimCurrency(s.expenses)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(`The path is further impacted by ${risks.join(' and ')}.`);
  }

  parts.push(`Overall, ${describeWealthChange(startingWealth, s.wealth)}.`);

  return parts.join(' ');
};

export const buildSevereYear = (
  s: SimulationScenario,
  startingWealth: number,
): string => {
  const parts: string[] = [
    `A severe outcome — worse than 99 in 100 years.`,
  ];

  parts.push(`${cap(describeEquity(s.equity_return))}.`);

  const bond = describeBonds(s.bond_pnl, s.delta_y_bps);
  if (bond) parts.push(`${cap(bond)}.`);

  const prop = describeProperty(s.property_return, s.property_end);
  if (prop) parts.push(`${cap(prop)}.`);

  const infl = describeInflation(s.delta_infl_1yr);
  if (infl) parts.push(`${cap(infl)}.`);

  parts.push(
    `Expenses reach ${formatSimCurrency(s.expenses)} against ${describeIncome(s)}.`,
  );

  const risks = getCustomRiskHits(s);
  if (risks.length > 0) {
    parts.push(`Adding to the damage: ${risks.join(' and ')}.`);
  }

  parts.push(
    `The result: ${describeWealthChange(startingWealth, s.wealth)}, with the combined equities and bonds portfolio at ${formatSimCurrency(s.portfolio_end + s.bond_portfolio_end)}.`,
  );

  return parts.join(' ');
};

// -------------------- percentile → builder map --------------------

export const PERCENTILE_BUILDERS: Record<number, (s: SimulationScenario, startingWealth: number) => string> = {
  99.5: buildExceptionalYear,
  99: buildStrongYear,
  95: buildGreatYear,
  90: buildGoodYear,
  75: buildAboveAverage,
  50: buildBestEstimate,
  25: buildBelowAverage,
  10: buildDifficultYear,
  5: buildRoughYear,
  1: buildSevereYear,
  0.5: buildNightmare,
};

export const PERCENTILE_META: Record<number, { title: string; subtitle: string }> = {
  99.5: { title: 'Exceptional Year', subtitle: 'Top 0.5% outcome — 1 in 200 year event' },
  99:   { title: 'Outstanding Year', subtitle: 'Top 1% outcome — 1 in 100 year event' },
  95:   { title: 'Great Year', subtitle: 'Top 5% outcome — 1 in 20 year event' },
  90:   { title: 'Good Year', subtitle: 'Top 10% outcome — 1 in 10 year event' },
  75:   { title: 'Above Average', subtitle: 'Top 25% outcome — better than 3 in 4 years' },
  50:   { title: 'Best Estimate', subtitle: 'Median outcome — the most typical expectation' },
  25:   { title: 'Below Average', subtitle: 'Bottom 25% outcome — worse than 3 in 4 years' },
  10:   { title: 'Difficult Year', subtitle: 'Bottom 10% outcome — 1 in 10 year event' },
  5:    { title: 'Rough Year', subtitle: 'Bottom 5% outcome — 1 in 20 year event' },
  1:    { title: 'Severe Year', subtitle: 'Bottom 1% outcome — 1 in 100 year event' },
  0.5:  { title: 'Nightmare Scenario', subtitle: 'Bottom 0.5% outcome — 1 in 200 year event' },
};
