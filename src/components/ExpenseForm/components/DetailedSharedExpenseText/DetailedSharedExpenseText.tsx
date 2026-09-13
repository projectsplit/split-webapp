import { StyledDetailedSharedExpenseText } from './DetailedSharedExpenseText.styled';
import MemberPicker from '@/components/MemberPicker/MemberPicker';
import IonIcon from '@reacticons/ionicons';

import { DetailedSharedExpenseTextProps } from '@/interfaces';

export default function DetailedSharedExpenseText({
  fromHomeGroup,
  isCreateExpense,
  isPendingCreateExpense,
  isPendingEditExpense,
  amountNumber,
  adjustParticipants,
  setParticipants,
  participantsError,
  currencySymbol,
  participantsCategory,
  userMemberId,
  setParticipantsError,
  isnonGroupExpense,
  userInfo,
  groupMembers,
  nonGroupUsers,
  nonGroupMenu,
  adjustPayers,
  setPayers,
  payersError,
  setPayersError,
  payersCategory,
  isPersonal,
}: DetailedSharedExpenseTextProps) {
  const showDetailedSharedExpenseText =
    (nonGroupUsers?.value.length > 0 || groupMembers?.value.length > 0) &&
    !!amountNumber &&
    !isPersonal.value;

  const group = fromHomeGroup?.value;
  const canChangePeople = isCreateExpense && !!nonGroupMenu;

  const otherNames = isCreateExpense
    ? (nonGroupUsers?.value ?? [])
        .filter((x) => x.userId !== userInfo.userId)
        .map((x) => x.username)
    : [
        ...new Map(
          [...adjustParticipants, ...adjustPayers]
            .filter(
              (m) =>
                m.selected && m.id !== userInfo.userId && m.id !== userMemberId
            )
            .map((m) => [m.id, m.name])
        ).values(),
      ];

  const peopleLabel = group
    ? group.name
    : otherNames.length === 1
      ? `You and ${otherNames[0]}`
      : otherNames.length === 2
        ? `You, ${otherNames[0]} and ${otherNames[1]}`
        : `You and ${otherNames.length} others`;

  const showPeople = !!group || otherNames.length > 0;

  return (
    <>
      {' '}
      {showDetailedSharedExpenseText ? (
        <StyledDetailedSharedExpenseText>
          <div className="splitCard">
            {showPeople ? (
              <div
                className={`peopleRow${canChangePeople ? '' : ' static'}`}
                onClick={
                  canChangePeople && nonGroupMenu
                    ? () => (nonGroupMenu.value = 'nonGroupExpenseUsers')
                    : undefined
                }
              >
                <div className="rowLabel">People</div>
                <div className="rowValue">{peopleLabel}</div>
                {canChangePeople ? (
                  <IonIcon
                    name="chevron-forward-outline"
                    className="rowChevron"
                  />
                ) : null}
              </div>
            ) : null}
            <MemberPicker
              isLoading={
                isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
              }
              description={'Participants'}
              totalAmount={amountNumber}
              memberAmounts={adjustParticipants}
              error={participantsError}
              setMemberAmounts={setParticipants}
              selectedCurrency={currencySymbol}
              category={participantsCategory}
              userMemberId={userMemberId}
              setError={setParticipantsError}
              isnonGroupExpense={isnonGroupExpense}
              userId={userInfo.userId}
              groupMembers={groupMembers}
              nonGroupUsers={nonGroupUsers}
              isCreateExpense={isCreateExpense}
            />
            <MemberPicker
              isLoading={
                isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
              }
              description={'Payers'}
              totalAmount={amountNumber}
              memberAmounts={adjustPayers}
              error={payersError}
              setMemberAmounts={setPayers}
              selectedCurrency={currencySymbol}
              category={payersCategory}
              userMemberId={userMemberId}
              setError={setPayersError}
              isnonGroupExpense={isnonGroupExpense}
              userId={userInfo.userId}
              groupMembers={groupMembers}
              nonGroupUsers={nonGroupUsers}
              isCreateExpense={isCreateExpense}
            />
          </div>
          <div className="errors">
            {' '}
            {participantsError && (
              <div className="errorMsg">{participantsError}</div>
            )}
            {payersError && payersError !== participantsError && (
              <div className="errorMsg">{payersError}</div>
            )}
          </div>
        </StyledDetailedSharedExpenseText>
      ) : null}
    </>
  );
}
