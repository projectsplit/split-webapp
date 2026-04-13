import { MdGroup, MdSavings } from 'react-icons/md';
import { Details, BudgetInfoResponse, Frequency } from '@/types';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import {
  Grid,
  GlassCard,
  CardHeader,
  CardIcon,
  CardLabel,
  CardAmount,
  CardSubtext,
  BalanceLine,
  ProgressBar,
} from './BalanceGrid.styled';

interface BalanceGridProps {
  totalBalances: Details;
  activeBudgetData: BudgetInfoResponse | undefined;
  onSharedClick: () => void;
  onBudgetClick: () => void;
}

export const BalanceGrid = ({
  totalBalances,
  activeBudgetData,
  onSharedClick,
  onBudgetClick,
}: BalanceGridProps) => {
  return (
    <Grid>
      <SharedBalanceCard
        totalBalances={totalBalances}
        onClick={onSharedClick}
      />
      {activeBudgetData && (
        <PersonalCapCard
          activeBudgetData={activeBudgetData}
          onClick={onBudgetClick}
        />
      )}
    </Grid>
  );
};

function SharedBalanceCard({
  totalBalances,
  onClick,
}: {
  totalBalances: Details;
  onClick: () => void;
}) {
  const positiveEntries = Object.entries(totalBalances).filter(
    ([, amount]) => amount > 0
  );
  const negativeEntries = Object.entries(totalBalances).filter(
    ([, amount]) => amount < 0
  );

  const formatEntries = (entries: [string, number][]) =>
    entries
      .map(([currency, amount]) =>
        displayCurrencyAndAmount(Math.abs(amount).toString(), currency)
      )
      .join(' + ');

  const allZero =
    Object.values(totalBalances).every((v) => v === 0) ||
    Object.keys(totalBalances).length === 0;

  return (
    <GlassCard $accentColor="#4ae176" onClick={onClick}>
      <CardHeader>
        <CardIcon $color="#4ae176">
          <MdGroup />
        </CardIcon>
        <CardLabel>Shared</CardLabel>
      </CardHeader>
      {allZero ? (
        <>
          <CardAmount style={{ color: '#4ae176' }}>Settled</CardAmount>
          <CardSubtext>All balances settled</CardSubtext>
        </>
      ) : (
        <>
          {negativeEntries.length > 0 && (
            <BalanceLine $color="#4ae176">
              You are owed {formatEntries(negativeEntries)}
            </BalanceLine>
          )}
          {positiveEntries.length > 0 && (
            <BalanceLine $color="#fc6f6f">
              You owe {formatEntries(positiveEntries)}
            </BalanceLine>
          )}
        </>
      )}
    </GlassCard>
  );
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function getFrequencyLabel(frequency: Frequency): string {
  switch (frequency) {
    case Frequency.Weekly:
      return 'Weekly';
    case Frequency.Monthly:
      return 'Monthly';
    case Frequency.Annually:
      return 'Annual';
    case Frequency.Custom:
      return 'Custom';
    default:
      return '';
  }
}

function PersonalCapCard({
  activeBudgetData,
  onClick,
}: {
  activeBudgetData: BudgetInfoResponse;
  onClick: () => void;
}) {
  const spent = parseFloat(activeBudgetData.totalAmountSpent) || 0;
  const goal = parseFloat(activeBudgetData.goal) || 1;
  const percent = (spent / goal) * 100;
  const currency = activeBudgetData.currency;

  const spentFormatted = displayCurrencyAndAmount(spent.toString(), currency);
  const goalFormatted = displayCurrencyAndAmount(goal.toString(), currency);

  const dateRange = `${formatDateShort(activeBudgetData.startDate)} - ${formatDateShort(activeBudgetData.endDate)}`;
  const frequencyLabel = getFrequencyLabel(activeBudgetData.frequency);

  return (
    <GlassCard $accentColor="#ddb7ff" onClick={onClick}>
      <CardHeader>
        <CardIcon $color="#ddb7ff">
          <MdSavings />
        </CardIcon>
        <CardLabel>Personal Cap</CardLabel>
      </CardHeader>
      <CardAmount>
        {spentFormatted}
        <span
          style={{
            color: 'rgba(207,194,214,0.4)',
            fontWeight: 400,
          }}
        >
          {' '}
          / {goalFormatted}
        </span>
      </CardAmount>
      <CardSubtext>
        {frequencyLabel} budget · {dateRange}
      </CardSubtext>
      <ProgressBar $percent={percent} />
    </GlassCard>
  );
}
