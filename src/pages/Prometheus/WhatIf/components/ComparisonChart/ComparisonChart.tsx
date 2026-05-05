import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { MdShowChart } from 'react-icons/md';
import { WhatIfSummary } from '../../interfaces';
import { formatSimCurrency } from '../../utils';
import {
  ChartPanel,
  ChartHeader,
  HeaderLeft,
  ChartTitle,
  LegendRow,
  LegendItem,
  LegendDot,
  LegendLabel,
  ChartContainer,
} from './ComparisonChart.styled';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ComparisonChartProps {
  baseline: WhatIfSummary;
  scenario: WhatIfSummary;
}

export const ComparisonChart = ({
  baseline,
  scenario,
}: ComparisonChartProps) => {
  const { data, options } = useMemo(() => {
    const labels = ['P5 (1-in-20 Worst)', 'P25 (1-in-4)', 'Median (1-in-2)', 'P75 (3-in-4)', 'P95 (1-in-20 Best)'];

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Baseline',
          data: [
            baseline.p5,
            baseline.p25,
            baseline.median,
            baseline.p75,
            baseline.p95,
          ],
          backgroundColor: 'rgba(150, 142, 153, 0.4)',
          borderWidth: 0,
          borderRadius: 6,
        },
        {
          label: 'Scenario',
          data: [
            scenario.p5,
            scenario.p25,
            scenario.median,
            scenario.p75,
            scenario.p95,
          ],
          backgroundColor: 'rgba(221, 143, 255, 0.7)',
          borderWidth: 0,
          borderRadius: 6,
        },
      ],
    };

    const chartOptions: any = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(20, 20, 20, 0.96)',
          borderColor: 'rgba(221, 183, 255, 0.25)',
          borderWidth: 1,
          titleFont: { family: 'Roboto Mono', size: 12, weight: 'bold' },
          bodyFont: { family: 'Roboto Mono', size: 11 },
          titleColor: '#ddb7ff',
          bodyColor: '#d4d4d8',
          padding: 14,
          cornerRadius: 8,
          caretSize: 0,
          callbacks: {
            label: (ctx: any) =>
              `  ${ctx.dataset.label}: ${formatSimCurrency(ctx.parsed.y)}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: {
            font: { family: 'Roboto Mono', size: 10 },
            color: 'rgba(150, 142, 153, 0.7)',
          },
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { family: 'Roboto Mono', size: 10 },
            color: 'rgba(150, 142, 153, 0.5)',
            callback: (val: number) => formatSimCurrency(val),
            maxTicksLimit: 8,
          },
        },
      },
    };

    return { data: chartData, options: chartOptions };
  }, [baseline, scenario]);

  return (
    <ChartPanel>
      <ChartHeader>
        <HeaderLeft>
          <MdShowChart />
          <ChartTitle>Comparative Wealth Distribution</ChartTitle>
        </HeaderLeft>
        <LegendRow>
          <LegendItem>
            <LegendDot $color="#968e99" />
            <LegendLabel>Baseline</LegendLabel>
          </LegendItem>
          <LegendItem>
            <LegendDot $color="#ddb7ff" $glow />
            <LegendLabel $color="#ddb7ff">Scenario</LegendLabel>
          </LegendItem>
        </LegendRow>
      </ChartHeader>
      <ChartContainer>
        <Bar data={data} options={options} />
      </ChartContainer>
    </ChartPanel>
  );
};
