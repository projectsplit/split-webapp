import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { signal, useSignal } from '@preact/signals-react';
import {
  MdGroup,
  MdLocationOn,
  MdOpenInNew,
  MdPause,
  MdPlayArrow,
} from 'react-icons/md';
import { FaRepeat } from 'react-icons/fa6';
import TopBarWithBackButton from '@/components/TopBarWithBackButton/TopBarWithBackButton';
import MyButton from '@/components/MyButton/MyButton';
import Spinner from '@/components/Spinner/Spinner';
import LongPressMenu from '@/components/LongPressMenu/LongPressMenu';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import ErrorMenuAnimation from '@/components/Animations/ErrorMenuAnimation';
import Pill from '@/components/Pill/Pill';
import labelColors from '@/labelColors';
import { useGetRecurringExpenses } from '@/api/auth/QueryHooks/useGetRecurringExpenses';
import { useDeleteRecurringExpense } from '@/api/auth/CommandHooks/useDeleteRecurringExpense';
import { useToggleRecurringExpenseStatus } from '@/api/auth/CommandHooks/useToggleRecurringExpenseStatus';
import { useGetAllNonGroupUsers } from '@/api/auth/QueryHooks/useGetAllNonGroupUsers';
import useGroup from '@/api/auth/QueryHooks/useGroup';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { FormatDateTime } from '@/helpers/timeHelpers';
import { scheduleSentence } from '@/helpers/recurrence';
import {
  Mode,
  RecurringExpenseResponseItem,
  TransactionType,
  UserInfo,
} from '@/types';
import {
  StyledRecurringExpenseRow,
  StyledRecurringExpenses,
} from './RecurringExpenses.styled';
import {
  buildFormExpenseFromTemplate,
  buildJumpPath,
  clearFiltersForJump,
  scopeLabel,
} from './utils';
import { RecurringExpenseDeleteConfirmation } from './RecurringExpenseDeleteConfirmation';
import { EditRecurringExpenseAnimation } from './EditRecurringExpenseAnimation';

export const RecurringExpenses = () => {
  const navigate = useNavigate();
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  const timeZoneId = userInfo?.timeZone;

  // Two signals rather than one: the long-press sheet brings its own backdrop, so sharing a signal
  // with MenuAnimationBackground would stack a second one behind it.
  const menu = useSignal<string | null>(null);
  const rowMenu = useSignal<string | null>(null);
  const errorMessage = useSignal<string>('');

  const [selected, setSelected] =
    useState<RecurringExpenseResponseItem | null>(null);

  const { data, isFetching } = useGetRecurringExpenses();

  const showError = (message: string) => {
    errorMessage.value = message;
    menu.value = 'error';
  };

  const { mutate: deleteRecurringExpense, isPending: isDeleting } =
    useDeleteRecurringExpense(() => (rowMenu.value = null), showError);

  const { mutate: toggleStatus } = useToggleRecurringExpenseStatus(showError);

  // The form needs the same member context the expense lists give it. Called with a fixed mode
  // because useGetAllNonGroupUsers returns early before its own hooks for Mode.Personal — deriving
  // the mode from the selected row would change the hook count as the selection moves between
  // scopes. The query is cached and shared, so asking for it unconditionally costs one request.
  const { allUsers } = useGetAllNonGroupUsers(Mode.NonGroup);

  const { data: selectedGroup } = useGroup(
    selected?.transactionType === TransactionType.Group
      ? (selected.groupId ?? undefined)
      : undefined
  );

  const recurringExpenses = data?.recurringExpenses ?? [];

  const openLatestExpense = (template: RecurringExpenseResponseItem) => {
    const path = buildJumpPath(template);

    if (!path) return;

    clearFiltersForJump(template);
    navigate(path);
  };

  return (
    <StyledRecurringExpenses>
      <TopBarWithBackButton
        header="Recurring Expenses"
        onClick={() => navigate('/')}
      />

      {isFetching && recurringExpenses.length === 0 ? (
        <div className="spinnerContainer">
          <Spinner />
        </div>
      ) : recurringExpenses.length === 0 ? (
        <div className="empty">
          You have no recurring expenses. Create one by picking a cycle when you
          submit an expense.
        </div>
      ) : (
        <div className="scrollContainer">
          {recurringExpenses.map((template) => (
            <RecurringExpenseRow
              key={template.id}
              template={template}
              timeZoneId={timeZoneId}
              // Opening the actions rather than jumping. A schedule usually has no expense yet —
              // a new one has none until its first slot, and the expense it did create can be
              // deleted like any other — so jumping cannot be the thing a tap does.
              onOpen={() => {
                setSelected(template);
                rowMenu.value = 'options';
              }}
            />
          ))}
        </div>
      )}

      <div className="submitButton">
        <MyButton fontSize="16" onClick={() => navigate('/')} isLoading={false}>
          Done
        </MyButton>
      </div>

      {rowMenu.value === 'options' && selected && (
        <LongPressMenu
          onEdit={() => (rowMenu.value = 'editRecurringExpense')}
          onDelete={() => (rowMenu.value = 'deleteRecurringExpense')}
          onClose={() => (rowMenu.value = null)}
          extraOptions={[
            {
              label: selected.isPaused ? 'Resume' : 'Pause',
              icon: selected.isPaused ? <MdPlayArrow /> : <MdPause />,
              onClick: () => toggleStatus(selected.id),
            },
            // Offered only when there is one to open. Deleting the expense a series produced
            // leaves the schedule intact and this option simply goes away, rather than becoming
            // a button that fails.
            ...(selected.lastExpenseId
              ? [
                  {
                    label: 'Go to latest expense',
                    icon: <MdOpenInNew />,
                    onClick: () => openLatestExpense(selected),
                  },
                ]
              : []),
          ]}
        />
      )}

      {/* The confirmation is a floating card with no backdrop of its own. */}
      {rowMenu.value === 'deleteRecurringExpense' && (
        <MenuAnimationBackground menu={rowMenu} />
      )}
      <MenuAnimationBackground menu={menu} />

      <ErrorMenuAnimation
        menu={menu}
        message={errorMessage.value}
        type="recurring expense"
      />

      <RecurringExpenseDeleteConfirmation
        menu={rowMenu}
        description={selected?.description ?? ''}
        onConfirm={() => selected && deleteRecurringExpense(selected.id)}
        isLoading={isDeleting}
      />

      {selected && (
        <EditRecurringExpenseAnimation
          menu={rowMenu}
          template={selected}
          timeZoneId={timeZoneId}
          timeZoneCoordinates={userInfo?.timeZoneCoordinates}
          currency={userInfo?.currency}
          groupMembers={signal(
            selectedGroup
              ? [...selectedGroup.members, ...selectedGroup.guests]
              : []
          )}
          nonGroupUsers={signal(allUsers)}
        />
      )}
    </StyledRecurringExpenses>
  );
};

