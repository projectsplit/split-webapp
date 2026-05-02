import { useMemo } from 'react';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { SimulationScenario } from '../../interfaces';
import {
  formatSimCurrency,
  formatPercent,
  formatBps,
} from '../../utils/formatCurrency';

interface PercentileLine {
  label: string;
  percentile: number;
  color: string;
  width: number;
  dash?: number[];
  fillTo?: number;
  fillColor?: string;
}

const LINES: PercentileLine[] = [
  {
    label: '99.5th',
    percentile: 99.5,
    color: '#ef4444',
    width: 1.5,
    dash: [6, 3],
    fillTo: 10,
    fillColor: 'rgba(148, 163, 184, 0.04)',
  },
  { label: '99th', percentile: 99, color: '#ef4444', width: 1, dash: [4, 4] },
  {
    label: '95th',
    percentile: 95,
    color: '#ef4444',
    width: 1.5,
    dash: [6, 3],
    fillTo: 7,
    fillColor: 'rgba(148, 163, 184, 0.06)',
  },
  { label: '90th', percentile: 90, color: '#f59e0b', width: 1.5 },
  {
    label: '75th',
    percentile: 75,
    color: '#f59e0b',
    width: 2,
    fillTo: 6,
    fillColor: 'rgba(148, 163, 184, 0.08)',
  },
  { label: 'Median', percentile: 50, color: '#e2e2e2', width: 3 },
  { label: '25th', percentile: 25, color: '#f59e0b', width: 2 },
  { label: '10th', percentile: 10, color: '#f59e0b', width: 1.5 },
  { label: '5th', percentile: 5, color: '#ef4444', width: 1.5, dash: [6, 3] },
  { label: '1st', percentile: 1, color: '#ef4444', width: 1, dash: [4, 4] },
  {
    label: '0.5th',
    percentile: 0.5,
    color: '#ef4444',
    width: 1.5,
    dash: [6, 3],
  },
];

const KNOWN_FIELDS = new Set([
  'percentile',
  'wealth',
  'equity_return',
  'portfolio_end',
  'income',
  'expenses',
  'bond_pnl',
  'delta_y_bps',
  'delta_infl_1yr',
  'property_return',
  'property_end',
]);

const buildTooltipLines = (s: SimulationScenario): string[] => {
  const lines: string[] = [
    '',
    `Wealth:          ${formatSimCurrency(s.wealth)}`,
    `Equity Return:   ${formatPercent(s.equity_return)}`,
    `Portfolio End:   ${formatSimCurrency(s.portfolio_end)}`,
    `Income:          ${formatSimCurrency(s.income)}`,
    `Expenses:        ${formatSimCurrency(s.expenses)}`,
    `Bond P&L:        ${formatSimCurrency(s.bond_pnl)}`,
    `Δ Yield:         ${formatBps(s.delta_y_bps)}`,
    `Δ Inflation:     ${s.delta_infl_1yr >= 0 ? '+' : ''}${s.delta_infl_1yr.toFixed(2)}pp`,
  ];

  if (s.property_return !== null) {
    lines.push(`Property Ret:    ${formatPercent(s.property_return)}`);
  }
  if (s.property_end !== null) {
    lines.push(`Property End:    ${formatSimCurrency(s.property_end)}`);
  }

  for (const [key, val] of Object.entries(s)) {
    if (KNOWN_FIELDS.has(key) || val === null || val === 0) continue;
    if (typeof val === 'number') {
      const label = key.replace(/_/g, ' ');
      lines.push(`${label}: ${formatSimCurrency(val)}`);
    }
  }

  return lines;
};

