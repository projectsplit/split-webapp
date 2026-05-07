import { MdRadar, MdTrendingDown, MdWarningAmber } from 'react-icons/md';
import { ConditionalQueryResponse, Condition, OP_LABELS } from '../../interfaces';
import { formatFactorName } from '../../utils';
import {
  HeroSection,
  AmbientOrb,
  HeroContent,
  HeroHeader,
  HeroTitle,
  ComparisonContainer,
  BackgroundOrbLeft,
  BackgroundOrbRight,
  OrbRow,
  ProbabilityOrb,
  OrbGradient,
  OrbLabel,
  OrbValue,
  VsSeparator,
  VsLine,
  VsBadge,
  FilterChips,
  FilterChip,
  SampleWarning,
  SampleWarningText,
  SampleWarningTitle,
  SampleWarningBody,
  MetricsGrid,
  MetricBox,
  MetricLabel,
  MetricValueRow,
  MetricValue,
  MetricSuffix,
} from './ResultHero.styled';

interface ResultHeroProps {
  response: ConditionalQueryResponse;
  conditions: Condition[];
  bondTenor: number;
}

const formatPct = (val: number | null): string => {
  if (val === null) return 'N/A';
  return val < 0.01 && val > 0
    ? `${val.toFixed(4)}%`
    : `${val.toFixed(2)}%`;
};

const formatLift = (val: number | null): string => {
  if (val === null) return '0.0x';
  return `${val.toFixed(1)}x`;
};

const formatConditionValue = (val: number): string => {
  if (Math.abs(val) < 1 && val !== 0) return `${(val * 100).toFixed(1)}%`;
  if (Math.abs(val) >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (Math.abs(val) >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
  return val.toFixed(1);
};

const formatConditionLabel = (c: Condition, bondTenor: number): string => {
  return `${formatFactorName(c.factor, bondTenor)} ${OP_LABELS[c.op]} ${formatConditionValue(c.value)}`;
};

const LOW_SAMPLE_THRESHOLD = 100;
const VERY_LOW_SAMPLE_THRESHOLD = 30;

export const ResultHero = ({ response, conditions, bondTenor }: ResultHeroProps) => {
  const lowSample = response.n_subset < LOW_SAMPLE_THRESHOLD;
  const verySevere = response.n_subset < VERY_LOW_SAMPLE_THRESHOLD;
  const severity: 'caution' | 'severe' = verySevere ? 'severe' : 'caution';
  const warningTitle = verySevere
    ? 'Very small subset — estimate is unreliable'
    : 'Small subset — estimate is noisy';
  const warningBody = verySevere
    ? `Only ${response.n_subset} paths matched these conditions. The conditional probability is highly uncertain — consider loosening the conditions to broaden the sample.`
    : `Only ${response.n_subset} paths matched these conditions. The conditional probability has wide error bars at this sample size — interpret with caution or relax the conditions.`;

  return (
    <HeroSection>
      <AmbientOrb />
      <HeroContent>
        <HeroHeader>
          <HeroTitle>
            <MdRadar /> Conditional Probability of Ruin
          </HeroTitle>
        </HeroHeader>

        <ComparisonContainer>
          <BackgroundOrbLeft />
          <BackgroundOrbRight />
          <OrbRow>
            <ProbabilityOrb $variant="baseline">
              <OrbGradient $variant="baseline" />
              <OrbLabel $variant="baseline">Baseline</OrbLabel>
              <OrbValue $variant="baseline">
                {formatPct(response.baseline_p_bust)}
              </OrbValue>
            </ProbabilityOrb>

            <VsSeparator>
              <VsLine />
              <VsBadge>VS</VsBadge>
              <VsLine />
            </VsSeparator>

            <ProbabilityOrb $variant="conditional">
              <OrbGradient $variant="conditional" />
              <OrbLabel $variant="conditional">Conditional</OrbLabel>
              <OrbValue $variant="conditional">
                {formatPct(response.p_bust)}
              </OrbValue>
            </ProbabilityOrb>
          </OrbRow>

          <FilterChips>
            {conditions.map((c, i) => (
              <FilterChip key={i}>
                <MdTrendingDown />
                {formatConditionLabel(c, bondTenor)}
              </FilterChip>
            ))}
          </FilterChips>
        </ComparisonContainer>

        {lowSample && (
          <SampleWarning $severity={severity}>
            <MdWarningAmber />
            <SampleWarningText>
              <SampleWarningTitle>{warningTitle}</SampleWarningTitle>
              <SampleWarningBody>{warningBody}</SampleWarningBody>
            </SampleWarningText>
          </SampleWarning>
        )}

        <MetricsGrid>
          <MetricBox>
            <MetricLabel>Filtered Trajectories</MetricLabel>
            <MetricValueRow>
              <MetricValue>
                {response.n_subset.toLocaleString()}
              </MetricValue>
              <MetricSuffix>
                / {(response.n_total / 1_000_000).toFixed(1)}M (
                {(response.frac_subset * 100).toFixed(2)}%)
              </MetricSuffix>
            </MetricValueRow>
          </MetricBox>

          <MetricBox>
            <MetricLabel>Paths to Ruin in Subset</MetricLabel>
            <MetricValueRow>
              <MetricValue>{response.n_busts_in_subset}</MetricValue>
              <MetricSuffix>Bust Events</MetricSuffix>
            </MetricValueRow>
          </MetricBox>

          <MetricBox>
            <MetricLabel>Risk Multiplier (Lift)</MetricLabel>
            <MetricValueRow>
              <MetricValue>{formatLift(response.lift)}</MetricValue>
              <MetricSuffix>baseline</MetricSuffix>
            </MetricValueRow>
          </MetricBox>
        </MetricsGrid>
      </HeroContent>
    </HeroSection>
  );
};
