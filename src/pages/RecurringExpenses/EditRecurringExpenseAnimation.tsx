import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { signal, Signal } from '@preact/signals-react';
import ExpenseForm from '@/components/ExpenseForm/ExpenseForm';
import {
  Coordinates,
  Guest,
  Member,
  RecurringExpenseResponseItem,
  TransactionType,
  User,
} from '@/types';
import { buildFormExpenseFromTemplate } from './utils';

interface EditRecurringExpenseAnimationProps {
  menu: Signal<string | null>;
  template: RecurringExpenseResponseItem;
  timeZoneId: string;
  timeZoneCoordinates: Coordinates;
  currency: string;
  groupMembers: Signal<(Member | Guest)[]>;
  nonGroupUsers: Signal<User[]>;
}

/**
 * The same form used to create the expense, pointed at the template instead. Submitting rewrites
 * the schedule; the expenses it has already produced are ordinary expenses and are edited from
 * their own lists.
 */
export const EditRecurringExpenseAnimation = ({
  menu,
  template,
  timeZoneId,
  timeZoneCoordinates,
  currency,
  groupMembers,
  nonGroupUsers,
}: EditRecurringExpenseAnimationProps) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={menu.value === 'editRecurringExpense'}
      timeout={0}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ExpenseForm
        expense={buildFormExpenseFromTemplate(template)}
        groupId={template.groupId ?? undefined}
        menu={menu}
        timeZoneId={timeZoneId}
        timeZoneCoordinates={timeZoneCoordinates}
        header="Edit Recurring Expense"
        isCreateExpense={false}
        currency={currency}
        groupMembers={groupMembers}
        nonGroupUsers={nonGroupUsers}
        isPersonal={signal(
          template.transactionType === TransactionType.Personal
        )}
        isnonGroupExpense={signal(
          template.transactionType === TransactionType.NonGroup
        )}
        recurringExpenseId={template.id}
        initialRecurrenceSchedule={template.schedule}
      />
    </CSSTransition>
  );
};
