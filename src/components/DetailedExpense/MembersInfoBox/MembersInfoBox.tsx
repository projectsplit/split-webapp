import React from "react";
import { StyledMembersInfoBox } from "./MembersInfoBox.Styled";
import InfoBox from "../InfoBox/InfoBox";
import { MembersInfoBoxProps } from "../../../interfaces";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import Currency from "currency.js";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function MembersInfoBox({
  transactions,
  areShares,
  currency,
  members,
  userMemberId,
}: MembersInfoBoxProps) {
  const [hide, setHide] = React.useState<boolean>(false);

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a.memberId === userMemberId) return -1;
    if (b.memberId === userMemberId) return 1;
    return 0;
  });

  const totalAmount = transactions.reduce(
    (acc, { amount }) => acc.add(amount),
    Currency(0)
  );

  return (
    <StyledMembersInfoBox onClick={() => setHide((hide) => !hide)}>
      <InfoBox>
        <div className="topStripe">
          {areShares ? (
            <div className="info">
              {sortedTransactions?.length === 1 ? (
                <span>billed to {sortedTransactions?.length} member</span>
              ) : sortedTransactions?.length === 2 ? (
                <span>Split between {sortedTransactions?.length} members</span>
              ) : (
                <span> Split among {sortedTransactions?.length} members</span>
              )}
            </div>
          ) : (
            <div className="info">
              {sortedTransactions?.length === 1 ? (
                <span>Paid by {sortedTransactions?.length} member</span>
              ) : (
                <span>Paid by {sortedTransactions?.length} members</span>
              )}
            </div>
          )}

          <div className="hideDetalailsButton">
            {hide ? <IoIosArrowDown /> : <IoIosArrowUp />}{" "}
          </div>
        </div>

        {!hide && (
          <div className="memberInfoStripe">
            {sortedTransactions.map((t, i) => (
              <div className="member" key={i}>
                <span className="memberName">
                  {t.memberId === userMemberId ? (
                    <span className="you">You</span>
                  ) : (
                    members.find((x) => x.id === t.memberId)?.name
                  )}
                </span>

                <span className="amount">
                  {t.memberId === userMemberId ? (
                    <span className="yourAmount">
                      {displayCurrencyAndAmount(t.amount.toString(), currency)}
                    </span>
                  ) : (
                    displayCurrencyAndAmount(t.amount.toString(), currency)
                  )}
                </span>

                <span className="percentage">
                  {" "}
                  {t.memberId === userMemberId ? (
                    <span className="yourPercentage">
                      {((t.amount / totalAmount.value) * 100).toFixed(1)}%
                    </span>
                  ) : (
                    <span>
                      {((t.amount / totalAmount.value) * 100).toFixed(1)}%{" "}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </InfoBox>
    </StyledMembersInfoBox>
  );
}
