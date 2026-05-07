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
  OrbCiRange,
  OrbInsufficient,
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

const ConditionalOrbContent = ({ response }: { response: ConditionalQueryResponse }) => {
  const { reliability, p_bust, p_bust_ci_low, p_bust_ci_high, n_subset, n_busts_in_subset } = response;

  if (reliability === 'insufficient') {
    return (
      <>
        <OrbValue $variant="conditional">--</OrbValue>
        <OrbInsufficient>
          N={n_subset}, {n_busts_in_subset} bust{n_busts_in_subset !== 1 ? 's' : ''}
        </OrbInsufficient>
      </>
    );
  }

  if (reliability === 'wide_ci') {
    return (
      <>
        <OrbValue $variant="conditional">{formatPct(p_bust)}</OrbValue>
        <OrbCiRange>
          [{formatPct(p_bust_ci_low)} – {formatPct(p_bust_ci_high)}]
        </OrbCiRange>
      </>
    );
  }

  return (
    <OrbValue
      $variant="conditional"
      title={
        p_bust_ci_low !== null && p_bust_ci_high !== null
          ? `95% CI: ${formatPct(p_bust_ci_low)} – ${formatPct(p_bust_ci_high)}`
          : undefined
      }
    >
      {formatPct(p_bust)}
    </OrbValue>
  );
};

export const ResultHero = ({ response, conditions, bondTenor }: ResultHeroProps) => {
  const { reliability } = response;
  const showWarning = reliability !== 'reliable';
  const severity: 'caution' | 'severe' = reliability === 'insufficient' ? 'severe' : 'caution';
  const warningTitle = reliability === 'insufficient'
    ? 'Insufficient data — estimate suppressed'
    : 'Wide confidence interval — interpret with caution';
  const warningBody = reliability === 'insufficient'
    ? `Only ${response.n_subset} paths matched (${response.n_busts_in_subset} bust events). The sample is too small to produce a meaningful estimate — consider loosening the conditions.`
    : `The conditional estimate has a wide 95% CI: ${formatPct(response.p_bust_ci_low)} – ${formatPct(response.p_bust_ci_high)}. The point estimate is noisy at this sample size.`;

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
              <ConditionalOrbContent response={response} />
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

        {showWarning && (
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
