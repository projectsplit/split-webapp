import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import { useSignal } from "@preact/signals-react";

import { useParams } from "react-router-dom";
import { SettleUpOptionsProps } from "../../../interfaces";
import { StyledSettleUpOptions } from "./SettleUpOptions.Styled";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { CreateTransfersRequest, Transfer } from "../../../types";

export default function SettleUpOptions({
  pendingTransactions,
  memberIdSelectedToSettleUp,
  menu,
  members
}: SettleUpOptionsProps) {

  const selectedItem = useSignal<number[]>([0]);
  const params=useParams()
  const groupId = params.groupid;

  const enabled=selectedItem.value.length>0

  const memberPendingTransactions = pendingTransactions.filter(
    (p) => p.debtor === memberIdSelectedToSettleUp.value
  );

  const submitButtonHandler = ()=>{
    const selectedTransactions  = selectedItem.value.map((index) => memberPendingTransactions[index]);

    const transfers: Transfer[] = selectedTransactions.map((transaction) => ({
      description: 'Settled Debt',
      amount: transaction.amount.toString(), 
      currency: transaction.currency,
      receiverId: transaction.creditor,
      senderId: transaction.debtor,
    }));
  
   
    const createTransfersRequest: CreateTransfersRequest = {
      groupId: groupId as string,
      transfers,
    };
  
    console.log('CreateTransfersRequest:', createTransfersRequest);
    menu.value=''
  }


  return (
    <StyledSettleUpOptions height="50vh">
      <strong className="header">Settle Up</strong>

      {memberPendingTransactions.map((p, index) => (
        <div
          className={`settleUpOption ${
            selectedItem.value.includes(index) ? "clicked" : ""
          }`}
          key={index}
          onClick={() => {
            if (selectedItem.value.includes(index)) {
              selectedItem.value = selectedItem.value.filter(
                (i) => i !== index
              );
            } else {
              selectedItem.value = [...selectedItem.value, index];
            }
          }}
        >
          <span className="currencyOwes">
            {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
          </span>{" "}
          &nbsp;
          <span className="preposition">to</span> &nbsp;
          <span>{members.find((member) => member.id === p.creditor)?.name}</span>
        </div>
      ))}

      <div className="settleUpButton">
        {" "}
        <SubmitButton onClick={() => submitButtonHandler() } disabled={!enabled}  >
          Settle Up
        </SubmitButton>
      </div>
    </StyledSettleUpOptions>
  );
}
