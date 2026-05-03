import { useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { SimulationSummary } from '../../interfaces';
import { formatSimCurrency } from '../../utils/formatCurrency';
import { ChartWrap } from './PercentileBreakdown.styled';

ChartJS.register(LinearScale, PointElement, LineElement, Filler, Tooltip);

interface PDFChartProps {
  summary: SimulationSummary;
  selectedWealth: number;
  percentileLabel: string;
}

const normalPDF = (x: number, mu: number, sigma: number): number => {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
};

const NUM_POINTS = 200;

export const PDFChart = ({ summary, selectedWealth, percentileLabel }: PDFChartProps) => {
  const { data, options } = useMemo(() => {
    const mu = summary.mean;
    const sigma = summary.std;
    const lo = mu - 3.5 * sigma;
    const hi = mu + 3.5 * sigma;
    const step = (hi - lo) / NUM_POINTS;

    const curvePoints: { x: number; y: number }[] = [];
    for (let i = 0; i <= NUM_POINTS; i++) {
      const x = lo + i * step;
      curvePoints.push({ x, y: normalPDF(x, mu, sigma) });
    }

    const fillLeft: { x: number; y: number }[] = [];
    for (const p of curvePoints) {
      if (p.x <= selectedWealth) fillLeft.push(p);
    }
    if (fillLeft.length > 0 && fillLeft[fillLeft.length - 1].x < selectedWealth) {
      fillLeft.push({ x: selectedWealth, y: normalPDF(selectedWealth, mu, sigma) });
    }

    const markerY = normalPDF(selectedWealth, mu, sigma);

    const chartData: ChartData<'line'> = {
      datasets: [
        {
          label: 'Density',
          data: curvePoints,
          borderColor: '#ddb7ff',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.4,
          fill: false,
        },
        {
          label: 'CDF Fill',
          data: fillLeft,
          borderColor: 'transparent',
          borderWidth: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.4,
          fill: {
            target: 'origin',
            above: 'rgba(221, 183, 255, 0.15)',
          },
        },
        {
          label: 'Selected',
          data: [{ x: selectedWealth, y: markerY }],
          borderColor: '#ffffff',
          backgroundColor: '#ddb7ff',
          borderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          showLine: false,
        },
      ],
    };

    const chartOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'point', intersect: true },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(20, 20, 20, 0.96)',
          borderColor: 'rgba(221, 183, 255, 0.25)',
          borderWidth: 1,
          titleFont: { family: 'Roboto Mono', size: 12, weight: 'bold' },
          bodyFont: { family: 'Roboto Mono', size: 11 },
          titleColor: '#ddb7ff',
          bodyColor: '#d4d4d8',
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          filter: (item) => item.datasetIndex === 2,
          callbacks: {
            title: () => percentileLabel,
            label: () => `Wealth: ${formatSimCurrency(selectedWealth)}`,
          },
        },
      },
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Simulated Wealth',
            color: '#71717a',
            font: { family: 'Roboto Mono', size: 10 },
          },
          grid: { color: 'rgba(255, 255, 255, 0.03)', drawTicks: false },
          border: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: {
            font: { family: 'Roboto Mono', size: 9 },
            color: 'rgba(150, 142, 153, 0.5)',
            callback: (val) => formatSimCurrency(Number(val)),
            maxTicksLimit: 6,
          },
        },
        y: {
          display: false,
        },
      },
    };

    return { data: chartData, options: chartOptions };
  }, [summary, selectedWealth, percentileLabel]);

  return (
    <ChartWrap>
      <Line data={data} options={options} />
    </ChartWrap>
  );
};
