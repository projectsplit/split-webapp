import React from "react";
import { displayCurrencyAndAmount } from "../../../../helpers/displayCurrencyAndAmount";
import { StyledMemberDetailedDescription } from "./MemberDetailedDescription.Styled";
import { MemberDetailedDescriptionProps } from "../../../../interfaces";
import { getUserName } from "@/helpers/getUserName";


export const MemberDetailedDescription = ({
  memberTransactions,
  pendingTransactions,
  id,
  isLogedUser,
  isOwed,
  name,
  participants,
  userOrMemberId,
  transactionType
}: MemberDetailedDescriptionProps) => {

  const doNotshowTreeWhenMemberOwes =
    pendingTransactions.filter((p) => p.debtor === id).length === 1;
  const doNotshowTreeWhenMemberIsOwed =
    pendingTransactions.filter((p) => p.creditor === id).length === 1;


  return (
    <StyledMemberDetailedDescription isOwed={isOwed}>
      {isLogedUser ? (
        <strong className="name">You</strong>
      ) : (
        <strong className="name">{name}</strong>
      )}
      &nbsp;
      {isOwed && isLogedUser ? (
        <span className="owingText">are owed</span>
      ) : !isOwed && isLogedUser ? (
        <span className="owingText">owe</span>
      ) : isOwed && !isLogedUser ? (
        <span className="owingText">is owed</span>
      ) : (
        <span className="owingText">owes</span>
      )}
      &nbsp;{" "}
      {memberTransactions
        .filter((mt) => mt.isOwed === isOwed)
        .map((mt, index, array) => {
          const formattedAmount = displayCurrencyAndAmount(
            mt.totalAmount.value.toString(),
            mt.currency
          );

          const isSecondToLast = index === array.length - 2;
          const isLast = index === array.length - 1;

          if (isLast && array.length > 1) {
            return (
              <div className="and" key={index}>
                {" "}
                <span className="owingText">and</span>{" "}
                <span className="amount">{formattedAmount} </span>
                <span className="owingText">
                  {transactionType === "NonGroup" && !isLogedUser ? (
                    <>
                      {isOwed ? "from " : "to "}
                      <strong style={{ color: "#FFFFFF" }}>you</strong>
                    </>
                  ) : (
                    "in total"
                  )}
                </span>
              </div>
            );
          }

          return (
            <React.Fragment key={index}>
              <span
                className="amount"
                style={{
                  marginRight:
                    array.length === 1 &&
                      (doNotshowTreeWhenMemberOwes ||
                        doNotshowTreeWhenMemberIsOwed)
                      ? "4px"
                      : "0px",
                }}
              >
                {formattedAmount}{" "}
                {array.length === 1 &&
                  !doNotshowTreeWhenMemberOwes &&
                  !doNotshowTreeWhenMemberIsOwed ? (
                  <span className="owingText">
                    {transactionType === "NonGroup" && !isLogedUser ? (
                      <>
                        {isOwed ? "from " : "to "}
                        <strong style={{ color: "#FFFFFF" }}>you</strong>
                      </>
                    ) : (
                      "in total"
                    )}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <div className="transaction-container">
                {array.length === 1 &&
                  doNotshowTreeWhenMemberOwes &&
                  isOwed === false
                  ? pendingTransactions
                    .filter((p) => p.debtor === id)
                    .map((p, index) => (
                      <div className="transaction" key={index}>
                        <span className="preposition">to</span>{" "}
                        <strong>
                          {getUserName(p, participants, userOrMemberId, "to")}
                        </strong>
                      </div>
                    ))
                  : array.length === 1 &&
                    doNotshowTreeWhenMemberIsOwed &&
                    isOwed
                    ? pendingTransactions
                      .filter((p) => p.creditor === id)
                      .map((p, index) => (
                        <div className="transaction" key={index}>
                          <span className="preposition">from</span>{" "}
                          <strong>
                            {getUserName(p, participants, userOrMemberId, "from")}
                          </strong>
                        </div>
                      ))
                    : ""}
              </div>
              {!isLast && !isSecondToLast && <span className="comma">,</span>}
              &nbsp;
            </React.Fragment>
          );
        })}
    </StyledMemberDetailedDescription>
  );
};
