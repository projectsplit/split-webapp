import { CSSTransition } from 'react-transition-group';
import ConfirmationForBudgetSubmission from '../../../pages/Budget/ConfirmationForBudgetSubmission/ConfirmationForBudgetSubmission';
import { CreateBudgetConfirmationAnimationProps } from '../../../interfaces';
import { useCloseOnBack } from '../../../hooks/useCloseOnBack';
import { useRef } from 'react';

export default function CreateBudgetConfirmationAnimation({
  menu,
  submitBudget,
}: CreateBudgetConfirmationAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'createBudgetConfirmation', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'createBudgetConfirmation'}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ConfirmationForBudgetSubmission
        menu={menu}
        submitBudget={submitBudget}
      />
    </CSSTransition>
  );
}
