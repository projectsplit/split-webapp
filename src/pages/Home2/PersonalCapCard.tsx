import { MdSavings } from 'react-icons/md';
import { BudgetInfoResponse } from '@/types';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';

interface PersonalCapCardProps {
  activeBudgetData: BudgetInfoResponse;
  onClick: () => void;
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export const PersonalCapCard = ({
  activeBudgetData,
  onClick,
}: PersonalCapCardProps) => {
  const spent = parseFloat(activeBudgetData.totalAmountSpent) || 0;
  const goal = parseFloat(activeBudgetData.goal) || 1;
  const percent = (spent / goal) * 100;
  const currency = activeBudgetData.currency;

  const spentFormatted = displayCurrencyAndAmount(spent.toString(), currency);
  const goalFormatted = displayCurrencyAndAmount(goal.toString(), currency);
  const dateRange = `${formatDateShort(activeBudgetData.startDate)} - ${formatDateShort(activeBudgetData.endDate)}`;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '1rem',
        backgroundColor: '#1b1b1b',
        border: '1px solid rgba(77, 67, 84, 0.1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <MdSavings style={{ fontSize: '1.125rem', color: '#ddb7ff' }} />
        <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.2em', color: '#e2e2e2' }}>
          Personal Cap
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#e2e2e2' }}>
          {spentFormatted}
          <span style={{ color: 'rgba(207,194,214,0.4)', fontWeight: 700 }}> / {goalFormatted}</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(207,194,214,0.6)' }}>
          {Math.round(percent)}%
        </div>
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(207,194,214,0.6)', fontWeight: 500 }}>
        {dateRange}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          width: `${Math.min(percent, 100)}%`,
          background: 'rgba(221, 183, 255, 0.3)',
          borderRadius: '0 2px 0 0',
        }}
      />
    </div>
  );
};
