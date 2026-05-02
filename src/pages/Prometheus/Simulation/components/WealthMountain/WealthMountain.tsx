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
        <Line data={data} options={options} />
      </ChartContainer>
    </ChartCard>
  );
};
