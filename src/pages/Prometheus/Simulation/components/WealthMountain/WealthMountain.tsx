import { useRef, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { SimulationResponse } from '../../interfaces';
import { useChartConfig } from './useChartConfig';
import { cloudPlugin } from './cloudPlugin';
import {
  ChartCard,
  ChartHeader,
  HeaderInfo,
  ChartTitle,
  ChartSubtitle,
  ButtonRow,
  OutlineButton,
  SolidButton,
  ChartContainer,
} from './WealthMountain.styled';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  cloudPlugin,
);

interface WealthMountainProps {
  response: SimulationResponse;
  initialWealth: number;
  onReSimulate?: () => void;
}

export const WealthMountain = ({
  response,
  initialWealth,
  onReSimulate,
}: WealthMountainProps) => {
  const { data, options } = useChartConfig(response.scenarios, initialWealth);
  const chartRef = useRef<ChartJS<'line'>>(null);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const chart = chartRef.current;
      if (!chart) return;

      const nativeEvent = event.nativeEvent;
      const elements = chart.getElementsAtEventForMode(
        nativeEvent,
        'nearest',
        { intersect: true },
        false,
      );
      if (!elements.length) return;

      const el = elements[0];
      const pointData = chart.data.datasets[el.datasetIndex]?.data?.[el.index] as
        | { x: number }
        | undefined;
      if (!pointData || pointData.x !== 12) return;

      const ds = chart.data.datasets[el.datasetIndex] as any;
      const percentile: number | undefined = ds?.scenario?.percentile;
      if (percentile == null) return;

      navigate(`/prometheus/simulations/${percentile}`, {
        state: { simulationResponse: response, percentile },
      });
    },
    [navigate, response],
  );

  const simLabel =
    response.n_sims >= 1_000_000
      ? `${(response.n_sims / 1_000_000).toFixed(0)}M`
      : response.n_sims.toLocaleString();

  return (
    <ChartCard>
      <ChartHeader>
        <HeaderInfo>
          <ChartTitle>Simulated Wealth at key percentiles</ChartTitle>
          <ChartSubtitle>
            PERCENTILE DISTRIBUTION // {simLabel} SIMULATIONS // 1-YEAR HORIZON
          </ChartSubtitle>
        </HeaderInfo>
        <ButtonRow>
          <OutlineButton>EXPORT</OutlineButton>
          {onReSimulate && (
            <SolidButton onClick={onReSimulate}>RE-SIMULATE</SolidButton>
          )}
        </ButtonRow>
      </ChartHeader>
      <ChartContainer>
        <Line
          ref={chartRef}
          data={data}
          options={options}
          onClick={handleClick}
        />
      </ChartContainer>
    </ChartCard>
  );
};
