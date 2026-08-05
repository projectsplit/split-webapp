import { amountIsValid } from '../../../helpers/amountIsValid';
import { CategoryMap } from '../formStore/formStoreTypes';
import {
  ExpenseRequest,
  FormExpense,
  GeoLocation,
  Label,
  PersonalExpenseRequest,
  PickerMember,
  Group,
  RecurrenceSchedule,
  RecurringExpenseRequest,
  EditRecurringExpenseRequest,
} from '../../../types';
import { Signal } from '@preact/signals-react';

export function submitExpenseFromState(
  state: {
    amount: string;
    description: string;
    currencySymbol: string;
    expenseTime: string;
    labels: Label[];
    location: GeoLocation | undefined;
    participantsByCategory: CategoryMap<PickerMember[]>;
    payersByCategory: CategoryMap<PickerMember[]>;
    participantsCategory: Signal<string>;
    payersCategory: Signal<string>;
    recurrenceSchedule: RecurrenceSchedule | null;
    setAmountError: (msg: string) => void;
    setDescriptionError: (msg: string) => void;
    setIsSubmitting: (value: boolean) => void;
    setShowAmountError: (value: boolean) => void;
  },
  inputs: {
    groupId?: string;
    createExpenseMutation: (req: ExpenseRequest) => void;
    editExpenseMutation: (req: ExpenseRequest) => void;
    createRecurringExpenseMutation: (req: RecurringExpenseRequest) => void;
    editRecurringExpenseMutation: (req: EditRecurringExpenseRequest) => void;
    recurringExpenseId?: string;
    isCreateExpense: boolean;
    expense: FormExpense | null;
    isnonGroupExpense?: Signal<boolean>;
    fromPersonal?: boolean;
    fromHomeGroup?: Signal<Group | null>;
    userId: string;
    onUserNotInExpense: () => void;
    onRecurrenceRequired: () => void;
  }
) {
  const {
    groupId,
    createExpenseMutation,
    editExpenseMutation,
    createRecurringExpenseMutation,
    editRecurringExpenseMutation,
    recurringExpenseId,
    isnonGroupExpense,
    fromPersonal,
    isCreateExpense,
    expense,
    fromHomeGroup,
    userId,
    onUserNotInExpense,
    onRecurrenceRequired,
  } = inputs;

  const participants =
    state.participantsByCategory[
      state.participantsCategory
        .value as keyof typeof state.participantsByCategory
    ];

  const payers =
    state.payersByCategory[
      state.payersCategory.value as keyof typeof state.payersByCategory
    ];

  // Deselect participants with zero amount in Shares mode
  if (state.participantsCategory.value === 'Shares') {
    participants.forEach((p) => {
      if (p.actualAmount === '0.00') {
        p.selected = false;
      }
    });
  }

  // Deselect payers with zero amount in Shares mode
  if (state.payersCategory.value === 'Shares') {
    payers.forEach((p) => {
      if (p.actualAmount === '0.00') {
        p.selected = false;
      }
    });
  }

  // A non group expense must involve the user submitting it. Checked here, after the
  // zero amount deselection above, so it holds for exactly what gets sent rather than
  // for what was selected in the picker.
  if (!fromPersonal && isnonGroupExpense?.value) {
    const userIsPayer = payers.some((p) => p.selected && p.id === userId);
    const userIsParticipant = participants.some(
      (p) => p.selected && p.id === userId
    );

    if (!userIsPayer && !userIsParticipant) {
      onUserNotInExpense();
      return;
    }
  }

  if (
    !amountIsValid(state.amount, state.setAmountError, state.setShowAmountError)
  )
    return;

  if (!state.location && state.description.length === 0) {
    state.setDescriptionError('Select a description or a location');
    return;
  }

  let expenseRequest: ExpenseRequest | PersonalExpenseRequest;
  if (fromPersonal) {
    expenseRequest = {
      amount: Number(state.amount),
      ...(isCreateExpense ? {} : { expenseId: expense?.id }),
      currency: state.currencySymbol,
      description: state.description,
      location: state.location ?? null,
      occurred: state.expenseTime,
      labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
    };
  } else if (isnonGroupExpense?.value) {
    expenseRequest = {
      amount: Number(state.amount),
      ...(isCreateExpense ? {} : { expenseId: expense?.id }),
      currency: state.currencySymbol,
      payments: payers
        .filter((value) => value.selected)
        .map((value) => ({
          userId: value.id,
          amount: Number(value.actualAmount),
        })),
      shares: participants
        .filter((value) => value.selected)
        .map((value) => ({
          userId: value.id,
          amount: Number(value.actualAmount),
        })),
      description: state.description,
      location: state.location ?? null,
      occurred: state.expenseTime,
      labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
    };
  } else {
    expenseRequest = {
      amount: Number(state.amount),
      ...(isCreateExpense
        ? { groupId: groupId || fromHomeGroup?.value?.id }
        : { expenseId: expense?.id }),
      currency: state.currencySymbol,
      payments: payers
        .filter((value) => value.selected)
        .map((value) => ({
          memberId: value.id,
          amount: Number(value.actualAmount),
        })),
      shares: participants
        .filter((value) => value.selected)
        .map((value) => ({
          memberId: value.id,
          amount: Number(value.actualAmount),
        })),
      description: state.description,
      location: state.location ?? null,
      occurred: state.expenseTime,
      labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
    };
  }

  state.setIsSubmitting(true);

  // Editing the template itself: the schedule is rewritten and every expense it already produced
  // stays exactly as submitted.
  if (recurringExpenseId) {
    if (state.recurrenceSchedule === null) {
      state.setIsSubmitting(false);
      onRecurrenceRequired();
      return;
    }

    const { groupId: _groupId, ...rest } = buildRecurringRequest(
      state,
      state.recurrenceSchedule,
      participants,
      payers,
      fromPersonal,
      isnonGroupExpense?.value ?? false,
      groupId || fromHomeGroup?.value?.id
    );

    editRecurringExpenseMutation({ ...rest, recurringExpenseId });
    return;
  }

  // A schedule only ever applies to a new expense. Editing one already submitted leaves it a
  // one-off — the series is edited from the manage screen instead, where the scope of the change
  // is clear.
  if (isCreateExpense && state.recurrenceSchedule !== null) {
    createRecurringExpenseMutation(
      buildRecurringRequest(
        state,
        state.recurrenceSchedule,
        participants,
        payers,
        fromPersonal,
        isnonGroupExpense?.value ?? false,
        groupId || fromHomeGroup?.value?.id
      )
    );
    return;
  }

  if (isCreateExpense) {
    createExpenseMutation(expenseRequest);
  } else {
    editExpenseMutation(expenseRequest);
  }
}

