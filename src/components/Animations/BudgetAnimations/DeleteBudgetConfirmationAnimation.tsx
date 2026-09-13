import { CSSTransition } from 'react-transition-group';
import ConfirmationForBudgetDeletion from '../../../pages/Budget/ConfirmationForBudgetDeletion/ConfirmationForBudgetDeletion';
import { DeleteBudgetConfirmationAnimationProps } from '../../../interfaces';
import { useCloseOnBack } from '../../../hooks/useCloseOnBack';
import { useRef } from 'react';

export default function DeleteBudgetConfirmationAnimation({
  menu,
  deleteBudget,
  selectedBudget,
  isLoading
}: DeleteBudgetConfirmationAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'deleteBudgetConfirmation', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'deleteBudgetConfirmation'}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ConfirmationForBudgetDeletion isLoading={isLoading} menu={menu} deleteBudget={deleteBudget} selectedBudget={selectedBudget} />
    </CSSTransition>
  );
}
