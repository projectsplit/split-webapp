import { useMemo } from "react";
import { StyledMemberFC } from "./MemberFC.styled";
import { MemberProps } from "../../../interfaces";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import {
  RenderBoth,
  RenderOwedOnly,
  RenderOwesOnly,
  RenderSettled,
} from "./RenderScenarios/RenderScenarios";
import SettleUpButton from "./SettleUpButton/SettleUpButton";
import { joinAmounts } from "../../../helpers/joinAmounts";
import { Debt, Group, GroupedTransaction, Mode, TruncatedMember } from "@/types";
import { useOutletContext } from "react-router-dom";

export default function MemberFC({
  pendingTransactions: propPendingTransactions,
  groupedTransactions,
  id,
  name,
  isLogedUser,
  isGuest,
  menu,
  idSelectedToSettleUp,
  participants,
  totalSpent,
  group,
  guestToBeReplaced,
  userOrMemberId
}: MemberProps) {

  const { mode } = useOutletContext<{
    mode: Mode;
  }>();

  const totalsSpent = totalSpent[id] || {};
  const removeZeroesValuesFromTotalSpent = Object.fromEntries(
    Object.entries(totalsSpent).filter(([_, amount]) => amount !== 0)
  );

  const showSettleUpButtonFn = (group?: Group) => {
    if (group) {
      return (isGuest || isLogedUser) && propPendingTransactions.length > 0 && !group.isArchived
    } else
      return isLogedUser && propPendingTransactions.length > 0
  }
  const showSettleUpButton = showSettleUpButtonFn(group)

  const {
    memberTransactions,
    pendingTransactions,
    doNotShowTreeWhenMemberOwes,
    doNotShowTreeWhenMemberIsOwed,
    memberIsOwed,
    memberOwes,
    memberIsOwedItems,
    memberOwesItems,
  } = useMemo(() => {
    const memberTransactions = groupedTransactions.filter((gt: GroupedTransaction) => gt.id === id);
    const pendingTransactions = propPendingTransactions.filter((p: Debt) => p.debtor === id || p.creditor === id);

    const timesMemberIsOwed = pendingTransactions.filter((tx: Debt) => tx.creditor === id).length;
    const timesMemberOwes = pendingTransactions.filter((tx: Debt) => tx.debtor === id).length;

    const memberIsOwed = pendingTransactions.some((x: Debt) => x.creditor === id);
    const memberOwes = pendingTransactions.some((x: Debt) => x.debtor === id);

    const memberOwesItems = pendingTransactions
      .filter((p: Debt) => p.debtor === id)
      .map((p: Debt, index: number) => (
        <div key={index}>
          <span className="currencyOwes">
            {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
          </span>{" "}
          <span className="preposition">to</span>{" "}
          <strong>
            {getParticipantName(p, participants, userOrMemberId, "to")}
          </strong>
        </div>
      ));

    const memberIsOwedItems = pendingTransactions
      .filter((p: Debt) => p.creditor === id)
      .map((p: Debt, index: number) => (
        <div key={index}>
          <span className="currencyIsOwed">
            {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
          </span>{" "}
          <span className="preposition">from</span>{" "}
          <strong>
            {getParticipantName(p, participants, userOrMemberId, "from")}
          </strong>
        </div>
      ));

    let doNotShowTreeWhenMemberIsOwed = timesMemberIsOwed === 1;
    let doNotShowTreeWhenMemberOwes = timesMemberOwes === 1;

    return {
      memberTransactions,
      pendingTransactions,
      doNotShowTreeWhenMemberOwes,
      doNotShowTreeWhenMemberIsOwed,
      memberIsOwed,
      memberOwes,
      memberIsOwedItems,
      memberOwesItems,
    };
  }, [groupedTransactions, id, propPendingTransactions, participants, userOrMemberId]);

  function getParticipantName(p: Debt, participants: TruncatedMember[], userOrMemberId: string, direction: "to" | "from") {
    const targetId = direction === "to" ? p.creditor : p.debtor;
    if (targetId === userOrMemberId) return "You";
    return participants.find(m => m.id === targetId)?.name || (direction === "to" ? p.creditorName : p.debtorName) || "Unknown";
  }

  return (
    <StyledMemberFC isGuest={isGuest} isLogedUser={isLogedUser}>
      <div className="debtsCreditsStripeAndTotal">
        <div className="debtsCreditsAndTree">
          <div className="debtsCredits">
            {(() => {
              if (memberIsOwed && !memberOwes) {
                return (
                  <RenderOwedOnly
                    showTree={!doNotShowTreeWhenMemberIsOwed}
                    memberTransactions={memberTransactions}
                    isLogedUser={isLogedUser}
                    id={id}
                    name={name}
                    pendingTransactions={pendingTransactions}
                    treeItems={memberIsOwedItems}
                    participants={participants}
                    userOrMemberId={userOrMemberId}
                    mode={mode}
                  />
                );
              }
              if (!memberIsOwed && !memberOwes) {
                return <RenderSettled isLogedUser={isLogedUser} name={name} />;
              }
              if (memberOwes && !memberIsOwed) {
                return (
                  <RenderOwesOnly
                    showTree={!doNotShowTreeWhenMemberOwes}
                    memberTransactions={memberTransactions}
                    isLogedUser={isLogedUser}
                    id={id}
                    name={name}
                    pendingTransactions={pendingTransactions}
                    treeItems={memberOwesItems}
                    participants={participants}
                    userOrMemberId={userOrMemberId}
                    mode={mode}
                  />
                );
              }
              if (memberIsOwed && memberOwes) {
                return (
                  <RenderBoth
                    doNotshowTreeWhenMemberIsOwed={doNotShowTreeWhenMemberIsOwed}
                    doNotshowTreeWhenMemberOwes={doNotShowTreeWhenMemberOwes}
                    memberTransactions={memberTransactions}
                    isLogedUser={isLogedUser}
                    id={id}
                    name={name}
                    pendingTransactions={pendingTransactions}
                    memberIsOwedItems={memberIsOwedItems}
                    memberOwesItems={memberOwesItems}
                    participants={participants}
                    userOrMemberId={userOrMemberId}
                    mode={mode}
                  />
                );
              }
              return null;
            })()}
          </div>

          {(mode === Mode.Group || isLogedUser) && <div>
            {Object.keys(removeZeroesValuesFromTotalSpent).length === 0 ? <div className="totalSpent">No recorded spending 💰</div> :
              <div className="totalSpent">
                Total spent:{" "}
                <span className="amounts">
                  {" "} {joinAmounts(Object.entries(removeZeroesValuesFromTotalSpent) as [string, number][])}
                </span>
              </div>}
          </div>}
        </div>
        {showSettleUpButton ? (
          <div className="settleUpPos">
            <SettleUpButton
              onClick={() => {
                menu.value = "SettleUp";
                idSelectedToSettleUp.value = id;
              }}
            >Settle Up</SettleUpButton>
          </div>
        ) : null}
      </div>
      <div className="guest">{isGuest ? <SettleUpButton
        onClick={() => {
          menu.value = "newUser";
          guestToBeReplaced.value.guestId = id
          guestToBeReplaced.value.guestName = name
        }}
      >Invite</SettleUpButton> : null}</div>
    </StyledMemberFC>
  );
}
