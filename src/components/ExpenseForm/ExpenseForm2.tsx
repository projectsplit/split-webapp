import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { StyledExpenseForm } from "./ExpenseForm.styled";
import {
  ExpenseFormAction,
  ExpenseFormState,
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
import FormInput from "../FormInput/FormInput";
import { ExpenseFormProps } from "../../interfaces";
import { useExpense } from "../../api/services/useExpense";
import { useEditExpense } from "../../api/services/useEditExpense";
import { useExpenseValidation } from "../../hooks/useExpenseValidation";

export default function ExpenseForm2({
  group,
  expense,
  timeZoneId,
  menu,
  timeZoneCoordinates,
  header,
  selectedExpense,
  isCreateExpense,
}: ExpenseFormProps) {

  const { mutate: createExpenseMutation, isPending: isPendingCreateExpense } =
    useExpense(menu, group.id);

  const { mutate: editExpenseMutation, isPending: isPendingEditExpense } =
    useEditExpense(menu, selectedExpense, group.id);

  const currencyMenu = useSignal<string | null>(null);
  const isMapOpen = useSignal<boolean>(false);


  const initialState: ExpenseFormState = {
    amount: isCreateExpense || !expense ? "" : expense.amount,
    displayedAmount: isCreateExpense || !expense ? "" : expense.amount,
    currencySymbol: isCreateExpense || !expense ? group.currency : expense.currency,
    description: isCreateExpense || !expense ? "" : expense.description,
    labels: isCreateExpense || !expense ? [] : expense.labels,
    expenseTime: isCreateExpense || !expense ? new Date().toISOString() : expense.expenseTime.toISOString(),
    participants: createParticipantPickerArray(group, expense),
    payers: createPayerPickerArray(group, expense),
    location: expense?.location ?? undefined,
    errors: { amount: "", participants: "", payers: "", description: "", showAmount: "" },
    showErrors: false
  };

  function expenseFormReducer(state: ExpenseFormState, action: ExpenseFormAction): ExpenseFormState {
    switch (action.type) {
      case "SET_AMOUNT":
        return { ...state, amount: action.payload };
      case "SET_DISPLAYED_AMOUNT":
        return { ...state, displayedAmount: action.payload };
      case "SET_CURRENCY":
        return {
          ...state,
          currencySymbol: action.payload,
          amount: "",
          displayedAmount: "",
          errors: { ...state.errors, amount: "" }
        }
      case "SET_DESCRIPTION":
        return { ...state, description: action.payload };
      case "SET_LABELS":
        return { ...state, labels: action.payload };
      case "SET_EXPENSE_TIME":
        return { ...state, expenseTime: action.payload };
      case "SET_PARTICIPANTS":
        return { ...state, participants: action.payload };
      case "SET_PAYERS":
        return { ...state, payers: action.payload };
      case "SET_LOCATION":
        return { ...state, location: action.payload };
      case "SET_ERROR":
        return { ...state, errors: { ...state.errors, ...action.payload } };
      case "SET_SHOW_ERRORS":
        return { ...state, showErrors: action.payload };
      case "RESET_AMOUNT":
        return { ...state, amount: "", errors: { ...state.errors, amount: "" } };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(expenseFormReducer, initialState);

  const submitExpense = useCallback(() => {
    dispatch({ type: "SET_SHOW_ERRORS", payload: true });
    const amountError = amountIsValid(state.amount) ? "" : "Enter a valid amount greater than zero";

    if (amountError) {
      dispatch({ type: "SET_ERROR", payload: { amount: amountError } });
      return;
    }

    if (
      state.participants.length ===
      state.participants.filter((p) => p.selected === false).length
    ) {
      dispatch({ type: "SET_ERROR", payload: { participants: "Select at least one participant" } });
      return;
    }

    if (state.payers.length === state.payers.filter((p) => p.selected === false).length) {
      dispatch({ type: "SET_ERROR", payload: { payers: "Select at least one payer" } });
      return;
    }

    if (!state.location && state.description.length == 0) {
      dispatch({ type: "SET_ERROR", payload: { description: "Select a description or a location" } });
      return;
    }

    const expenseRequest: ExpenseRequest = {
      amount: Number(state.amount),
      ...(isCreateExpense ? { groupId: group.id } : { expenseId: expense?.id }),
      currency: state.currencySymbol,
      payments: state.payers
        .filter((value) => value.selected)
        .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
      shares: state.participants
        .filter((value) => value.selected)
        .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
      description: state.description,
      location: state.location ?? null,
      occurred: state.expenseTime,
      labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
    };

    if (isCreateExpense) {
      createExpenseMutation(expenseRequest);
    } else {
      editExpenseMutation(expenseRequest);
    }
  }, [
    state.participants,
    state.payers,
    state.amount,
    state.location,
    state.description,
    isCreateExpense,
    group.id,
    expense?.id,
    state.currencySymbol,
    state.expenseTime,
    state.labels,
    createExpenseMutation,
    editExpenseMutation,
  ]);

  useExpenseValidation({
    amount: state.amount,
    participants: state.participants,
    payers: state.payers,
    currencySymbol: state.currencySymbol,
    description: state.description,
    location: state.location,
    dispatch
  });


  const amountNumber = !state.errors.amount ? Number(state.amount) : Number.NaN;

  const handleInputBlur = useCallback(() => {
    if (
      state.participants.some((p) => p.selected) ||
      state.payers.some((p) => p.selected)
    ) {
      dispatch({ type: "SET_SHOW_ERRORS", payload: true });
      const amountError = amountIsValid(state.amount) ? "" : "Invalid amount";
      dispatch({ type: "SET_ERROR", payload: { amount: amountError } });
    }
  }, [state.participants, state.payers, state.amount]);

  const handleCurrencyOptionsClick = useCallback(
    (curr: string) => {
      dispatch({ type: "SET_CURRENCY", payload: curr });
      currencyMenu.value = null;
    },
    [currencyMenu]
  );

  const handleInputChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(e, state.currencySymbol, dispatch);
      dispatch({ type: "SET_SHOW_ERRORS", payload: false });
    },
    [state.currencySymbol]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_DESCRIPTION", payload: e.target.value });
    },
    []
  );

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
          value={state.displayedAmount}
          onChange={handleInputChangeCallback}
          onBlur={handleInputBlur}
          currency={state.currencySymbol}
          autoFocus={true}
          $inputError={state.showErrors && !!state.errors.amount}
        />
        <span className="errorMsg">
          {state.showErrors && state.errors.amount ? state.errors.amount : ""}
        </span>
      </div>
      <MemberPicker
        description={"Participants"}
        totalAmount={amountNumber}
        memberAmounts={state.participants}
        error={state.errors.participants}
        setMemberAmounts={setParticipants}
        group={group}
        selectedCurrency={state.currencySymbol}
      />
      <MemberPicker
        description={"Payers"}
        totalAmount={amountNumber}
        memberAmounts={state.payers}
        error={state.errors.payers}
        setMemberAmounts={setPayers}
        group={group}
        selectedCurrency={state.currencySymbol}
      />
      <FormInput
        description="Description"
        placeholder="e.g. Air tickets"
        value={state.description}
        error={state.errors.description}
        onChange={handleDescriptionChange}
      />
      <LabelPicker labels={state.labels} setLabels={setLabels} groupId={group.id} />
      <LocationPicker
        location={state.location}
        isMapOpen={isMapOpen}
        timeZoneCoordinates={timeZoneCoordinates}
      />
      <DateTime
        selectedDateTime={state.expenseTime}
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
        clickHandler={handleCurrencyOptionsClick}
        selectedCurrency={state.currencySymbol}
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
