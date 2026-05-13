import { CSSTransition } from 'react-transition-group';
import ConfirmationForBudgetDeletion from '../../../pages/Budget/ConfirmationForBudgetDeletion/ConfirmationForBudgetDeletion';
import { DeleteBudgetConfirmationAnimationProps } from '../../../interfaces';

export default function DeleteBudgetConfirmationAnimation({
  menu,
  deleteBudget,
  selectedBudget,
  isLoading
}: DeleteBudgetConfirmationAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === 'deleteBudgetConfirmation'}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <ConfirmationForBudgetDeletion isLoading={isLoading} menu={menu} deleteBudget={deleteBudget} selectedBudget={selectedBudget} />
    </CSSTransition>
  );
}
