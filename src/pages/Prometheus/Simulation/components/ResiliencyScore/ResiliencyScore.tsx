import { MdVerified } from 'react-icons/md';
import { SimulationSummary } from '../../interfaces';
import {
  ScoreWrapper,
  ScoreCard,
  ScoreHeader,
  ScoreHeaderLeft,
  ScoreSubLabel,
  ScoreTitle,
  ScoreVerified,
  ScoreCenter,
  ScoreNumber,
  ScoreLabel,
  MetricGrid,
  MetricBox,
  MetricLabel,
  MetricValue,
} from './ResiliencyScore.styled';

interface ResiliencyScoreProps {
  summary: SimulationSummary;
  nSims: number;
}

const HARDCODED_SCORE = 842;
const SCORE_LABEL = 'OPTIMAL';

export const ResiliencyScore = ({ summary, nSims }: ResiliencyScoreProps) => {
  const probPct = summary.prob_negative.toFixed(3);
  const pathsToRuin = Math.round((nSims * summary.prob_negative) / 100);

  return (
    <ScoreWrapper>
      <ScoreCard>
        <ScoreHeader>
          <ScoreHeaderLeft>
            <ScoreSubLabel>Aggregate Analysis</ScoreSubLabel>
            <ScoreTitle>Total Resiliency Score</ScoreTitle>
          </ScoreHeaderLeft>
          <ScoreVerified>
            <MdVerified />
          </ScoreVerified>
        </ScoreHeader>

        <ScoreCenter>
          <ScoreNumber>{HARDCODED_SCORE}</ScoreNumber>
          <ScoreLabel>{SCORE_LABEL}</ScoreLabel>
        </ScoreCenter>

        <MetricGrid>
          <MetricBox>
            <MetricLabel>WEALTH RUIN PROB</MetricLabel>
            <MetricValue>{probPct}%</MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricLabel>PATHS TO RUIN</MetricLabel>
            <MetricValue>{pathsToRuin.toLocaleString()}</MetricValue>
          </MetricBox>
        </MetricGrid>
      </ScoreCard>
    </ScoreWrapper>
  );
};
