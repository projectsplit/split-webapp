import React from "react";
import { StyledMembersInfoBox } from "./MembersInfoBox.Styled";
import InfoBox from "../InfoBox/InfoBox";
import { MembersInfoBoxProps } from "../../../interfaces";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import Currency from "currency.js";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GroupTransaction, NonGroupTransaction } from "../../../types";

export default function MembersInfoBox({
  transactions,
  areShares,
  currency,
  participants,
  userMemberId,
}: MembersInfoBoxProps) {
  const [hide, setHide] = React.useState<boolean>(false);

  const getId = (t: GroupTransaction | NonGroupTransaction) => {
    if ("memberId" in t) {
      return t.memberId;
    }
    return t.userId;
  };

  const sortedTransactions = [...(transactions || [])].sort((a, b) => {
    const aId = getId(a);
    const bId = getId(b);
    if (aId === userMemberId) return -1;
    if (bId === userMemberId) return 1;
    return 0;
  });

  const totalAmount = transactions?.reduce(
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
            {sortedTransactions.map((t, i) => {
              const id = getId(t);
              return (
                <div className="member" key={i}>
                  <span className="memberName">
                    {id === userMemberId ? (
                      <span className="you">You</span>
                    ) : (
                      participants.find((x) => x.id === id)?.name
                    )}
                  </span>

                  <span className="amount">
                    {id === userMemberId ? (
                      <span className="yourAmount">
                        {displayCurrencyAndAmount(
                          t.amount.toString(),
                          currency
                        )}
                      </span>
                    ) : (
                      displayCurrencyAndAmount(t.amount.toString(), currency)
                    )}
                  </span>

                  <span className="percentage">
                    {" "}
                    {id === userMemberId ? (
                      <span className="yourPercentage">
                        {totalAmount && totalAmount.value !== 0
                          ? ((t.amount / totalAmount.value) * 100).toFixed(1)
                          : "0.0"}
                        %
                      </span>
                    ) : (
                      <span>
                        {totalAmount && totalAmount.value !== 0
                          ? ((t.amount / totalAmount.value) * 100).toFixed(1)
                          : "0.0"}
                        %{" "}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </InfoBox>
    </StyledMembersInfoBox>
  );
}
