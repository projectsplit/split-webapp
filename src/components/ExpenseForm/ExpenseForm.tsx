import React, {
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  PickerMember,
  UserInfo,
} from "../../types";
import MyButton from "../MyButton/MyButton";
import { DateTime } from "../DateTime";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../Menus/MenuAnimations/CurrencyOptionsAnimation";
import LocationPicker from "../LocationPicker/LocationPicker";
import { handleInputChange } from "../../helpers/handleInputChange";
import InputMonetary from "../InputMonetary/InputMonetary";
import { IoClose } from "react-icons/io5";
import { amountIsValid } from "../../helpers/amountIsValid";
import { signal, useSignal } from "@preact/signals-react";
import { ExpenseFormProps } from "../../interfaces";
import { useExpense } from "../../api/services/useExpense";
import { useEditExpense } from "../../api/services/useEditExpense";
import { useNavigate, useOutletContext } from "react-router-dom";
import { StyledExpenseForm } from "./ExpenseForm.styled";
import { LocationDisplay } from "./components/LocationDisplay/LocationDisplay";
import DateDisplay from "./components/DateDisplay/DateDisplay";
import { LabelMenu } from "./components/LabelMenu/LabelMenu";
import LabelsDisplay from "./components/LabelsDisplay/LabelsDisplay";
import FormInputWithTag from "./components/FormInputWithTag/FormInputWithTag";
import { useExpenseStore } from "./formStore/formStore";
import { useShallow } from 'zustand/react/shallow'
import DetailedSharedExpenseText from "./components/DetailedSharedExpenseText/DetailedSharedExpenseText";
import { ShareExpenseButtons } from "./components/ShareExpenseButtons/ShareExpenseButtons";
import { useAdjustedMembers } from "./hooks/useAdjustedMembers";

