import { useMemo, useState } from 'react';
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
import GeneralWarningMenuAnimation from '@/components/Animations/GeneralWarningMenuAnimation';
import Pill from '@/components/Pill/Pill';
import labelColors from '@/labelColors';
import { useGetRecurringExpenses } from '@/api/auth/QueryHooks/useGetRecurringExpenses';
import { useDeleteRecurringExpense } from '@/api/auth/CommandHooks/useDeleteRecurringExpense';
import { useToggleRecurringExpenseStatus } from '@/api/auth/CommandHooks/useToggleRecurringExpenseStatus';
import { useGetAllNonGroupUsers } from '@/api/auth/QueryHooks/useGetAllNonGroupUsers';
import useGroup from '@/api/auth/QueryHooks/useGroup';
import { displayMoneyFixed } from '@/helpers/displayCurrencyAndAmount';
import { FormatDateTime } from '@/helpers/timeHelpers';
import { scheduleSentence } from '@/helpers/recurrence';
import {
  Guest,
  Member,
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
  buildJumpPath,
  clearFiltersForJump,
  scopeLabel,
} from './recurringExpenseHelpers';
import { RecurringExpenseDeleteConfirmation } from './RecurringExpenseDeleteConfirmation';
import { EditRecurringExpenseAnimation } from './EditRecurringExpenseAnimation';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';
import routes from '@/routes';

export const RecurringExpenses = () => {
  const navigate = useNavigate();
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  const timeZoneId = userInfo?.timeZone;

  const menu = useSignal<string | null>(null);
  const rowMenu = useSignal<string | null>(null);
  useCloseOnBack(
    rowMenu.value === 'options',
    () => (rowMenu.value = null)
  );
  const errorMessage = useSignal<string>('');

  const [selected, setSelected] =
    useState<RecurringExpenseResponseItem | null>(null);

  const { data, isFetching } = useGetRecurringExpenses();

  const showError = (message: string) => {
    errorMessage.value = message;
    menu.value = 'generalWarning';
  };

  const { mutate: deleteRecurringExpense, isPending: isDeleting } =
    useDeleteRecurringExpense(() => (rowMenu.value = null), showError);

  const { mutate: toggleStatus } = useToggleRecurringExpenseStatus(showError);

  const { allUsers } = useGetAllNonGroupUsers(Mode.NonGroup);

  const { data: selectedGroup } = useGroup(
    selected?.transactionType === TransactionType.Group
      ? (selected.groupId ?? undefined)
      : undefined
  );

  const editGroupMembers = useMemo(
    () =>
      signal<(Member | Guest)[]>(
        selectedGroup
          ? [...selectedGroup.members, ...selectedGroup.guests]
          : []
      ),
    [selectedGroup]
  );
  const editNonGroupUsers = useMemo(() => signal(allUsers), [allUsers]);

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
        onClick={() => navigate(routes.ROOT)}
      />

      {isFetching && recurringExpenses.length === 0 ? (
        <div className="spinnerContainer">
          <Spinner />
        </div>
      ) : recurringExpenses.length === 0 ? (
        <div className="empty">
          <FaRepeat className="emptyIcon" />
          <div className="emptyTitle">No recurring expenses</div>
          <div className="emptyHint">
            Set one up with the repeat button when you submit an expense.
          </div>
        </div>
      ) : (
        <div className="scrollContainer">
          {recurringExpenses.map((template) => (
            <RecurringExpenseRow
              key={template.id}
              template={template}
              timeZoneId={timeZoneId}
              onOpen={() => {
                setSelected(template);
                rowMenu.value = 'options';
              }}
            />
          ))}
        </div>
      )}

      <div className="submitButton">
        <MyButton
          variant="secondary"
          fontSize="15"
          onClick={() => navigate(routes.ROOT)}
          isLoading={false}
        >
          Done
        </MyButton>
      </div>

      {rowMenu.value === 'options' && selected && (
        <LongPressMenu
          onEdit={() => (rowMenu.value = 'editRecurringExpense')}
          onDelete={() => (rowMenu.value = 'deleteRecurringExpense')}
          onClose={() => (rowMenu.value = null)}
          extraOptions={[
            ...(selected.schedule
              ? [
                  {
                    label: selected.isPaused ? 'Resume' : 'Pause',
                    icon: selected.isPaused ? <MdPlayArrow /> : <MdPause />,
                    onClick: () => toggleStatus(selected.id),
                  },
                ]
              : []),
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

      {rowMenu.value === 'deleteRecurringExpense' && (
        <MenuAnimationBackground menu={rowMenu} />
      )}
      <MenuAnimationBackground menu={menu} />

      <GeneralWarningMenuAnimation menu={menu} message={errorMessage.value} />

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
          groupMembers={editGroupMembers}
          nonGroupUsers={editNonGroupUsers}
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
    <StyledRecurringExpenseRow onClick={onOpen}>
      <div className="topRow">
        <div className="scope">
          {template.transactionType === TransactionType.Group && <MdGroup />}
          {template.location && <MdLocationOn />}
          <span className="scopeName">{scopeLabel(template)}</span>
        </div>
        <div className="amount">
          {displayMoneyFixed(template.amount.toString(), template.currency)}
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
              title={label.text}
              color={label.color === '' ? 'white' : labelColors[label.color]}
              closeButton={false}
              $border={false}
              $vivid
              fontSize="11px"
            />
          ))}
        </div>
      )}

      <div className="bottomRow">
        <div className="cycle">
          <FaRepeat />
          <span>
            {template.schedule
              ? scheduleSentence(template.schedule)
              : 'Schedule unavailable'}
          </span>
        </div>
        {!template.schedule ? null : template.isPaused ? (
          <span className="paused">Paused</span>
        ) : (
          <span className="nextRun">
            {template.lastExpenseId ? 'Next' : 'First'}{' '}
            {FormatDateTime(template.nextOccurrence, timeZoneId)}
          </span>
        )}
      </div>

      {template.lastError && (
        <div className="error">Paused after an error: {template.lastError}</div>
      )}
    </StyledRecurringExpenseRow>
  );
};

export default RecurringExpenses;
