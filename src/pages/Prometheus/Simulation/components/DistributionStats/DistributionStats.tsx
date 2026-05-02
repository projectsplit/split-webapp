import { useState } from 'react';
import { MdTrendingUp, MdEqualizer, MdShield, MdClose, MdShowChart, MdScatterPlot, MdGppMaybe } from 'react-icons/md';
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
  ExplainerWrapper,
  ExplainerCard,
  ExplainerHeader,
  ExplainerTitle,
  ExplainerCloseBtn,
  ExplainerBody,
  ExplainerParagraph,
  ExplainerHighlight,
  ExplainerAccent,
  ExplainerDivider,
  ExplainerCallout,
} from './DistributionStats.styled';

interface DistributionStatsProps {
  summary: SimulationSummary;
}

type ExplainerKey = 'median' | 'std' | 'ruin' | null;

const getRiskLabel = (prob: number): string => {
  if (prob < 0.03) return 'VERY LOW RISK';
  if (prob < 0.05) return 'LOW RISK';
  if (prob < 0.1) return 'MODERATE RISK';
  if (prob < 0.2) return 'ELEVATED RISK';
  return 'HIGH RISK';
};

export const DistributionStats = ({ summary }: DistributionStatsProps) => {
  const [activeExplainer, setActiveExplainer] = useState<ExplainerKey>(null);

  const probPct = (summary.prob_negative).toFixed(3);
  const circumference = 2 * Math.PI * 42;
  const volatilityPct = ((summary.std / summary.mean) * 100).toFixed(1);
  const volatilityPctRound = ((summary.std / summary.mean) * 100).toFixed(0);
  const rangeLow = formatSimCurrency(summary.median - summary.std);
  const rangeHigh = formatSimCurrency(summary.median + summary.std);

  const toggle = (key: ExplainerKey) =>
    setActiveExplainer(prev => (prev === key ? null : key));

  return (
    <>
      <Grid>
        <StatCard $active={activeExplainer === 'median'} onClick={() => toggle('median')}>
          <div>
            <StatLabel>Median</StatLabel>
            <StatValue>{formatSimCurrency(summary.median)}</StatValue>
          </div>
          <StatFooter style={{ color: '#34d399' }}>
            <MdTrendingUp />
            <span>MEAN {formatSimCurrency(summary.mean)}</span>
          </StatFooter>
        </StatCard>

        <StatCard $active={activeExplainer === 'std'} onClick={() => toggle('std')}>
          <div>
            <StatLabel>Standard Deviation</StatLabel>
            <StatValue>{formatSimCurrency(summary.std)}</StatValue>
          </div>
          <StatFooter style={{ color: '#71717a' }}>
            <MdEqualizer />
            <span style={{ fontSize: '15px' }}>σ VOLATILITY {volatilityPct}%</span>
          </StatFooter>
        </StatCard>

        <StatCard
          $active={activeExplainer === 'ruin'}
          onClick={() => toggle('ruin')}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
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

      {/* ── Explainer Panels ── */}

      {activeExplainer === 'median' && (
        <ExplainerWrapper key="median">
          <ExplainerCard>
            <ExplainerHeader>
              <ExplainerTitle>
                <MdShowChart /> What is the Median?
              </ExplainerTitle>
              <ExplainerCloseBtn onClick={() => setActiveExplainer(null)}>
                <MdClose />
              </ExplainerCloseBtn>
            </ExplainerHeader>

            <ExplainerBody>
              <ExplainerParagraph>
                The median is the <ExplainerHighlight>exact middle point</ExplainerHighlight> of all
                your simulated scenarios.
              </ExplainerParagraph>

              <ExplainerDivider />

              <ExplainerParagraph>
                Practically speaking: You ran <ExplainerAccent>1,000,000</ExplainerAccent> different
                future scenarios (Monte Carlo iterations). Exactly half (500,000 scenarios) resulted
                in a final wealth <ExplainerHighlight>below {formatSimCurrency(summary.median)}</ExplainerHighlight>,
                and exactly half resulted in a final wealth <ExplainerHighlight>above {formatSimCurrency(summary.median)}</ExplainerHighlight>.
              </ExplainerParagraph>

              <ExplainerCallout>
                <strong>Why it matters:</strong> It represents the most "typical" expectation. When
                planning, this is often the safest number to base decisions on because it isn't
                skewed by extreme outlier scenarios (like a massive market crash or an extreme market
                rally).
              </ExplainerCallout>
            </ExplainerBody>
          </ExplainerCard>
        </ExplainerWrapper>
      )}

      {activeExplainer === 'std' && (
        <ExplainerWrapper key="std">
          <ExplainerCard>
            <ExplainerHeader>
              <ExplainerTitle>
                <MdScatterPlot /> What is Standard Deviation?
              </ExplainerTitle>
              <ExplainerCloseBtn onClick={() => setActiveExplainer(null)}>
                <MdClose />
              </ExplainerCloseBtn>
            </ExplainerHeader>

            <ExplainerBody>
              <ExplainerParagraph>
                Your expected wealth is around <ExplainerAccent>{formatSimCurrency(summary.mean)}</ExplainerAccent>,
                but outcomes could realistically range by about <ExplainerHighlight>±{formatSimCurrency(summary.std)}</ExplainerHighlight> around
                that figure.
              </ExplainerParagraph>

              <ExplainerDivider />

              <ExplainerParagraph>
                Think of the <ExplainerAccent>{formatSimCurrency(summary.std)}</ExplainerAccent> as a measure of
                how much uncertainty surrounds your result. A smaller number means your future is more
                predictable; a larger number means more is up in the air.
              </ExplainerParagraph>

              <ExplainerParagraph>
                In this case, <ExplainerHighlight>{formatSimCurrency(summary.std)}</ExplainerHighlight> on
                a <ExplainerHighlight>{formatSimCurrency(summary.median)}</ExplainerHighlight> median means your
                wealth could comfortably land anywhere between roughly <ExplainerAccent>{rangeLow}</ExplainerAccent> and <ExplainerAccent>{rangeHigh}</ExplainerAccent> depending
                on how markets, inflation, and life events play out. That's
                a <ExplainerHighlight>~{volatilityPct}%</ExplainerHighlight> swing either way.
              </ExplainerParagraph>

              <ExplainerCallout>
                For every $1 of expected wealth, about <ExplainerAccent>{volatilityPctRound}p</ExplainerAccent> is
                uncertain. That's what a {formatSimCurrency(summary.std)} standard deviation
                on {formatSimCurrency(summary.median)} practically means — it's the size of
                the "fog" around your forecast.
              </ExplainerCallout>
            </ExplainerBody>
          </ExplainerCard>
        </ExplainerWrapper>
      )}

      {activeExplainer === 'ruin' && (
        <ExplainerWrapper key="ruin">
          <ExplainerCard>
            <ExplainerHeader>
              <ExplainerTitle>
                <MdGppMaybe /> What is Probability of Ruin?
              </ExplainerTitle>
              <ExplainerCloseBtn onClick={() => setActiveExplainer(null)}>
                <MdClose />
              </ExplainerCloseBtn>
            </ExplainerHeader>

            <ExplainerBody>
              <ExplainerParagraph>
                The probability of ruin represents the <ExplainerHighlight>number of times your
                simulated wealth went negative</ExplainerHighlight> relative to the total simulated
                paths, expressed in percentage terms.
              </ExplainerParagraph>

              <ExplainerDivider />

              <ExplainerParagraph>
                Out of all 1,000,000 Monte Carlo paths, <ExplainerAccent>{(summary.prob_negative * 10000).toFixed(0)}</ExplainerAccent> of
                them ended with your wealth falling below zero — meaning financial ruin occurred in
                those scenarios.
              </ExplainerParagraph>

              <ExplainerCallout>
                A lower probability of ruin means your financial plan is more resilient to adverse
                market conditions, inflation shocks, and unexpected life events. This metric is one
                of the most critical outputs of the simulation.
              </ExplainerCallout>
            </ExplainerBody>
          </ExplainerCard>
        </ExplainerWrapper>
      )}
    </>
  );
};
