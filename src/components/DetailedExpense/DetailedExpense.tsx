import { StyledDetailedBackdrop } from '../DetailSheet.styled';
import {
  StyledDetailedExpense,
} from './DetailedExpense.styled';
import MembersInfoBox from './MembersInfoBox/MembersInfoBox';
import IonIcon from '@reacticons/ionicons';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import MyButton from '../MyButton/MyButton';
import { DetailedExpenseProps } from '../../interfaces';
import Pill from '../Pill/Pill';
import MapsInfoBox from './MapsInfoBox/MapsInfoBox';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import { signal, useSignal } from '@preact/signals-react';
import DeleteExpenseAnimation from '../Animations/DeleteExpenseAnimation';
import { Mode, TransactionType, GeoLocation, Guest, Member } from '../../types';
import EditExpenseAnimation from '../Animations/EditExpenseAnimation';
import labelColors from '../../labelColors';
import { MdGroup } from 'react-icons/md';
import { FaRepeat } from 'react-icons/fa6';
import { buildFormExpense, toUser } from './buildFormExpense';
import { DateTime } from 'luxon';
import { generatePath, useNavigate } from 'react-router-dom';
import { createJumpToken } from '@/api/auth/helpers/createJumpToken';
import { getFilterStorageKey } from '@/components/SearchTransactions/helpers/localStorageStringParser';
import routes from '@/routes';
import { useMemo } from 'react';