interface RecurringExpenseRowProps {
  template: RecurringExpenseResponseItem;
  timeZoneId: string;
  onOpen: () => void;
}

const RecurringExpenseRow = ({
  template,
  timeZoneId,
  onOpen,
}: RecurringExpenseRowProps) => {
  return (
    <StyledRecurringExpenseRow $isPaused={template.isPaused} onClick={onOpen}>
      <div className="topRow">
        <div className="scope">
          {template.transactionType === TransactionType.Group && <MdGroup />}
          {template.location && <MdLocationOn />}
          <span className="scopeName">{scopeLabel(template)}</span>
        </div>
        <div className="amount">
          {displayCurrencyAndAmount(
            template.amount.toString(),
            template.currency
          )}
        </div>
      </div>

      <div className="descr">
        {template.description || template.location?.google?.name || ''}
      </div>

      {template.labels.length > 0 && (
        <div className="labels">
          {template.labels.map((label) => (
            <Pill
              key={label.text}
              $textColor={'#000000c8'}
              title={label.text}
              color={label.color === '' ? 'white' : labelColors[label.color]}
              closeButton={false}
              $border={false}
              fontSize="14px"
            />
          ))}
        </div>
      )}

      <div className="bottomRow">
        <div className="cycle">
          <FaRepeat />
          <span>{scheduleSentence(template.schedule)}</span>
        </div>
        {template.isPaused ? (
          <span className="paused">Paused</span>
        ) : (
          <span>
            {/* "First" until one has actually been created, so a schedule that has not fired yet
                does not look like one that has. */}
            {template.lastExpenseId ? 'Next' : 'First'}{' '}
            {FormatDateTime(template.nextOccurrence, timeZoneId)}
          </span>
        )}
      </div>

      {/* Surfaced rather than logged: the series stopped because something outside it changed, and
          the user is the only one who can put it right. */}
      {template.lastError && (
        <div className="error">Paused after an error: {template.lastError}</div>
      )}
    </StyledRecurringExpenseRow>
  );
};

export default RecurringExpenses;
