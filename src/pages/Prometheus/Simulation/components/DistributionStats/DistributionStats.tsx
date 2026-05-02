import { MdTrendingUp, MdEqualizer, MdShield } from 'react-icons/md';
import { SimulationSummary } from '../../interfaces';
import { formatSimCurrency } from '../../utils/formatCurrency';
import {
  Grid,
  StatCard,
  StatLabel,
  StatValue,
  StatFooter,
  RuinCardInner,
  RuinRing,
  RuinBadge,
} from './DistributionStats.styled';

interface DistributionStatsProps {
  summary: SimulationSummary;
}

const getRiskLabel = (prob: number): string => {
  if (prob < 0.03) return 'VERY LOW RISK';
  if (prob < 0.05) return 'LOW RISK';
  if (prob < 0.1) return 'MODERATE RISK';
  if (prob < 0.2) return 'ELEVATED RISK';
  return 'HIGH RISK';
};

const probToArc = (prob: number): number => {
  const circumference = 2 * Math.PI * 40;
  return circumference - circumference * Math.min(prob, 1);
};

export const DistributionStats = ({ summary }: DistributionStatsProps) => {
  const probPct =(summary.prob_negative).toFixed(3);
  const circumference = 2 * Math.PI * 42;
console.log(summary)
  return (
    <Grid>
      <StatCard>
        <div>
          <StatLabel>Expected Mean</StatLabel>
          <StatValue>{formatSimCurrency(summary.mean)}</StatValue>
        </div>
        <StatFooter style={{ color: '#34d399' }}>
          <MdTrendingUp />
          <span>MEDIAN {formatSimCurrency(summary.median)}</span>
        </StatFooter>
      </StatCard>

      <StatCard>
        <div>
          <StatLabel>Standard Deviation</StatLabel>
          <StatValue>{formatSimCurrency(summary.std)}</StatValue>
        </div>
        <StatFooter style={{ color: '#71717a' }}>
          <MdEqualizer />
          <span>σ VOLATILITY INDEX</span>
        </StatFooter>
      </StatCard>

      <StatCard style={{ position: 'relative', overflow: 'hidden' }}>
        <RuinCardInner>
          <StatLabel>Probability of Ruin</StatLabel>
          <StatValue>{probPct}%</StatValue>
        </RuinCardInner>
        <RuinRing>
          <svg
            viewBox="0 0 100 100"
            style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
          >
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="10"
            />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="#ddb7ff"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - circumference * Math.min(parseFloat(probPct), 1)}
              style={{ transition: 'stroke-dashoffset 1.2s ease' }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MdShield style={{ color: '#ddb7ff', fontSize: '1.5rem' }} />
          </div>
        </RuinRing>
        <StatFooter style={{ color: '#ddb7ff', marginTop: '1rem' }}>
          <RuinBadge>{getRiskLabel(summary.prob_negative)}</RuinBadge>
        </StatFooter>
      </StatCard>
    </Grid>
  );
};
