import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
import { useSetBySharesAmountsToZero } from "./hooks/useSetBySharesAmountsToZero";
import { useExpenseValidation } from "./hooks/useExpenseValidation";
import { useNavigate, useOutletContext } from "react-router-dom";
import { StyledExpenseForm } from "./ExpenseForm.styled";
import MemberPicker2 from "../MemberPicker/MemberPicker2";
import { LocationDisplay } from "./components/LocationDisplay/LocationDisplay";
import DateDisplay from "./components/DateDisplay/DateDisplay";
import { LabelMenu } from "./components/LabelMenu/LabelMenu";
import LabelsDisplay from "./components/LabelsDisplay/LabelsDisplay";
import FormInputWithTag from "./components/FormInputWithTag/FormInputWithTag";
import { FaRegEdit } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { useExpenseStore } from "./formStore/formStore";
import { useShallow } from 'zustand/react/shallow'

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
    isSubmitting,
    participantsByCategory,
    payersByCategory,
    userMemberId,
    participantsCategory,
    payersCategory,
    validateForm,
    submitExpense,
    updateParticipantsInCategory,
    updatePayersInCategory,
    // Actions you'll use soon
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


  const [makePersonalClicked, setMakePersonalClicked] =
    useState<boolean>(false);

  const displayedAmount = useSignal<string>(
    isCreateExpense || !expense ? "" : expense.amount
  );
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const currencyMenu = useSignal<string | null>(null);
  const isMapOpen = useSignal<boolean>(false);
  const isDateShowing = useSignal<boolean>(!isCreateExpense);
  const labelMenuIsOpen = useSignal<boolean>(false);

  const participants =
    participantsByCategory[
    participantsCategory.value as keyof typeof participantsByCategory
    ];

  const payers =
    payersByCategory[payersCategory.value as keyof typeof payersByCategory];

  const adjustParticipants = useMemo(() => {
    if (!participants) return [];
    const userIdToCheck =
      nonGroupUsers.value.length > 0 || isnonGroupExpense?.value
        ? userInfo?.userId
        : userMemberId;
    return participants.map((m) =>
      m.id === userIdToCheck ? { ...m, name: "you" } : m
    );
  }, [
    participants,
    userInfo?.userId,
    userMemberId,
    nonGroupUsers.value.length,
    isnonGroupExpense?.value,
  ]);

  const adjustPayers = useMemo(() => {
    if (!payers) return [];
    const userIdToCheck =
      nonGroupUsers.value.length > 0 || isnonGroupExpense?.value
        ? userInfo?.userId
        : userMemberId;
    return payers.map((m) =>
      m.id === userIdToCheck ? { ...m, name: "you" } : m
    );
  }, [
    payers,
    userInfo?.userId,
    userMemberId,
    nonGroupUsers.value.length,
    isnonGroupExpense?.value,
  ]);

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

  const showShareExpenseButton =
    isPersonal.value &&
    amountNumber &&
    nonGroupUsers.value.length === 0;

  const showDetailedSharedExpenseText =
    (nonGroupUsers?.value.length > 0 || groupMembers?.value.length > 0) &&
    !!amountNumber &&
    !isPersonal.value;

  const showMakePersonal =
    isPersonal.value === false &&
    amountNumber &&
    !(
      adjustParticipants.filter((m) => m.selected).length === 1 &&
      adjustParticipants[0].name === "you" &&
      adjustPayers.filter((m) => m.selected).length === 1 &&
      adjustPayers[0].name === "you"
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
      {showDetailedSharedExpenseText ? (
        <div className="errorsWrapper">
          <div className="textStyleInfo">
            {nonGroupGroup && nonGroupGroup.value ? (
              <div className="definition">
                <span className="labelStyle">
                  <div className="info">
                    {" "}
                    <TiGroup />
                    {nonGroupGroup.value.name}
                  </div>
                </span>
                :
              </div>
            ) : null}
            <MemberPicker2
              isLoading={
                isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
              }
              description={"Participants"}
              totalAmount={amountNumber}
              memberAmounts={adjustParticipants}
              error={participantsError}
              setMemberAmounts={setParticipants}
              // group={group}
              selectedCurrency={currencySymbol}
              category={participantsCategory}
              userMemberId={userMemberId}
              setError={setParticipantsError}
              isnonGroupExpense={isnonGroupExpense}
              userId={userInfo.userId}
              groupMembers={groupMembers}
              nonGroupUsers={nonGroupUsers}
              isCreateExpense={isCreateExpense}
            />
            <MemberPicker2
              isLoading={
                isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
              }
              description={"Payers"}
              totalAmount={amountNumber}
              memberAmounts={adjustPayers}
              error={payersError}
              setMemberAmounts={setPayers}
              // group={group}
              selectedCurrency={currencySymbol}
              category={payersCategory}
              userMemberId={userMemberId}
              setError={setPayersError}
              isnonGroupExpense={isnonGroupExpense}
              userId={userInfo.userId}
              groupMembers={groupMembers}
              nonGroupUsers={nonGroupUsers}
              isCreateExpense={isCreateExpense}
            />
            {isCreateExpense && nonGroupMenu ? (
              <div
                className="editButton"
                onClick={() => (nonGroupMenu.value = "nonGroupExpenseUsers")}
              >
                <FaRegEdit />
              </div>
            ) : null}
          </div>
          <div className="errors">
            {" "}
            {participantsError && (
              <div className="errorMsg">{participantsError}</div>
            )}
            {payersError && <div className="errorMsg">{payersError}</div>}
          </div>
        </div>
      ) : (
        ""
      )}
      <FormInputWithTag
        description="Description"
        placeholder="Description"
        value={description}
        error={descriptionError}
        onChange={handleDescriptionChange}
        labelMenuIsOpen={labelMenuIsOpen}
      />
      {showShareExpenseButton && fromHome && nonGroupMenu ? (
        <div className="shareExpenseOption">
          <div
            className="button"
            onClick={() => (nonGroupMenu.value = "nonGroupExpenseUsers")}
          >
            Share Expense{" "}
          </div>
        </div>
      ) : null}
      {showMakePersonal && fromHome && nonGroupMenu ? (
        <div className="shareExpenseOption">
          <div
            className="button"
            onClick={() => {
              setMakePersonalClicked(true);
              isPersonal.value = true;
              nonGroupUsers.value = [];
            }}
          >
            Make Personal{" "}
          </div>
        </div>
      ) : null}
      {amountNumber && nonGroupMenu && !fromHome && adjustPayers.length === 0 && adjustParticipants.length === 0 ? (
        <div className="shareExpenseOption">
          <div
            className="button"
            onClick={() => (nonGroupMenu.value = "nonGroupExpenseUsers")}
          >
            Shared with you and...{" "}
          </div>
        </div>
      ) : null}
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
