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

export const Analysis = ({ setup, items }: AnalysisProps) => {
  const insights = useMemo<Insight[]>(() => {
    const pairs = setup.value.correlations.pairs;
    const scored: { a: RiskItem; b: RiskItem; value: number }[] = [];

    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const v = readPair(pairs, items[i].id, items[j].id);
        if (v === undefined) continue;
        scored.push({ a: items[i], b: items[j], value: v });
      }
    }

    if (scored.length === 0) return [];

    const maxPair = scored.reduce((acc, p) => (p.value > acc.value ? p : acc));
    const minPair = scored.reduce((acc, p) => (p.value < acc.value ? p : acc));

    const out: Insight[] = [];
    if (maxPair.value > 0.2) {
      out.push({
        tone: 'positive',
        heading: 'High Sensitivity:',
        text: `${maxPair.a.label} and ${maxPair.b.label} are strongly correlated (${formatCorrelation(maxPair.value)}). Shared drivers will amplify joint moves under stress.`,
      });
    }
    if (minPair.value < -0.2) {
      out.push({
        tone: 'negative',
        heading: 'Hedge Opportunity:',
        text: `${minPair.a.label} and ${minPair.b.label} show an inverse correlation (${formatCorrelation(minPair.value)}). This natural offset may soften drawdowns during stress events.`,
      });
    }
    return out;
  }, [items, setup.value.correlations.pairs]);

  return (
    <Grid>
      <Panel>
        <Header>
          <div>
            <Title>Matrix Analysis</Title>
            <Subtitle>
              Observations derived from current heatmap values.
            </Subtitle>
          </div>
        </Header>
        {insights.length === 0 ? (
          <Empty>
            Adjust correlations to surface sensitivity and hedge observations.
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
