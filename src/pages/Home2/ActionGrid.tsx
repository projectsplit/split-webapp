import {
  MdAccountBalance,
  MdQueryStats,
  MdAccountBalanceWallet,
} from 'react-icons/md';
import {
  Grid,
  ActionButton,
  ButtonLabel,
  ButtonSubtext,
} from './ActionGrid.styled';

interface ActionGridProps {
  onPersonalClick: () => void;
  onAnalyticsClick: () => void;
  onBudgetingClick: () => void;
}

export const ActionGrid = ({
  onPersonalClick,
  onAnalyticsClick,
  onBudgetingClick,
}: ActionGridProps) => {
  return (
    <Grid>
      <ActionButton $fullWidth onClick={onPersonalClick}>
        <MdAccountBalance />
        <ButtonLabel $isPrimary>Personal Ledger</ButtonLabel>
        <ButtonSubtext>All personal &amp; general expenses</ButtonSubtext>
      </ActionButton>

      <ActionButton onClick={onAnalyticsClick}>
        <MdQueryStats />
        <ButtonLabel>Analytics</ButtonLabel>
      </ActionButton>

      <ActionButton onClick={onBudgetingClick}>
        <MdAccountBalanceWallet />
        <ButtonLabel>Budgeting</ButtonLabel>
      </ActionButton>
    </Grid>
  );
};
