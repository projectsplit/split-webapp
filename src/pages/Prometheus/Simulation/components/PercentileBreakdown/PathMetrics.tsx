import { SimulationScenario } from '../../interfaces';
import { formatSimCurrency, formatPercent, formatBps } from '../../utils/formatCurrency';
import {
  Table,
  Row,
  MetricName,
  MetricValue,
  SectionLabel,
} from './PathMetrics.styled';

interface PathMetricsProps {
  scenario: SimulationScenario;
  startingWealth: number;
}

const KNOWN_FIELDS = new Set([
  'percentile', 'wealth', 'equity_return', 'portfolio_end', 'bond_portfolio_end',
  'income', 'expenses', 'bond_pnl', 'delta_y_bps',
  'delta_infl_1yr', 'property_return', 'property_end',
  'career_severance',
]);

const pnlColor = (val: number): string =>
  val >= 0 ? '#34d399' : '#ef4444';

export const PathMetrics = ({ scenario, startingWealth }: PathMetricsProps) => {
  const wealthDiff = scenario.wealth - startingWealth;
  const wealthPct = ((wealthDiff / startingWealth) * 100).toFixed(1);

  const riskEntries = Object.entries(scenario).filter(
    ([key, val]) => !KNOWN_FIELDS.has(key) && typeof val === 'number',
  );

  return (
    <Table>
      <SectionLabel>WEALTH</SectionLabel>
      <Row>
        <MetricName>Total Wealth</MetricName>
        <MetricValue>{formatSimCurrency(scenario.wealth)}</MetricValue>
      </Row>
      <Row>
        <MetricName>Wealth Change</MetricName>
        <MetricValue $color={pnlColor(wealthDiff)}>
          {wealthDiff >= 0 ? '+' : ''}{formatSimCurrency(wealthDiff)} ({wealthPct}%)
        </MetricValue>
      </Row>

      <SectionLabel>EQUITY & BONDS</SectionLabel>
      <Row>
        <MetricName>Equity Return</MetricName>
        <MetricValue $color={pnlColor(scenario.equity_return)}>
          {formatPercent(scenario.equity_return)}
        </MetricValue>
      </Row>
      <Row>
        <MetricName>Equity Portfolio</MetricName>
        <MetricValue>{formatSimCurrency(scenario.portfolio_end)}</MetricValue>
      </Row>
      <Row>
        <MetricName>Bonds Portfolio</MetricName>
        <MetricValue>{formatSimCurrency(scenario.bond_portfolio_end)}</MetricValue>
      </Row>
      <Row>
        <MetricName>Bond P&L</MetricName>
        <MetricValue $color={pnlColor(scenario.bond_pnl)}>
          {formatSimCurrency(scenario.bond_pnl)}
        </MetricValue>
      </Row>

      <SectionLabel>MACRO</SectionLabel>
      <Row>
        <MetricName>Interest Rate Shift</MetricName>
        <MetricValue>{formatBps(scenario.delta_y_bps)}</MetricValue>
      </Row>
      <Row>
        <MetricName>Inflation Shift</MetricName>
        <MetricValue>
          {scenario.delta_infl_1yr >= 0 ? '+' : ''}
          {scenario.delta_infl_1yr.toFixed(2)}pp
        </MetricValue>
      </Row>

      {scenario.property_return !== null && (
        <>
          <SectionLabel>PROPERTY</SectionLabel>
          <Row>
            <MetricName>Property Return</MetricName>
            <MetricValue $color={pnlColor(scenario.property_return!)}>
              {formatPercent(scenario.property_return!)}
            </MetricValue>
          </Row>
          {scenario.property_end !== null && (
            <Row>
              <MetricName>Property Value</MetricName>
              <MetricValue>{formatSimCurrency(scenario.property_end)}</MetricValue>
            </Row>
          )}
        </>
      )}

      <SectionLabel>CASH FLOW</SectionLabel>
      {scenario.career_severance > 0 ? (
        <>
          <Row>
            <MetricName>Salary Income</MetricName>
            <MetricValue $color="#34d399">
              {formatSimCurrency(scenario.income - scenario.career_severance)}
            </MetricValue>
          </Row>
          <Row>
            <MetricName>Severance Package</MetricName>
            <MetricValue $color="#ddb7ff">
              {formatSimCurrency(scenario.career_severance)}
            </MetricValue>
          </Row>
          <Row>
            <MetricName>Total Income</MetricName>
            <MetricValue $color="#34d399">{formatSimCurrency(scenario.income)}</MetricValue>
          </Row>
        </>
      ) : (
        <Row>
          <MetricName>Income</MetricName>
          <MetricValue $color="#34d399">{formatSimCurrency(scenario.income)}</MetricValue>
        </Row>
      )}
      <Row>
        <MetricName>Expenses</MetricName>
        <MetricValue $color="#ef4444">{formatSimCurrency(scenario.expenses)}</MetricValue>
      </Row>

      {riskEntries.length > 0 && (
        <>
          <SectionLabel>LIFE RISKS</SectionLabel>
          {riskEntries.map(([key, val]) => (
            <Row key={key}>
              <MetricName>{key.replace(/_/g, ' ')}</MetricName>
              <MetricValue $color="#ef4444">
                {formatSimCurrency(Math.abs(val as number))}
              </MetricValue>
            </Row>
          ))}
        </>
      )}
    </Table>
  );
};