/**
 * The recurring endpoint takes one payload for all three scopes, so group and non-group splits ride
 * in separate fields rather than the shared payments/shares the per-scope endpoints use.
 */
function buildRecurringRequest(
  state: {
    amount: string;
    description: string;
    currencySymbol: string;
    labels: Label[];
    location: GeoLocation | undefined;
  },
  schedule: RecurrenceSchedule,
  participants: PickerMember[],
  payers: PickerMember[],
  fromPersonal: boolean | undefined,
  isNonGroup: boolean,
  groupId: string | undefined
): RecurringExpenseRequest {
  // No occurred: the schedule decides when each expense is dated, not the moment the form was
  // filled in.
  const base = {
    amount: Number(state.amount),
    currency: state.currencySymbol,
    description: state.description,
    location: state.location ?? null,
    schedule,
    labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
  };

  if (fromPersonal) {
    return base;
  }

  if (isNonGroup) {
    return {
      ...base,
      nonGroupPayments: payers
        .filter((value) => value.selected)
        .map((value) => ({
          userId: value.id,
          amount: Number(value.actualAmount),
        })),
      nonGroupShares: participants
        .filter((value) => value.selected)
        .map((value) => ({
          userId: value.id,
          amount: Number(value.actualAmount),
        })),
    };
  }

  if (!groupId) {
    return base;
  }

  return {
    ...base,
    groupId,
    payments: payers
      .filter((value) => value.selected)
      .map((value) => ({
        memberId: value.id,
        amount: Number(value.actualAmount),
      })),
    shares: participants
      .filter((value) => value.selected)
      .map((value) => ({
        memberId: value.id,
        amount: Number(value.actualAmount),
      })),
  };
}
