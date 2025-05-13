import React, { useEffect, useRef, useState } from "react";
import { StyledExpenseForm } from "./ExpenseForm.styled";
import {
  ExpenseRequest,
  FormExpense,
  GeoLocation,
  Group,
  Label,
  PickerMember,
} from "../../types";
import MyButton from "../MyButton/MyButton";
import { DateTime } from "../DateTime";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../Menus/MenuAnimations/CurrencyOptionsAnimation";
import LocationPicker from "../LocationPicker/LocationPicker";
import LabelPicker from "../LabelPicker/LabelPicker";
import MemberPicker from "../MemberPicker/MemberPicker";
import { handleInputChange } from "../../helpers/handleInputChange";
import InputMonetary from "../InputMonetary/InputMonetary";
import { IoClose } from "react-icons/io5";
import { amountIsValid } from "../../helpers/amountIsValid";
import { significantDigitsFromTicker } from "../../helpers/openExchangeRates";
import currency from "currency.js";
import { useSignal } from "@preact/signals-react";
import Input_old from "../Input_old";
import { ExpenseFormProps } from "../../interfaces";
import { useExpense } from "../../api/services/useExpense";
import { useEditExpense } from "../../api/services/useEditExpense";

export default function ExpenseForm({
  group,
  expense,
  timeZoneId,
  menu,
  timeZoneCoordinates,
  header,
  selectedExpense,
  isCreateExpense,
}: ExpenseFormProps) {
  const isInitialRender = useRef<boolean>(true);

  const { mutate: createExpenseMutation, isPending: isPendingCreateExpense } =
    useExpense(menu, group.id);

  const { mutate: editExpenseMutation, isPending: isPendingEditExpense } =
    useEditExpense(menu, selectedExpense, group.id);

  const [participants, setParticipants] = useState<PickerMember[]>(
    createParticipantPickerArray(group, expense)
  );
  const [participantsError, setParticipantsError] = useState<string>("");

  const [payers, setPayers] = useState<PickerMember[]>(
    createPayerPickerArray(group, expense)
  );
  const [payersError, setPayersError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const [currencySymbol, setCurrencySymbol] = useState<string>(
    isCreateExpense || !expense ? group.currency : expense.currency
  );
  const [amount, setAmount] = useState<string>(
    isCreateExpense || !expense ? "" : expense.amount
  );
  const [amountError, setAmountError] = useState<string>("");
  const [showAmountError, setShowAmountError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>(
    isCreateExpense || !expense ? "" : expense.description
  );
  const [labels, setLabels] = useState<Label[]>(
    isCreateExpense || !expense ? [] : expense.labels
  );
  const [expenseTime, setExpenseTime] = useState<string>(
    isCreateExpense || !expense
      ? new Date().toISOString()
      : expense.expenseTime.toISOString()
  );

  const location = useSignal<GeoLocation | undefined>(
    expense?.location ?? undefined
  );

  const displayedAmount = useSignal<string>(
    isCreateExpense || !expense ? "" : expense.amount
  );
  const currencyMenu = useSignal<string | null>(null);
  const isMapOpen = useSignal<boolean>(false);

  const submitExpense = () => {
    setShowAmountError(true);

    if (
      participants.length ===
      participants.filter((p) => p.selected === false).length
    ) {
      setParticipantsError("Select at least one participant");
      return;
    }

    if (payers.length === payers.filter((p) => p.selected === false).length) {
      setPayersError("Select at least one payer");
      return;
    }

    if (!amountIsValid(amount, setAmountError)) return;

    if (!location.value && description.length == 0) {
      setDescriptionError("Select a description or a location");
      return;
    }

    const expenseRequest: ExpenseRequest = {
      amount: Number(amount),
      ...(isCreateExpense ? { groupId: group.id } : { expenseId: expense?.id }),
      currency: currencySymbol,
      payments: payers
        .filter((value) => value.selected)
        .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
      shares: participants
        .filter((value) => value.selected)
        .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
      description: description,
      location: location.value ?? null,
      occurred: expenseTime,
      labels: labels.map((x) => ({ text: x.text, color: x.color })),
    };

    if (isCreateExpense) {
      createExpenseMutation(expenseRequest);
    } else {
      editExpenseMutation(expenseRequest);
    }
  };

  useEffect(() => {
    amountIsValid(amount, setAmountError);
    const selectedParticipants = participants.filter((x) => x.selected);
    const areParticipantsNumbersValid = selectedParticipants.every(
      (x) => x.amount !== "NaN" && Number(x.amount) > 0
    );

    const isParticipantsSumInvalid =
      selectedParticipants.length > 0 &&
      (significantDigitsFromTicker(currencySymbol) >= 3
        ? Number(
            selectedParticipants
              .reduce((acc, payer) => acc + Number(payer.amount), 0)
              .toFixed(significantDigitsFromTicker(currencySymbol))
          ) !==
          Number(
            Number(amount).toFixed(significantDigitsFromTicker(currencySymbol))
          )
        : selectedParticipants.reduce(
            (acc, payer) => currency(acc).add(payer.amount).value,
            0
          ) !== currency(amount).value);

    const selectedPayers = payers.filter((x) => x.selected);
    const arePayersNumbersValid = selectedPayers.every(
      (x) => x.amount !== "NaN" && Number(x.amount) > 0
    );
    const isPayersSumInvalid =
      selectedPayers.length > 0 &&
      (significantDigitsFromTicker(currencySymbol) >= 3
        ? Number(
            selectedPayers
              .reduce((acc, payer) => acc + Number(payer.amount), 0)
              .toFixed(significantDigitsFromTicker(currencySymbol))
          ) !==
          Number(
            Number(amount).toFixed(significantDigitsFromTicker(currencySymbol))
          )
        : selectedPayers.reduce(
            (acc, payer) => currency(acc).add(payer.amount).value,
            0
          ) !== currency(amount).value);

    // Validate amount when participants or payers are selected
    if (selectedParticipants.length > 0 || selectedPayers.length > 0) {
      setShowAmountError(true);
    }

    const errorsWithTimeOut = setTimeout(() => {
      setParticipantsError(
        !areParticipantsNumbersValid
          ? "Amounts must be positive"
          : isParticipantsSumInvalid
          ? "Amounts must add up to total"
          : ""
      );
      setPayersError(
        !arePayersNumbersValid
          ? "Amounts must be positive"
          : isPayersSumInvalid
          ? "Amounts must add up to total"
          : ""
      );
    }, 200);

    return () => clearTimeout(errorsWithTimeOut);
  }, [amount, participants, payers]);

  useEffect(() => {
    if (isInitialRender.current && !isCreateExpense) {
      isInitialRender.current = false; // Mark initial render as done
      return;
    }
    setAmount("");
    displayedAmount.value = "";
  }, [currencySymbol]);

  useEffect(() => {
    if (!isCreateExpense) return;
    setDescriptionError("");
  }, [location.value, description]);

  const amountNumber = !amountError ? Number(amount) : Number.NaN;

  const handleInputBlur = () => {
    if (
      participants.some((p) => p.selected) ||
      payers.some((p) => p.selected)
    ) {
      setShowAmountError(true);
      amountIsValid(amount, setAmountError);
    }
  };

  const handldeCurrencyOptionsClick = (curr: string) => {
    setCurrencySymbol(curr);
    currencyMenu.value = null;
  };

  return (
    <StyledExpenseForm>
      <div className="header">
        <div className="gap"></div>
        <div className="title">{header}</div>

        <div
          className="closeButtonContainer"
          onClick={() => (menu.value = null)}
        >
          <IoClose className="closeButton" />
        </div>
      </div>
      <div className="inputAndErrorsWrapper">
        <InputMonetary
          currencyMenu={currencyMenu}
          value={displayedAmount.value}
          onChange={(e) => {
            handleInputChange(e, currencySymbol, displayedAmount, setAmount);
            setShowAmountError(false);
          }}
          onBlur={handleInputBlur}
          currency={currencySymbol}
          autoFocus={true}
          $inputError={showAmountError && !!amountError}
        />
        <span className="errorMsg">
          {showAmountError && amountError ? amountError : ""}
        </span>
      </div>
      <MemberPicker
        description={"Participants"}
        totalAmount={amountNumber}
        memberAmounts={participants}
        error={participantsError}
        setMemberAmounts={setParticipants}
        group={group}
        selectedCurrency={currencySymbol}
      />
      <MemberPicker
        description={"Payers"}
        totalAmount={amountNumber}
        memberAmounts={payers}
        error={payersError}
        setMemberAmounts={setPayers}
        group={group}
        selectedCurrency={currencySymbol}
      />
      <Input_old
        description="Description"
        placeholder="e.g. Air tickets"
        value={description}
        error={descriptionError}
        onChange={(e) => setDescription(e.target.value)}
      />
      <LabelPicker labels={labels} setLabels={setLabels} groupId={group.id} />
      <LocationPicker
        location={location}
        isMapOpen={isMapOpen}
        timeZoneCoordinates={timeZoneCoordinates}
      />
      <DateTime
        selectedDateTime={expenseTime}
        setSelectedDateTime={setExpenseTime}
        timeZoneId={timeZoneId}
        isEdit={!isCreateExpense}
      />
      <div className="spacer"></div>
      <MyButton
        fontSize="16"
        onClick={submitExpense}
        isLoading={
          isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
        }
      >
        Submit
      </MyButton>
      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={currencySymbol}
      />
    </StyledExpenseForm>
  );
}

const createParticipantPickerArray = (
  group: Group,
  expense: FormExpense | null
): PickerMember[] => {
  return [...group.guests, ...group.members].map((member) => ({
    id: member.id,
    amount:
      expense?.participants.find((p) => p.memberId === member.id)
        ?.participationAmount ?? "",
    locked: false,
    name: member.name,
    order: 0,
    selected:
      expense?.participants.some((p) => p.memberId === member.id) ?? false,
  }));
};

const createPayerPickerArray = (
  group: Group,
  expense: FormExpense | null
): PickerMember[] => {
  return [...group.guests, ...group.members].map((member) => ({
    id: member.id,
    amount:
      expense?.payers.find((p) => p.memberId === member.id)?.paymentAmount ??
      "",
    locked: false,
    name: member.name,
    order: 0,
    selected: expense?.payers.some((p) => p.memberId === member.id) ?? false,
  }));
};
