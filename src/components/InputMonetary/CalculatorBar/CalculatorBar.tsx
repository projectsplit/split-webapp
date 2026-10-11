import { AMOUNT_OPERATORS, AmountOperator } from '@/helpers/amountExpression';
import { StyledCalculatorBar } from './CalculatorBar.styled';

const OPERATOR_NAMES: Record<AmountOperator, string> = {
  '+': 'Add',
  '−': 'Subtract',
  '×': 'Multiply',
  '÷': 'Divide',
};

interface CalculatorBarProps {
  onOperator: (operator: AmountOperator) => void;
  onEquals: () => void;
  canAddOperator: boolean;
  canApplyResult: boolean;
}

// Keys are aria-disabled rather than disabled: a disabled button gets no mousedown to cancel, so
// tapping one would take focus from the amount and close the keyboard.
export default function CalculatorBar({
  onOperator,
  onEquals,
  canAddOperator,
  canApplyResult,
}: CalculatorBarProps) {
  return (
    // Keeps focus in the amount, so the keyboard stays open while keys are pressed here.
    <StyledCalculatorBar onMouseDown={(e) => e.preventDefault()}>
      {AMOUNT_OPERATORS.map((operator) => (
        <button
          key={operator}
          type="button"
          aria-label={OPERATOR_NAMES[operator]}
          aria-disabled={!canAddOperator}
          onClick={() => canAddOperator && onOperator(operator)}
        >
          {operator}
        </button>
      ))}
      <button
        type="button"
        className="equals"
        aria-label="Equals"
        aria-disabled={!canApplyResult}
        onClick={() => canApplyResult && onEquals()}
      >
        =
      </button>
    </StyledCalculatorBar>
  );
}
