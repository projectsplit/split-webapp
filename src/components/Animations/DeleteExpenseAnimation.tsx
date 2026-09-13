import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import DeleteExpenseConfirmation from '../Menus/Confirmations/DeleteExpenseConfirmation';
import { DeleteExpenseAnimationProps } from '../../interfaces';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function DeleteExpenseAnimation({
  menu,
  description,
  selectedExpense,
  errorMessage,
}: DeleteExpenseAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'deleteExpense', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'deleteExpense'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <DeleteExpenseConfirmation
        menu={menu}
        description={description}
        selectedExpense={selectedExpense}
        errorMessage={errorMessage}
      />
    </CSSTransition>
  );
}
