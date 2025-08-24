import React, { useMemo } from "react";
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

export default function MemberFC({
  pendingTransactions,
  groupedTransactions,
  memberId,
  name,
  isLogedUser,
  isGuest,
  menu,
  memberIdSelectedToSettleUp,
  members,
  totalSpent,
  group,
  guestToBeReplaced
}: MemberProps) {
  const totalsSpent = totalSpent[memberId] || {};
  const removeZeroesValuesFromTotalSpent = Object.fromEntries(
    Object.entries(totalsSpent).filter(([_, amount]) => amount !== 0)
  );

  const showSettleUpButton =
    (isGuest || isLogedUser) && pendingTransactions.filter((p) => p.debtor === memberId).length > 0 && !group.isArchived;

  const memberOwesItems = pendingTransactions
    .filter((p) => p.debtor === memberId)
    .map((p, index) => (
      <div key={index}>
        <span className="currencyOwes">
          {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
        </span>{" "}
        <span className="preposition">to</span>{" "}
        <strong>
          {members.find((member) => member.id === p.creditor)?.name}
        </strong>
      </div>
    ));

  const memberIsOwedItems = pendingTransactions
    .filter((p) => p.creditor === memberId)
    .map((p, index) => (
      <div key={index}>
        <span className="currencyIsOwed">
          {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
        </span>{" "}
        <span className="preposition">from</span>{" "}
        <strong>
          {members.find((member) => member.id === p.debtor)?.name}
        </strong>
      </div>
    ));

  const {
    doNotShowTreeWhenMemberOwes,
    doNotShowTreeWhenMemberIsOwed,
    memberIsOwed,
    memberOwes,
    positionSettleUpButtonUnderTotal,
    doNotShowSettleUpButtonIfSettled,
    memberTransactions,
  } = useMemo(() => {
    const memberTransactions = groupedTransactions.filter(
      (gt) => gt.id === memberId
    );

    const timesMemberIsOwed = pendingTransactions.filter(
      (tx) => tx.creditor === memberId
    ).length;
    const timesMemberOwes = pendingTransactions.filter(
      (tx) => tx.debtor === memberId
    ).length;

    const memberIsOwed = pendingTransactions.some(
      (x) => x.creditor === memberId
    );
    const memberOwes = pendingTransactions.some((x) => x.debtor === memberId);

    let doNotShowTreeWhenMemberIsOwed = false;
    let doNotShowTreeWhenMemberOwes = false;

    const positionSettleUpButtonUnderTotal =
      Math.abs(timesMemberIsOwed - timesMemberOwes) !== 1;
    const doNotShowSettleUpButtonIfSettled =
      Math.abs(timesMemberIsOwed - timesMemberOwes) === 0;

    if (timesMemberIsOwed === 1) {
      doNotShowTreeWhenMemberIsOwed = true;
    }

    if (timesMemberOwes === 1) {
      doNotShowTreeWhenMemberOwes = true;
    }

    return {
      memberTransactions,
      doNotShowTreeWhenMemberOwes,
      doNotShowTreeWhenMemberIsOwed,
      memberIsOwed,
      memberOwes,
      positionSettleUpButtonUnderTotal,
      doNotShowSettleUpButtonIfSettled,
    };
  }, [groupedTransactions, memberId, pendingTransactions]);

  return (
    <StyledMemberFC isGuest={isGuest} isLogedUser={isLogedUser}>
      <div className="debtsCreditsStripeAndTotal">
        <div className="debtsCreditsAndTree">
          <div className="debtsCredits">
            {(() => {
              if (memberIsOwed && !memberOwes) {
                return (
                  <>
                    <RenderOwedOnly
                      showTree={!doNotShowTreeWhenMemberIsOwed}
                      memberTransactions={memberTransactions}
                      isLogedUser={isLogedUser}
                      memberId={memberId}
                      name={name}
                      pendingTransactions={pendingTransactions}
                      treeItems={memberIsOwedItems}
                      members={members}
                    />
                  </>
                );
              }
              if (!memberIsOwed && !memberOwes) {
                return <RenderSettled isLogedUser={isLogedUser} name={name} />;
              }
              if (memberOwes && !memberIsOwed) {
                return (
                  <>
                    <RenderOwesOnly
                      showTree={!doNotShowTreeWhenMemberOwes}
                      memberTransactions={memberTransactions}
                      isLogedUser={isLogedUser}
                      memberId={memberId}
                      name={name}
                      pendingTransactions={pendingTransactions}
                      treeItems={memberOwesItems}
                      members={members}
                    />
                  </>
                );
              }
              if (memberIsOwed && memberOwes) {
                return (
                  <RenderBoth
                    doNotshowTreeWhenMemberIsOwed={
                      doNotShowTreeWhenMemberIsOwed
                    }
                    doNotshowTreeWhenMemberOwes={doNotShowTreeWhenMemberOwes}
                    memberTransactions={memberTransactions}
                    isLogedUser={isLogedUser}
                    memberId={memberId}
                    name={name}
                    pendingTransactions={pendingTransactions}
                    memberIsOwedItems={memberIsOwedItems}
                    memberOwesItems={memberOwesItems}
                    members={members}
                  />
                );
              }
              return null;
            })()}
          </div>

          {Object.keys(removeZeroesValuesFromTotalSpent).length === 0 ? <div className="totalSpent">No recorded spending 💰</div> :
            <div className="totalSpent">
              Total spent:{" "}
              <span className="amounts">
                {" "} {joinAmounts(Object.entries(removeZeroesValuesFromTotalSpent))}
              </span>
            </div>}
        </div>

        {showSettleUpButton ? (
          <div className="settleUpPos">
            <SettleUpButton
              onClick={() => {
                menu.value = "SettleUp";
                memberIdSelectedToSettleUp.value = memberId;
              }}
            >Settle Up</SettleUpButton>
          </div>
        ) : null}
      </div>
      <div className="guest">{isGuest ? <SettleUpButton
        onClick={() => {
           menu.value = "newUser";
           guestToBeReplaced.value.guestId=memberId
           guestToBeReplaced.value.guestName=name
        }}
      >Invite</SettleUpButton> : null}</div>
    </StyledMemberFC>
  );
}
