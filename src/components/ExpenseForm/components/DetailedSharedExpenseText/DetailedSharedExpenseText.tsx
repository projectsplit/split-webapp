import { StyledDetailedSharedExpenseText } from './DetailedSharedExpenseText.styled'
import MemberPicker2 from '@/components/MemberPicker/MemberPicker2'
import { TiGroup } from 'react-icons/ti'
import { FaRegEdit } from 'react-icons/fa'
import { Signal } from '@preact/signals-react'
import { Group, Guest, Member, PickerMember, User, UserInfo } from '@/types'
import { CategoryKey } from '@/components/ExpenseForm/formStore/formStoreTypes'

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
  isPersonal }: DetailedSharedExpenseTextProps) {

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


interface DetailedSharedExpenseTextProps {
  nonGroupGroup: Signal<Group | null> | undefined;
  isCreateExpense: boolean;
  isPendingCreateExpense: boolean;
  isPendingEditExpense: boolean;
  amountNumber: number;
  adjustParticipants: PickerMember[];
  setParticipants: (newParticipants: PickerMember[]) => void;
  participantsError: string;
  currencySymbol: string;
  participantsCategory: Signal<CategoryKey>;
  userMemberId: string;
  setParticipantsError: (msgOrUpdater: string | ((prev: string) => string)) => void;
  isnonGroupExpense: Signal<boolean> | undefined;
  userInfo: UserInfo;
  groupMembers: Signal<(Member | Guest)[]>;
  nonGroupUsers: Signal<User[]>;
  nonGroupMenu: Signal<string | null> | undefined
  adjustPayers: PickerMember[];
  setPayers: (newPayers: PickerMember[]) => void;
  payersError: string;
  setPayersError: (msgOrUpdater: string | ((prev: string) => string)) => void;
  payersCategory: Signal<CategoryKey>;
  isPersonal: Signal<boolean>;
}