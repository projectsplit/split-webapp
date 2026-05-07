import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MdShowChart } from 'react-icons/md';
import { SweepRow } from '../../interfaces';
import { formatThresholdDisplay } from '../../utils';
import {
  ChartPanel,
  ChartHeader,
  HeaderLeft,
  ChartTitle,
  LegendRow,
  LegendItem,
  LegendDot,
  LegendBand,
  LegendLabel,
  ChartContainer,
} from './SweepChart.styled';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

interface SweepChartProps {
  rows: SweepRow[];
  thresholds: number[];
  baseline: number;
  factorName: string;
}

export const SweepChart = ({
  rows,
  thresholds,
  baseline,
  factorName,
}: SweepChartProps) => {
  const { data, options } = useMemo(() => {
    const labels = thresholds.map((t) => formatThresholdDisplay(t, factorName));

    const mainLine = rows.map((r) =>
      r.reliability === 'insufficient' || r.p_bust === null ? null : r.p_bust,
    );

    const ciBand = rows.map((r) =>
      r.reliability === 'insufficient' || r.p_bust_ci_high === null
        ? null
        : r.p_bust_ci_high,
    );

    const ciLow = rows.map((r) =>
      r.reliability === 'insufficient' || r.p_bust_ci_low === null
        ? null
        : r.p_bust_ci_low,
    );

    const baselineData = thresholds.map(() => baseline);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'CI Upper',
          data: ciBand,
          borderColor: 'transparent',
          backgroundColor: 'rgba(221, 183, 255, 0.12)',
          fill: '+1',
          pointRadius: 0,
          pointHitRadius: 0,
          spanGaps: false,
          order: 3,
        },
        {
          label: 'CI Lower',
          data: ciLow,
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          fill: false,
          pointRadius: 0,
          pointHitRadius: 0,
          spanGaps: false,
          order: 4,
        },
        {
          label: 'P(Ruin)',
          data: mainLine,
          borderColor: '#ddb7ff',
          backgroundColor: 'rgba(221, 183, 255, 0.08)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#131313',
          pointBorderColor: '#ddb7ff',
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#ddb7ff',
          tension: 0.3,
          spanGaps: false,
          fill: false,
          order: 1,
        },
        {
          label: 'Baseline',
          data: baselineData,
          borderColor: 'rgba(150, 142, 153, 0.5)',
          borderDash: [6, 4],
          borderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 0,
          fill: false,
          order: 2,
        },
      ],
    };

    const allValues = [
      ...mainLine.filter((v): v is number => v !== null),
      ...ciBand.filter((v): v is number => v !== null),
      ...ciLow.filter((v): v is number => v !== null),
      baseline,
    ];
    const maxVal = Math.max(...allValues);
    const minVal = Math.min(...allValues);
    const range = maxVal - minVal || 0.01;

    const chartOptions: any = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        filler: { propagate: false },
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
          filter: (item: any) => {
            return item.datasetIndex === 2 || item.datasetIndex === 3;
          },
          callbacks: {
            label: (ctx: any) => {
              if (ctx.datasetIndex === 3) {
                return `  Baseline: ${ctx.parsed.y.toFixed(4)}%`;
              }
              const row = rows[ctx.dataIndex];
              if (!row || row.p_bust === null) return '';
              const lines = [
                `  P(Ruin): ${row.p_bust.toFixed(4)}%`,
              ];
              if (row.p_bust_ci_low !== null && row.p_bust_ci_high !== null) {
                lines.push(
                  `  95% CI: [${row.p_bust_ci_low.toFixed(4)}%, ${row.p_bust_ci_high.toFixed(4)}%]`,
                );
              }
              if (row.lift !== null) {
                lines.push(`  Lift: ${row.lift.toFixed(1)}x`);
              }
              lines.push(`  Paths: ${row.n_subset.toLocaleString()} / ${row.n_total.toLocaleString()}`);
              if (row.reliability === 'wide_ci') {
                lines.push('  ⚠ Wide confidence interval');
              }
              return lines;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          border: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: {
            font: { family: 'Roboto Mono', size: 10 },
            color: 'rgba(150, 142, 153, 0.7)',
            maxRotation: 45,
          },
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          border: { display: false },
          min: Math.max(0, minVal - range * 0.15),
          max: maxVal + range * 0.15,
          ticks: {
            font: { family: 'Roboto Mono', size: 10 },
            color: 'rgba(150, 142, 153, 0.5)',
            callback: (val: number) => `${val.toFixed(3)}%`,
            maxTicksLimit: 8,
          },
        },
      },
    };

    return { data: chartData, options: chartOptions };
  }, [rows, thresholds, baseline, factorName]);

  return (
    <ChartPanel>
      <ChartHeader>
        <HeaderLeft>
          <MdShowChart />
          <ChartTitle>P(Ruin) Evolution</ChartTitle>
        </HeaderLeft>
        <LegendRow>
          <LegendItem>
            <LegendDot $color="rgba(150, 142, 153, 0.5)" $dashed />
            <LegendLabel>Baseline</LegendLabel>
          </LegendItem>
          <LegendItem>
            <LegendDot $color="#ddb7ff" />
            <LegendLabel $color="#ddb7ff">Stress Path</LegendLabel>
          </LegendItem>
          <LegendItem>
            <LegendBand />
            <LegendLabel>95% CI</LegendLabel>
          </LegendItem>
        </LegendRow>
      </ChartHeader>
      <ChartContainer>
        <Line data={data} options={options} />
      </ChartContainer>
    </ChartPanel>
  );
};
