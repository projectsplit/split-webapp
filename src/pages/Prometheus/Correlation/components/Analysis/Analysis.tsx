import { useMemo } from 'react';
import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';
import { RiskItem } from '../../hooks/useActiveRisks';
import { readPair } from '../../hooks/useCorrelations';
import { formatCorrelation } from '../../utils/colors';
import {
  Grid,
  Panel,
  Header,
  Title,
  Subtitle,
  List,
  Item,
  Dot,
  Body,
  Strong,
  Empty,
} from './Analysis.styled';

interface AnalysisProps {
  setup: Signal<FinancialState>;
  items: RiskItem[];
}

interface Insight {
  tone: 'positive' | 'negative' | 'neutral';
  heading: string;
  text: string;
}

/* ────────────────────────────────────────────────────────
 * Economic Rationale Catalog
 *
 * Each entry maps a pair of canonical risk IDs to a
 * human-readable rationale. The insight will only be
 * rendered when BOTH risks are present in the active set.
 * ──────────────────────────────────────────────────────── */
interface RationaleEntry {
  ids: [string, string];
  heading: string;
  rationale: string;
}

const RATIONALE_CATALOG: RationaleEntry[] = [
  {
    ids: ['Equity', 'Career Loss'],
    heading: 'Equity ↔ Career Loss',
    rationale:
      'Bad returns and layoffs tend to cluster — a classic Risk-on / Risk-off linkage. Recessions that crush equity markets often trigger redundancy waves.',
  },
  {
    ids: ['Equity', 'FI Level'],
    heading: 'Equity ↔ FI Level',
    rationale:
      'Flight-to-quality regime: equity losses (risk-on shock) coincide with rates falling (level down) as capital rotates into safe-haven bonds.',
  },
  {
    ids: ['Equity', 'Inflation Level'],
    heading: 'Equity ↔ Inflation Level',
    rationale:
      'High inflation shocks tend to pressure equities via compressed real earnings and tighter monetary policy — a stagflation risk channel.',
  },
  {
    ids: ['FI Level', 'Inflation Level'],
    heading: 'FI Level ↔ Inflation Level',
    rationale:
      'Fisher link: nominal rates up (level +) broadly co-moves with inflation up (level +), reflecting central-bank reaction functions and term-premia repricing.',
  },
  {
    ids: ['Property', 'Equity'],
    heading: 'Property ↔ Equity',
    rationale:
      'General recessionary pressure and risk-off cycles hit both asset classes simultaneously, driven by tighter credit conditions and weakened demand.',
  },
  {
    ids: ['Property', 'FI Level'],
    heading: 'Property ↔ FI Level',
    rationale:
      'Interest rates down (FI Level −) often coincides with housing busts — a shared credit-cycle linkage where falling rates follow property corrections.',
  },
  {
    ids: ['Property', 'Career Loss'],
    heading: 'Property ↔ Career Loss',
    rationale:
      'Recessionary environments that trigger layoffs also tend to depress property valuations through reduced housing demand and higher foreclosure rates.',
  },
  {
    ids: ['FI Level', 'Career Loss'],
    heading: 'FI Level ↔ Career Loss',
    rationale:
      'Rate cuts (level −) frequently accompany labour market deterioration as central banks respond to rising unemployment with monetary easing.',
  },
  {
    ids: ['FI Slope', 'Inflation Level'],
    heading: 'FI Slope ↔ Inflation Level',
    rationale:
      'Yield curve slope shifts have a modest link to inflation surprises — an unexpected inflation uptick can steepen the curve through higher long-end term premia.',
  },
  {
    ids: ['Property', 'Inflation Level'],
    heading: 'Property ↔ Inflation Level',
    rationale:
      'Unexpected inflation shocks modestly pressure real property returns as rising input costs and mortgage rates dampen housing market activity.',
  },
  {
    ids: ['Expenses', 'Inflation Level'],
    heading: 'Expenses ↔ Inflation Level',
    rationale:
      'Living costs are directly driven by inflation — higher CPI shocks translate almost one-for-one into larger expense draws, eroding real wealth.',
  },
];

const hasId = (items: RiskItem[], id: string) =>
  items.some((item) => item.id === id);

export const Analysis = ({ setup, items }: AnalysisProps) => {
  const insights = useMemo<Insight[]>(() => {
    const pairs = setup.value.correlations.pairs;
    const out: Insight[] = [];

    for (const entry of RATIONALE_CATALOG) {
      const [idA, idB] = entry.ids;
      if (!hasId(items, idA) || !hasId(items, idB)) continue;

      const value = readPair(pairs, idA, idB) ?? 0;

      let tone: Insight['tone'] = 'neutral';
      if (value > 0.15) tone = 'positive';
      else if (value < -0.15) tone = 'negative';

      out.push({
        tone,
        heading: entry.heading,
        text: `${entry.rationale} (ρ = ${formatCorrelation(value)})`,
      });
    }

    return out;
  }, [items, setup.value.correlations.pairs]);

  return (
    <Grid>
      <Panel>
        <Header>
          <div>
            <Title>Economic Rationale</Title>
            <Subtitle>
              Observations derived from statistical analysis and expert
              judgement.
            </Subtitle>
          </div>
        </Header>
        {insights.length === 0 ? (
          <Empty>
            Enable at least two correlated risks to surface economic rationale.
          </Empty>
        ) : (
          <List>
            {insights.map((insight, idx) => (
              <Item key={idx}>
                <Dot $tone={insight.tone} />
                <Body>
                  <Strong>{insight.heading}</Strong> {insight.text}
                </Body>
              </Item>
            ))}
          </List>
        )}
      </Panel>
    </Grid>
  );
};