export default function DetailedExpense({
  selectedExpense,
  amount,
  currency,
  description,
  labels,
  location,
  occurred,
  payments,
  shares,
  timeZoneId,
  timeZoneCoordinates,
  creator,
  created,
  participants,
  errorMessage,
  userMemberId,
  group,
  userId,
  mode,
}: DetailedExpenseProps) {
  const expenseType = selectedExpense.value?.transactionType;
  const googleUrl = 'https://www.google.com/maps/search/?api=1&query=';

  const menu = useSignal<string | null>(null);
  const navigate = useNavigate();

  const goToOriginExpense = () => {
    const expense = selectedExpense.value;
    if (!expense) return;

    const jumpToken = createJumpToken(expense.occurred, expense.created);

    if (expense.transactionType === TransactionType.Group) {
      sessionStorage.removeItem(
        getFilterStorageKey('expense', expense.groupId)
      );
      navigate(
        `${generatePath(routes.GROUP_EXPENSES, { groupid: expense.groupId ?? '' })}?jumpTo=${jumpToken}`
      );
    } else if (expense.transactionType === TransactionType.NonGroup) {
      sessionStorage.removeItem(getFilterStorageKey('expense'));
      navigate(`${routes.NON_GROUP_EXPENSES}?jumpTo=${jumpToken}`);
    }
  };

  const googleMapsUrlBuilder = (location: GeoLocation | undefined) => {
    if (location?.google?.id) {
      return `${googleUrl}${encodeURIComponent(
        location.google?.name!
      )}&query_place_id=${location.google?.id}`;
    } else {
      return `${googleUrl}${location?.coordinates.latitude},${location?.coordinates.longitude}`;
    }
  };
  const googleMapsUrl = googleMapsUrlBuilder(location);

  const selectedValue = selectedExpense.value;
  const expenseToEdit = useMemo(
    () =>
      selectedValue
        ? buildFormExpense(selectedExpense, mode, group)
        : undefined,
    [selectedExpense, selectedValue, mode, group]
  );
  const editGroupMembers = useMemo(
    () =>
      signal<(Member | Guest)[]>(
        group ? [...group.members, ...group.guests] : []
      ),
    [group]
  );
  const editNonGroupUsers = useMemo(
    () => signal(participants.map((p) => toUser(p))),
    [participants]
  );
  const editIsPersonal = useSignal<boolean>(mode === Mode.Personal);
  const editIsNonGroup = useSignal<boolean>(mode === Mode.NonGroup);

  const stamp = (eventTimeUtc: string) =>
    DateTime.fromISO(eventTimeUtc, { zone: 'utc' })
      .setZone(timeZoneId)
      .toFormat('EEE, d LLL yyyy HH:mm');

  const isEditable =
    (group && !group.isArchived) ||
    (mode === Mode.NonGroup && !group) ||
    expenseType === TransactionType.Personal;

  const originScope =
    expenseType === TransactionType.Group ? 'group expense' : 'quick split';

  return (
    <>
      <StyledDetailedBackdrop onClick={() => (selectedExpense.value = null)} />
      <StyledDetailedExpense>
        <div className="header">
          <div className="slot" />
          <div className="title">
            {description
              ? description
              : location?.google?.name
                ? location.google.name
                : 'Expense'}
          </div>
          <div
            className="slot closeButtonContainer"
            onClick={() => (selectedExpense.value = null)}
          >
            <IonIcon name="close-outline" className="closeButton" />
          </div>
        </div>

        <div className="detailsScroll">
          <div className="summary">
            {labels.length > 0 ? (
              <div className="labels">
                {labels.map(
                  (l: { id: string; text: string; color: string }) => (
                    <Pill
                      key={l.id}
                      title={l.text}
                      color={l.color === '' ? 'white' : labelColors[l.color]}
                      closeButton={false}
                      fontSize="12px"
                      $border={false}
                      $vivid
                    >
                      {mode === Mode.Personal && !l.id.includes('_') && (
                        <MdGroup style={{ marginRight: '4px' }} />
                      )}
                    </Pill>
                  )
                )}
              </div>
            ) : null}

            <div className="amount">
              {displayCurrencyAndAmount(amount.toString(), currency)}
            </div>

            {selectedExpense.value?.recurringExpenseId && (
              <div className="recurringBadge">
                <FaRepeat className="recurringIcon" />
                <span>Part of a recurring expense</span>
              </div>
            )}
          </div>

          {mode !== Mode.Personal && (
            <>
              <MembersInfoBox
                transactions={shares}
                areShares={true}
                currency={currency}
                participants={participants}
                userMemberId={userMemberId}
                userId={userId}
                expenseType={expenseType}
              />
              <MembersInfoBox
                transactions={payments}
                areShares={false}
                currency={currency}
                participants={participants}
                userMemberId={userMemberId}
                userId={userId}
                expenseType={expenseType}
              />
            </>
          )}

          {mode === Mode.Personal && !location ? null : (
            <MapsInfoBox location={location} googleMapsUrl={googleMapsUrl} />
          )}

          <div className="meta">
            <span className="metaLine">
              <span className="metaLabel">Occurred</span>
              <span className="metaSep">&middot;</span>
              <span className="metaStamp">{stamp(occurred)}</span>
            </span>
            <span className="metaLine">
              <span className="metaLabel">
                {mode === Mode.Personal
                  ? 'Created'
                  : `Created by ${participants.find((x) => x.id === creator)?.name}`}
              </span>
              <span className="metaSep">&middot;</span>
              <span className="metaStamp">{stamp(created)}</span>
            </span>
          </div>
        </div>

        {isEditable ? (
          <div className="footer">
            <MyButton onClick={() => (menu.value = 'editExpense')}>
              Edit
            </MyButton>
            <MyButton
              onClick={() => (menu.value = 'deleteExpense')}
              variant="secondary"
            >
              Delete
            </MyButton>
          </div>
        ) : mode === Mode.Personal ? (
          <div className="footer navigateFooter">
            <span className="info">
              {`This is your share from a ${originScope}`}
            </span>
            <MyButton onClick={goToOriginExpense}>
              {expenseType === TransactionType.Group
                ? 'View in group'
                : 'View in Quick splits'}
            </MyButton>
          </div>
        ) : null}

        <MenuAnimationBackground menu={menu} />
        <DeleteExpenseAnimation
          menu={menu}
          description={description}
          selectedExpense={selectedExpense}
          errorMessage={errorMessage}
        />
        <EditExpenseAnimation
          expense={expenseToEdit || null}
          groupId={group?.id}
          timeZoneId={timeZoneId}
          menu={menu}
          selectedExpense={selectedExpense}
          timeZoneCoordinates={timeZoneCoordinates}
          currency={currency}
          groupMembers={editGroupMembers}
          nonGroupUsers={editNonGroupUsers}
          isPersonal={editIsPersonal}
          isnonGroupExpense={editIsNonGroup}
        />
      </StyledDetailedExpense>
    </>
  );
}
