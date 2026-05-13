import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavigateToExpenseConfirmation } from '../Menus/Confirmations/NavigateToExpenseConfirmation';
import { Signal } from '@preact/signals-react';
import { ExpenseResponseItem } from '@/types';

interface NavigateToExpenseAnimationProps {
  menu: Signal<string | null>;
  selectedExpense: Signal<ExpenseResponseItem | null>;
  errorMessage: Signal<string | null>;
}

export default function NavigateToExpenseAnimation({
  menu,
  selectedExpense,
  errorMessage,
}: NavigateToExpenseAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === 'navigateToExpense'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <NavigateToExpenseConfirmation
        menu={menu}
        selectedExpense={selectedExpense}
        errorMessage={errorMessage}
      />
    </CSSTransition>
  );
}
