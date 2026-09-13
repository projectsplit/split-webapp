import { useMemo, useRef } from 'react';
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
import { buildFormExpenseFromTemplate } from './recurringExpenseHelpers';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';

interface EditRecurringExpenseAnimationProps {
  menu: Signal<string | null>;
  template: RecurringExpenseResponseItem;
  timeZoneId: string;
  timeZoneCoordinates: Coordinates;
  currency: string;
  groupMembers: Signal<(Member | Guest)[]>;
  nonGroupUsers: Signal<User[]>;
}

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
  const expense = useMemo(
    () => buildFormExpenseFromTemplate(template),
    [template]
  );
  useCloseOnBack(menu.value === 'editRecurringExpense', () => (menu.value = null));

  return (
    <CSSTransition
      in={menu.value === 'editRecurringExpense'}
      timeout={0}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ExpenseForm
        expense={expense}
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
