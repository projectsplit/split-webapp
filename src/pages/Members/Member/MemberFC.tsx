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
  id,
  name,
  isLogedUser,
  isGuest,
  menu,
  idSelectedToSettleUp,
  participants,
  totalSpent,
  group,
  guestToBeReplaced
}: MemberProps) {
  const totalsSpent = totalSpent[id] || {};
  const removeZeroesValuesFromTotalSpent = Object.fromEntries(
    Object.entries(totalsSpent).filter(([_, amount]) => amount !== 0)
  );

  const showSettleUpButton =
    (isGuest || isLogedUser) && pendingTransactions.filter((p) => p.debtor === id).length > 0 && !group.isArchived;

  const memberOwesItems = pendingTransactions
    .filter((p) => p.debtor === id)
    .map((p, index) => (
      <div key={index}>
        <span className="currencyOwes">
          {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
        </span>{" "}
        <span className="preposition">to</span>{" "}
        <strong>
          {participants.find((participant) => participant.id === p.creditor)?.name}
        </strong>
      </div>
    ));

  const memberIsOwedItems = pendingTransactions
    .filter((p) => p.creditor === id)
    .map((p, index) => (
      <div key={index}>
        <span className="currencyIsOwed">
          {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
        </span>{" "}
        <span className="preposition">from</span>{" "}
        <strong>
          {participants.find((participant) => participant.id === p.debtor)?.name}
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
      (gt) => gt.id === id
    );

    const timesMemberIsOwed = pendingTransactions.filter(
      (tx) => tx.creditor === id
    ).length;
    const timesMemberOwes = pendingTransactions.filter(
      (tx) => tx.debtor === id
    ).length;

    const memberIsOwed = pendingTransactions.some(
      (x) => x.creditor === id
    );
    const memberOwes = pendingTransactions.some((x) => x.debtor === id);

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
  }, [groupedTransactions, id, pendingTransactions]);

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
                      id={id}
                      name={name}
                      pendingTransactions={pendingTransactions}
                      treeItems={memberIsOwedItems}
                      participants={participants}
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
                      id={id}
                      name={name}
                      pendingTransactions={pendingTransactions}
                      treeItems={memberOwesItems}
                      participants={participants}
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
                    id={id}
                    name={name}
                    pendingTransactions={pendingTransactions}
                    memberIsOwedItems={memberIsOwedItems}
                    memberOwesItems={memberOwesItems}
                    participants={participants}
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
                idSelectedToSettleUp.value = id;
              }}
            >Settle Up</SettleUpButton>
          </div>
        ) : null}
      </div>
      <div className="guest">{isGuest ? <SettleUpButton
        onClick={() => {
           menu.value = "newUser";
           guestToBeReplaced.value.guestId=id
           guestToBeReplaced.value.guestName=name
        }}
      >Invite</SettleUpButton> : null}</div>
    </StyledMemberFC>
  );
}
