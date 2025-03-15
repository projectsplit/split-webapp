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
}: MembersInfoBoxProps) {
  const [hide, setHide] = React.useState<boolean>(true);

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
              {transactions?.length === 1 ? (
                <span>billed to {transactions?.length} member</span>
              ) : transactions?.length === 2 ? (
                <span>Split between {transactions?.length} members</span>
              ) : (
                <span> Split among {transactions?.length} members</span>
              )}
            </div>
          ) : (
            <div className="info">
              {transactions?.length === 1 ? (
                <span>Paid by {transactions?.length} member</span>
              ) : (
                <span>Paid by {transactions?.length} members</span>
              )}
            </div>
          )}

          <div className="hideDetalailsButton">
            {hide ? <IoIosArrowDown /> : <IoIosArrowUp />}{" "}
          </div>
        </div>

        {!hide && (
          <div className="memberInfoStripe">
            {transactions.map((t, i) => (
              <div className="member" key={i}>
                <span className="memberName">
                  {members.find((x) => x.id === t.memberId)?.name}
                </span>
                <span className="amount">
                  {displayCurrencyAndAmount(t.amount.toString(), currency)}
                </span>
                <span className="percentage">
                  {" "}
                  {((t.amount / totalAmount.value) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </InfoBox>
    </StyledMembersInfoBox>
  );
}
