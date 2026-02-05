import { StyledDetailedSharedExpenseText } from './DetailedSharedExpenseText.styled'
import MemberPicker2 from '@/components/MemberPicker/MemberPicker2'
import { TiGroup } from 'react-icons/ti'
import { FaRegEdit } from 'react-icons/fa'
import { useSignal } from '@preact/signals-react'
import { SplitCategory } from '@/types'

import { DetailedSharedExpenseTextProps } from '@/interfaces'

export default function DetailedSharedExpenseText({
  nonGroupGroup,
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
  userExistsInCategory }: DetailedSharedExpenseTextProps) {

  const userIdToCheck =
    nonGroupUsers.value.length > 0 || isnonGroupExpense?.value
      ? userInfo?.userId
      : userMemberId;

  const isUserSelectedInParticipants = adjustParticipants.some(
    (m) => m.id === userIdToCheck && m.selected
  );
  const isUserSelectedInPayers = adjustPayers.some(
    (m) => m.id === userIdToCheck && m.selected
  );

  userExistsInCategory.value = {
    Participants: isUserSelectedInParticipants,
    Payers: isUserSelectedInPayers,
  };

  const showDetailedSharedExpenseText =
    (nonGroupUsers?.value.length > 0 || groupMembers?.value.length > 0) &&
    !!amountNumber &&
    !isPersonal.value;

  return (
    <>  {showDetailedSharedExpenseText ? (<StyledDetailedSharedExpenseText>
      <div className="textStyleInfo">
        {nonGroupGroup && nonGroupGroup.value ? (
          <div className="definition">
            <span className="labelStyle">
              <div className="info">
                {" "}
                <TiGroup />
                {nonGroupGroup.value.name}
              </div>
            </span>
            :
          </div>
        ) : null}
        <MemberPicker2
          isLoading={
            isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
          }
          description={"Participants"}
          totalAmount={amountNumber}
          memberAmounts={adjustParticipants}
          error={participantsError}
          setMemberAmounts={setParticipants}
          // group={group}
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
        <MemberPicker2
          isLoading={
            isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
          }
          description={"Payers"}
          totalAmount={amountNumber}
          memberAmounts={adjustPayers}
          error={payersError}
          setMemberAmounts={setPayers}
          // group={group}
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
        {isCreateExpense && nonGroupMenu ? (
          <div
            className="editButton"
            onClick={() => (nonGroupMenu.value = "nonGroupExpenseUsers")}
          >
            <FaRegEdit />
          </div>
        ) : null}
      </div>
      <div className="errors">
        {" "}
        {participantsError && (
          <div className="errorMsg">{participantsError}</div>
        )}
        {payersError && <div className="errorMsg">{payersError}</div>}
      </div>
    </StyledDetailedSharedExpenseText>) : null}</>)

}


