import { styled } from "styled-components";
import { CreateExpenseRequest, GeoLocation, Group, PickerMember } from "../types";
import { useEffect, useState } from "react";
import MemberPicker from "../components/MemberPicker";
import Input_old from "../components/Input_old";
import { DateTime } from "../components/DateTime";
import Button from "../components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import currency from 'currency.js'
import LocationPicker from "../components/LocationPicker";
import LabelPicker from "../components/LabelPicker";
import { createExpense } from "../api/services/api";

const ExpenseForm: React.FC<ExpenseFormProps> = ({ group, expense, timeZoneId, setIsOpen }) => {

  const [participants, setParticipants] = useState<PickerMember[]>(createParticipantPickerArray(group, expense));
  const [participantsError, setParticipantsError] = useState<string>("")

  const [payers, setPayers] = useState<PickerMember[]>(createPayerPickerArray(group, expense));
  const [payersError, setPayersError] = useState<string>("")

  const [currencySymbol, _] = useState<string>(group.currency);
  const [amount, setAmount] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");

  const [description, setDescription] = useState<string>("");
  // const [descriptionError, setDescriptionError] = useState<string>("");
  
  const [labels, setLabels] = useState<string[]>([])

  const [expenseTime, setExpenseTime] = useState<string>(new Date().toISOString());
  
  const [location, setLocation] = useState<GeoLocation | undefined>(expense?.location)

  const queryClient = useQueryClient();

  const createExpenseMutation = useMutation<any, Error, CreateExpenseRequest>({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupExpenses"] });
      setIsOpen(false)
    },
    onError: (error) => {
      console.error("Log out failed:", error.message);
    },
  });
  
  const submitExpense = () => {
    const createExpenseRequest: CreateExpenseRequest = {
      amount: Number(amount),
      groupId: group.id,
      currency: currencySymbol,
      payments: payers.filter(value => value.selected).map(value => ({ memberId: value.id, amount: Number(value.amount) })),
      shares: participants.filter(value => value.selected).map(value => ({ memberId: value.id, amount: Number(value.amount) })),
      description: description,
      labelIds: [],
      location: location ?? null,
      occured: expenseTime,
      labels: labels
    };
    
    console.log(createExpenseRequest)

    createExpenseMutation.mutate(createExpenseRequest);
  };

  useEffect(() => {
    const selectedParticipants = participants.filter(x => x.selected);
    const areParticipantsNumbersValid = selectedParticipants.every(x => x.amount != "NaN" && Number(x.amount) > 0);
    const IsParticipantsSumInvalid = selectedParticipants.length > 0 && selectedParticipants.reduce((acc, payer) => currency(acc).add(payer.amount).value, 0) !== currency(amount).value;

    const selectedPayers = payers.filter(x => x.selected);
    const arePayersNumbersValid = selectedPayers.every(x => x.amount != "NaN" && Number(x.amount) > 0);
    const IsPayersSumInvalid = selectedPayers.length > 0 && selectedPayers.reduce((acc, payer) => currency(acc).add(payer.amount).value, 0) !== currency(amount).value;

    const amountIsInvalid = amount.length > 0 && (isNaN(Number(amount)) || Number(amount) <= 0);
    // const descriptionIsInvalid = description.length < 1;

    setAmountError(amountIsInvalid ? "Must be a positive number" : "");
    // setDescriptionError(descriptionIsInvalid ? "Cannot be empty" : "");
    setParticipantsError(!areParticipantsNumbersValid ? "Amounts must be positive" : IsParticipantsSumInvalid ? "Amounts must add up to total" : "")
    setPayersError(!arePayersNumbersValid ? "Amounts must be positive" : IsPayersSumInvalid ? "Amounts must add up to total" : "")
  }, [description, amount, participants, payers]);

  const amountNumber = !amountError ? Number(amount) : Number.NaN;

  return (
    <StyledExpenseForm>
      <div className="amount-input-wrapper">
        <span className="currency">{currencySymbol}</span>
        <Input_old
          placeholder="0"
          inputMode="numeric"
          description="Amount"
          error={amountError}
          value={amount}
          className="amount-input"
          onChange={e => setAmount(e.target.value)} />
      </div>
      <Input_old
        description="Description"
        placeholder="e.g. Air tickets"
        // error={descriptionError}
        value={description}
        onChange={e => setDescription(e.target.value)} />
      <MemberPicker
        description={"Participants"}
        totalAmount={amountNumber}
        memberAmounts={participants}
        error={participantsError}
        setMemberAmounts={setParticipants} />
      <MemberPicker
        description={"Payers"}
        totalAmount={amountNumber}
        memberAmounts={payers}
        error={payersError}
        setMemberAmounts={setPayers} />
      <LabelPicker labels={labels} setLabels={setLabels} groupId={group.id} />
      <LocationPicker location={location} setLocation={setLocation} />
      <DateTime selectedDateTime={expenseTime} setSelectedDateTime={setExpenseTime} timeZoneId={timeZoneId} />
      <Button className='submit-button' onClick={() => setIsOpen(false)}>Close</Button>
      <Button className='submit-button' onClick={submitExpense}>Submit</Button>
    </StyledExpenseForm>
  );
};

export default ExpenseForm;

const createParticipantPickerArray = (group: Group, expense: FormExpense | null): PickerMember[] => {

  return [...group.guests, ...group.members].map(member => ({
    id: member.id,
    amount: expense?.participants.find(p => p.memberId === member.id)?.participationAmount ?? '',
    locked: false,
    name: member.name,
    order: 0,
    selected: expense?.participants.some(p => p.memberId === member.id) ?? false
  }));
};

const createPayerPickerArray = (group: Group, expense: FormExpense | null): PickerMember[] => {

  return [...group.guests, ...group.members].map(member => ({
    id: member.id,
    amount: expense?.payers.find(p => p.memberId === member.id)?.paymentAmount ?? '',
    locked: false,
    name: member.name,
    order: 0,
    selected: expense?.payers.some(p => p.memberId === member.id) ?? false
  }));
};

const StyledExpenseForm = styled.div`
  color: ${({ theme }) => theme.textActiveColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 20px;

  .amount-input-wrapper {
    position: relative;
    width: 100%;
  }

  .currency {
    font-weight: 700;
    position: absolute;
    left: 1em;
    top: 10px;
    color: ${({ theme }) => theme.secondaryTextColor};
  }

  .amount-input {
    text-align: right;
  }

  .submit-button {
    margin-top: auto;
  }
`;

export interface ExpenseFormProps {
  group: Group
  expense: FormExpense | null
  timeZoneId: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Label {
  id: string,
  text: string,
  color: string,
}

export interface FormExpense {
  id: string,
  groupId: string,
  amount: string,
  currency: string,
  description: string,
  payers: Payer[],
  participants: Participant[],
  expenseTime: Date,
  labels: string[],
  creationTime: Date,
  lastUpdateTime: Date,
  location: GeoLocation | undefined
}

export type Participant = {
  memberId: string,
  participationAmount: string
}

export type Payer = {
  memberId: string,
  paymentAmount: string
}
