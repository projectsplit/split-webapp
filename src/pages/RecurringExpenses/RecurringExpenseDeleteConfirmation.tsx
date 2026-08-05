import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Signal } from '@preact/signals-react';
import Confirmation from '@/components/Menus/Confirmations/Confirmation';

interface RecurringExpenseDeleteConfirmationProps {
  menu: Signal<string | null>;
  description: string;
  onConfirm: () => void;
  isLoading: boolean;
}

export const RecurringExpenseDeleteConfirmation = ({
  menu,
  description,
  onConfirm,
  isLoading,
}: RecurringExpenseDeleteConfirmationProps) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={menu.value === 'deleteRecurringExpense'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <Confirmation
        menu={menu}
        onClick={onConfirm}
        isLoading={isLoading}
        header="Delete recurring expense"
      >
        {/* Spelled out because "delete" on a series could easily be read as deleting everything it
            has ever created. */}
        <div>
          {`"${description}" will stop repeating. Expenses it has already created stay where they are. Proceed?`}
        </div>
      </Confirmation>
    </CSSTransition>
  );
};