export const useChartConfig = (
  scenarios: SimulationScenario[],
  initialWealth: number
) => {
  return useMemo(() => {
    const scenarioMap = new Map(scenarios.map((s) => [s.percentile, s]));

    const FILL_STEPS = [0, 3, 6, 9, 12];

    const datasets = LINES.map((line) => {
      const scenario = scenarioMap.get(line.percentile);
      const endWealth = scenario?.wealth ?? initialWealth;

      const points = FILL_STEPS.map((month) => ({
        x: month,
        y: initialWealth + (endWealth - initialWealth) * (month / 12),
      }));

      const lastIdx = FILL_STEPS.length - 1;
      const pointRadii = FILL_STEPS.map((_, i) =>
        i === 0 ? 3 : i === lastIdx ? 4 : 0
      );
      const pointHoverRadii = FILL_STEPS.map((_, i) =>
        i === 0 || i === lastIdx ? 7 : 0
      );

      return {
        label: line.label,
        data: points,
        borderColor: line.color,
        borderWidth: line.width,
        borderDash: line.dash ?? [],
        pointRadius: pointRadii,
        pointHoverRadius: pointHoverRadii,
        pointBackgroundColor: line.color,
        pointHoverBackgroundColor: line.color,
        pointHoverBorderColor: '#131313',
        pointHoverBorderWidth: 2,
        tension: 0,
        fill:
          line.fillTo != null
            ? {
                target: line.fillTo,
                above: line.fillColor,
                below: line.fillColor,
              }
            : false,
        scenario: scenario ?? null,
        order: line.percentile === 50 ? 0 : 1,
      };
    });

    const data: ChartData<'line'> = {
      datasets: datasets as any,
    };

    const options: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { left: 10, right: 20 } },
      interaction: { mode: 'nearest', intersect: true },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'start',
          labels: {
            color: '#a1a1aa',
            font: { family: 'Roboto Mono', size: 10 },
            boxWidth: 20,
            boxHeight: 2,
            padding: 12,
            usePointStyle: false,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(20, 20, 20, 0.96)',
          borderColor: 'rgba(221, 183, 255, 0.25)',
          borderWidth: 1,
          titleFont: { family: 'Roboto Mono', size: 11, weight: 'bold' },
          bodyFont: { family: 'Roboto Mono', size: 10 },
          titleColor: '#ddb7ff',
          bodyColor: '#d4d4d8',
          padding: 14,
          cornerRadius: 6,
          displayColors: true,
          boxWidth: 8,
          boxHeight: 8,
          filter: (item: TooltipItem<'line'>) => {
            const month = item.parsed.x;
            if (month === 0) return item.datasetIndex === 0;
            return month === 12;
          },
          callbacks: {
            title: (items: TooltipItem<'line'>[]) => {
              if (!items.length) return '';
              if (items[0].parsed.x === 0) return 'Starting Wealth';
              const ds = items[0].dataset as any;
              return `${ds.label} Percentile — 1Y`;
            },
            label: (ctx: TooltipItem<'line'>) => {
              if (ctx.parsed.x === 0)
                return `  Portfolio value: ${formatSimCurrency(ctx.parsed.y)}`;
              return '';
            },
            afterBody: (items: TooltipItem<'line'>[]) => {
              if (!items.length || items[0].parsed.x === 0) return [];
              const ds = items[0].dataset as any;
              const scenario: SimulationScenario | null = ds.scenario;
              if (!scenario) return [];
              return buildTooltipLines(scenario);
            },
          },
        },
      },
      scales: {
        x: {
          type: 'linear',
          min: -0.1,
          max: 12.1,
          title: {
            display: true,
            text: '1 Year Projection',
            color: '#a1a1aa',
            font: { family: 'Roboto Mono', size: 11, weight: 'bold' },
          },
          grid: { display: false },
          border: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { display: false },
        },
        y: {
          title: {
            display: true,
            text: 'Portfolio value',
            color: '#71717a',
            font: { family: 'Roboto Mono', size: 10 },
          },
          grid: { color: 'rgba(255, 255, 255, 0.03)', drawTicks: false },
          border: { display: false },
          ticks: {
            font: { family: 'Roboto Mono', size: 10 },
            color: 'rgba(150, 142, 153, 0.5)',
            callback: (val) => formatSimCurrency(Number(val)),
            maxTicksLimit: 10,
          },
        },
      },
    };

    return { data, options };
  }, [scenarios, initialWealth]);
};