export default function ExpenseForm({
  groupMembers,
  nonGroupUsers,
  groupId,
  expense,
  timeZoneId,
  menu,
  timeZoneCoordinates,
  header,
  selectedExpense,
  isCreateExpense,
  isPersonal,
  isnonGroupExpense,
  currency,
  nonGroupMenu,
  nonGroupGroup,
  fromHome
}: ExpenseFormProps) {
  
  const isInitialRender = useRef<boolean>(true);
  const navigate = useNavigate();
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  const {
    amount,
    description,
    currencySymbol,
    expenseTime,
    labels,
    location,
    amountError,
    showAmountError,
    participantsError,
    payersError,
    descriptionError,
    participantsByCategory,
    payersByCategory,
    userMemberId,
    participantsCategory,
    payersCategory,
    makePersonalClicked,
    showPicker,
    validateForm,
    submitExpense,
    setMakePersonalClicked,
    setShowPicker,
    setAmount,
    setDescription,
    setCurrencySymbol,
    setExpenseTime,
    setLabels,
    setLocation,
    setAmountError,
    setShowAmountError,
    setParticipantsError,
    setPayersError,
    setDescriptionError,
    setIsSubmitting,
    setParticipantsByCategory,
    setPayersByCategory,
    initialize,
    updateMembers,
  } = useExpenseStore(
    useShallow((state) => ({
      amount: state.amount,
      description: state.description,
      currencySymbol: state.currencySymbol,
      expenseTime: state.expenseTime,
      labels: state.labels,
      location: state.location,
      amountError: state.amountError,
      showAmountError: state.showAmountError,
      participantsError: state.participantsError,
      payersError: state.payersError,
      descriptionError: state.descriptionError,
      isSubmitting: state.isSubmitting,
      participantsByCategory: state.participantsByCategory,
      payersByCategory: state.payersByCategory,
      userMemberId: state.userMemberId,
      participantsCategory: state.participantsCategory,
      payersCategory: state.payersCategory,
      updateParticipantsInCategory: state.updateParticipantsInCategory,
      updatePayersInCategory: state.updatePayersInCategory,
      setParticipantsByCategory: state.setParticipantsByCategory,
      setPayersByCategory: state.setPayersByCategory,
      makePersonalClicked: state.makePersonalClicked,
      showPicker: state.showPicker,
      setMakePersonalClicked: state.setMakePersonalClicked,
      setShowPicker: state.setShowPicker,
      setAmount: state.setAmount,
      setDescription: state.setDescription,
      setCurrencySymbol: state.setCurrencySymbol,
      setExpenseTime: state.setExpenseTime,
      setLabels: state.setLabels,
      setLocation: state.setLocation,
      setAmountError: state.setAmountError,
      setShowAmountError: state.setShowAmountError,
      setParticipantsError: state.setParticipantsError,
      setPayersError: state.setPayersError,
      setDescriptionError: state.setDescriptionError,
      setIsSubmitting: state.setIsSubmitting,
      initialize: state.initialize,
      updateMembers: state.updateMembers,
      validateForm: state.validateForm,
      submitExpense: state.submitExpense,
    }))
  );

  useEffect(() => {
    initialize({
      isCreateExpense,
      expense,
      currency,
      groupMembers,
      nonGroupUsers,
      userInfo,
      userMemberId,
      isnonGroupExpense,
    });
  }, [initialize, isCreateExpense, expense?.id, currency, userInfo]);

  useEffect(() => {
    // This effect handles updates to the member lists (participants/payers)
    // without resetting the rest of the form (amount, description, etc.)
    updateMembers({
      groupMembers,
      nonGroupUsers,
      expense,
      isCreateExpense,
      isnonGroupExpense,
      userInfo,
      userMemberId,
    });
  }, [
    updateMembers,
    groupMembers?.value,
    nonGroupUsers?.value,
    isnonGroupExpense?.value,
    expense,
    isCreateExpense,
    userInfo,
    userMemberId,
  ]);

  const currencyMenu = useSignal<string | null>(null);
  const isMapOpen = useSignal<boolean>(false);
  const isDateShowing = useSignal<boolean>(!isCreateExpense);
  const labelMenuIsOpen = useSignal<boolean>(false);
  const displayedAmount = useSignal<string>(
    isCreateExpense || !expense ? "" : expense.amount
  );

  const { participants, payers, adjustParticipants, adjustPayers } = useAdjustedMembers({
    participantsByCategory,
    payersByCategory,
    participantsCategory,
    payersCategory,
    nonGroupUsers,
    isnonGroupExpense,
    userInfo,
    userMemberId,
  });

  const setParticipants = (newParticipants: PickerMember[]) => {
    setParticipantsByCategory((prev) => ({
      ...prev,
      [participantsCategory.value]: newParticipants,
    }));
    validateForm({ showErrors: true })
  };

  const setPayers = (newPayers: PickerMember[]) => {
    setPayersByCategory((prev) => ({
      ...prev,
      [payersCategory.value]: newPayers,
    }));
    validateForm({ showErrors: true })
  };

  const { mutate: createExpenseMutation, isPending: isPendingCreateExpense } =
    useExpense(menu, groupId, navigate, setIsSubmitting, nonGroupUsers,
      nonGroupGroup,
      groupMembers,
      makePersonalClicked,
      isnonGroupExpense);

  const { mutate: editExpenseMutation, isPending: isPendingEditExpense } =
    useEditExpense(menu, groupId, setIsSubmitting, nonGroupUsers,
      nonGroupGroup,
      groupMembers,
      makePersonalClicked,
      isnonGroupExpense,
      selectedExpense);


  const onSubmit = () => {
    submitExpense({
      groupId,
      createExpenseMutation,
      editExpenseMutation,
      isnonGroupExpense,
      isCreateExpense,
      expense,
    });
  }


  const amountNumber = !amountError ? Number(amount) : 0;

  const handleInputBlur = useCallback(() => {
    if (
      participants.some((p) => p.selected) ||
      payers.some((p) => p.selected)
    ) {
      setShowAmountError(true);
      amountIsValid(amount, setAmountError);
    }
  }, [participants, payers, amount, setAmountError]);

  const handleCurrencyOptionsClick = useCallback(
    (curr: string) => {
      setCurrencySymbol(curr);
      currencyMenu.value = null;
      displayedAmount.value = ""
    },
    [currencyMenu]
  );

  const handleInputChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(e, currencySymbol, displayedAmount, setAmount);
      setShowAmountError(false);
      setAmountError('')
      setParticipantsError('')
      setPayersError('')
      if (!isInitialRender.current) validateForm({ showErrors: true })
    },
    [currencySymbol, displayedAmount, setAmount]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
      if (!isCreateExpense) return;
      setDescriptionError("");
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
          onClick={() => {
            if (isnonGroupExpense && isnonGroupExpense?.value) {
              if (fromHome) {
                nonGroupUsers.value = [];
                groupMembers.value = [];
                isPersonal.value = true;
                isnonGroupExpense.value = false;
                if (nonGroupGroup) {
                  nonGroupGroup.value = null;
                }
              }
            }
            menu.value = null;
          }}
        >
          <IoClose className="closeButton" />
        </div>
      </div>
      <div className="inputAndErrorsWrapper">
        <InputMonetary
          currencyMenu={currencyMenu}
          value={displayedAmount.value}
          onChange={handleInputChangeCallback}
          onBlur={handleInputBlur}
          currency={currencySymbol}
          autoFocus={true}
          $inputError={showAmountError && !!amountError}
        />
        <span className="errorMsg">
          {showAmountError && amountError ? amountError : ""}
        </span>
      </div>
      <DetailedSharedExpenseText
        nonGroupGroup={nonGroupGroup}
        isCreateExpense={isCreateExpense}
        isPendingCreateExpense={isPendingCreateExpense}
        isPendingEditExpense={isPendingEditExpense}
        amountNumber={amountNumber}
        adjustParticipants={adjustParticipants}
        setParticipants={setParticipants}
        participantsError={participantsError}
        currencySymbol={currencySymbol}
        participantsCategory={participantsCategory}
        userMemberId={userMemberId}
        setParticipantsError={setParticipantsError}
        isnonGroupExpense={isnonGroupExpense}
        userInfo={userInfo}
        groupMembers={groupMembers}
        nonGroupUsers={nonGroupUsers}
        nonGroupMenu={nonGroupMenu}
        adjustPayers={adjustPayers}
        setPayers={setPayers}
        payersError={payersError}
        setPayersError={setPayersError}
        payersCategory={payersCategory}
        isPersonal={isPersonal}
      />
      <FormInputWithTag
        description="Description"
        placeholder="Description"
        value={description}
        error={descriptionError}
        onChange={handleDescriptionChange}
        labelMenuIsOpen={labelMenuIsOpen}
      />
      <ShareExpenseButtons
        isPersonal={isPersonal}
        amountNumber={amountNumber}
        nonGroupUsers={nonGroupUsers}
        adjustParticipants={adjustParticipants}
        adjustPayers={adjustPayers}
        fromHome={fromHome}
        nonGroupMenu={nonGroupMenu}
        setMakePersonalClicked={setMakePersonalClicked}
      />
      {labelMenuIsOpen.value && (
        <LabelMenu
          labelMenuIsOpen={labelMenuIsOpen}
          labels={labels}
          setLabels={setLabels}
          groupId={groupId}
        />
      )}

      <LocationDisplay location={location} isMapOpen={isMapOpen} setLocation={setLocation} />
      {isDateShowing.value && (
        <DateDisplay
          selectedDateTime={expenseTime}
          timeZoneId={timeZoneId}
          setTime={setExpenseTime}
          isDateShowing={isDateShowing}
          setShowPicker={setShowPicker}
        />
      )}
      {labels.length > 0 ? (
        <LabelsDisplay
          labels={labels}
          setLabels={setLabels}
          labelMenuIsOpen={labelMenuIsOpen}
        />
      ) : null}
      <div className="spacer" />
      <div className="bottomButtons">
        {" "}
        <div className="submitButton">
          <MyButton
            fontSize="16"
            onClick={onSubmit}
            isLoading={
              isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
            }
          >
            Submit
          </MyButton>
        </div>
        <LocationPicker
          location={location}
          isMapOpen={isMapOpen}
          timeZoneCoordinates={timeZoneCoordinates}
          setLocation={setLocation}
          isCreateExpense={isCreateExpense}
          setDescriptionError={setDescriptionError}
        />
        <DateTime
          selectedDateTime={expenseTime}
          setSelectedDateTime={setExpenseTime}
          timeZoneId={timeZoneId}
          isEdit={!isCreateExpense}
          category={signal("Expense")}
          isDateShowing={isDateShowing}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
        />
      </div>
      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handleCurrencyOptionsClick}
        selectedCurrency={currencySymbol}
      />
    </StyledExpenseForm>
  );
}
