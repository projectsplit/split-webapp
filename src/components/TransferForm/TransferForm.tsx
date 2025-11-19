import { IoClose } from "react-icons/io5";
import { TransferFormProps } from "../../interfaces";
import { StyledTransferForm } from "./TransferForm.styled";
import InputMonetary from "../InputMonetary/InputMonetary";
import { useCallback, useEffect, useMemo, useState } from "react";
import { signal, useComputed, useSignal } from "@preact/signals-react";
import { handleInputChange } from "../../helpers/handleInputChange";
import { amountIsValid } from "../../helpers/amountIsValid";
import { DateTime } from "../DateTime";
import MyButton from "../MyButton/MyButton";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../Menus/MenuAnimations/CurrencyOptionsAnimation";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CreateTransferRequest, Member, UserInfo } from "../../types";
import { useTransfer } from "../../api/services/useTransfers";
import FormInput from "../FormInput/FormInput";
import DateDisplay from "../ExpenseForm/components/DateDisplay/DateDisplay";
import SendMenuWrapper from "./SendMenuWrapper/SendMenuWrapper";
import { TiGroup } from "react-icons/ti";
import { SelectedGroup } from "../Menus/NonGroupUsersMenus/SelectionLists/SelectedGroup";

export default function TransferForm({
  groupMembers,
  nonGroupUsers,
  currency,
  timeZoneId,
  menu,
  nonGroupGroup,
  groupId,
  isnonGroupTransfer,
  nonGroupMenu,
}: TransferFormProps) {
  const [currencySymbol, setCurrencySymbol] = useState<string>(currency);
  const isSubmitting = useSignal<boolean>(false);
  const navigate = useNavigate();
  const displayedAmount = useSignal<string>("");
  const [amount, setAmount] = useState<string>("");
  const currencyMenu = useSignal<string | null>(null);
  const [showAmountError, setShowAmountError] = useState<boolean>(false);
  const [showIdError, setShowIdError] = useState<boolean>(false);
  const [idError, setIdError] = useState<{
    isSenderError: boolean;
    isReceiverError: boolean;
    error: string;
  }>({ isSenderError: false, isReceiverError: false, error: "" });
  const [amountError, setAmountError] = useState<string>("");
  const [recipientError, setRecipientError] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  const [transferTime, setTransferTime] = useState<string>(
    new Date().toISOString()
  );
  const [senderId, setSenderId] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const isDateShowing = useSignal<boolean>(false);
  const handleInputBlur = useCallback(() => {
    setShowAmountError(true);
    amountIsValid(amount, setAmountError);
  }, [amount, setShowAmountError, setAmountError]);

  const userMembers = groupMembers?.value.filter(
    (item): item is Member => "userId" in item
  );

  const userMemberId = userMembers?.find(
    (m) => m.userId === userInfo?.userId
  )?.id;

  const noReceiverSelected = nonGroupMenu?.value.receiverName === "";

  const { mutate: createTransferMutation, isPending } = useTransfer(
    menu,
    groupId,
    navigate,
    isSubmitting,
    isnonGroupTransfer
  );

  const handldeCurrencyOptionsClick = (curr: string) => {
    setCurrencySymbol(curr);
    currencyMenu.value = null;
  };

  const submitTransfer = useCallback(() => {
    setShowAmountError(true);
    setShowIdError(true);
    if (noReceiverSelected) {
      setRecipientError("Select a recipient");
    }
    if (!amountIsValid(amount, setAmountError)) return;
    if (!!idError.error) return;

    const createTransferRequest: CreateTransferRequest = {
      amount: Number(amount),
      groupId: groupId,
      currency: currencySymbol,
      receiverId: receiverId,
      senderId: senderId,
      occurred: transferTime,
      description: description,
    };

    createTransferMutation(createTransferRequest);
  }, [
    setShowAmountError,
    setShowIdError,
    amount,
    idError.error,
    groupId,
    currencySymbol,
    receiverId,
    senderId,
    transferTime,
    description,
  ]);

  const sortedMembers = useComputed(() => {
    return [...groupMembers.value].sort((a, b) =>
      a.id === userMemberId ? -1 : b.id === userMemberId ? 1 : 0
    );
  });

  useEffect(() => {
    if (senderId === receiverId && senderId !== "") {
      setIdError({
        isReceiverError: true,
        isSenderError: true,
        error: "Sender and receiver cannot be the same person",
      });
    } else if (senderId === "" && receiverId !== "") {
      setIdError({
        isReceiverError: false,
        isSenderError: true,
        error: "Select a sender",
      });
    } else if (receiverId === "" && senderId !== "") {
      setIdError({
        isReceiverError: true,
        isSenderError: false,
        error: "Select a receiver",
      });
    } else if (senderId === "" && receiverId === "") {
      setIdError({
        isReceiverError: true,
        isSenderError: true,
        error: "Select a sender and a receiver",
      });
    } else {
      setIdError({ isSenderError: false, isReceiverError: false, error: "" });
    }
  }, [senderId, receiverId]);

  return (
    <StyledTransferForm
      $inputError={showIdError}
      $noReceiverSelected={noReceiverSelected}
    >
      {" "}
      <div className="header">
        <div className="gap"></div>
        <div className="title">New Transfer</div>

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
            setRecipientError("");
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
      {isnonGroupTransfer && isnonGroupTransfer.value && nonGroupMenu ? (
        <div className="options">
          <div className="nonGroupMenu">
            <div className="textAndButton">
              <div className="text"> Sent from </div>
              <div
                className="button senderButton"
                onClick={() =>
                  (nonGroupMenu.value = {
                    ...nonGroupMenu.value,
                    attribute: "sender",
                    menu: "nonGroupTransfer",
                  })
                }
              >
                {nonGroupMenu.value.senderName}
              </div>{" "}
            </div>
            <div className="textAndButton">
              <div className="text"> and received by </div>
              <div
                className="button receiverButton"
                onClick={() =>
                  (nonGroupMenu.value = {
                    ...nonGroupMenu.value,
                    attribute: "receiver",
                    menu: "nonGroupTransfer",
                  })
                }
              >
                {nonGroupMenu.value.receiverName === ""
                  ? "select user"
                  : nonGroupMenu.value.receiverName}
              </div>
            </div>
          </div>
          <span className="errorMsg">
            {showAmountError && recipientError && noReceiverSelected
              ? recipientError
              : ""}
          </span>
          <div className="buttonWrapper">
            <div
              className="groupButton"
              onClick={() =>
                (nonGroupMenu.value = {
                  ...nonGroupMenu.value,
                  attribute: "groups",
                  menu: "nonGroupTransfer",
                })
              }
            >
              <TiGroup className="groupIcon" />
              <span className="descr">Groups</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="groupMenu">
          {nonGroupGroup && isnonGroupTransfer && (
            <div className="nonGroupGroupPill">
              <SelectedGroup
                group={nonGroupGroup.value}
                onRemove={() => {
                  nonGroupGroup.value = null;
                  isnonGroupTransfer.value = true;
                }}
              />
            </div>
          )}{" "}
          <SendMenuWrapper
            title="Sender"
            idError={idError}
            id={senderId}
            setId={setSenderId}
            setShowIdError={setShowIdError}
            userMemberId={userMemberId}
            showIdError={showIdError}
            sortedMembers={sortedMembers}
          />
          <SendMenuWrapper
            title="Receiver"
            idError={idError}
            id={receiverId}
            setId={setReceiverId}
            setShowIdError={setShowIdError}
            userMemberId={userMemberId}
            showIdError={showIdError}
            sortedMembers={sortedMembers}
          />
        </div>
      )}
      <FormInput
        description=""
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {isDateShowing.value && (
        <DateDisplay
          selectedDateTime={transferTime}
          timeZoneId={timeZoneId}
          setTime={setTransferTime}
          isDateShowing={isDateShowing}
          setShowPicker={setShowPicker}
        />
      )}
      <div className="spacer"></div>
      <div className="bottomButtons">
        <div className="submitButton">
          <MyButton
            fontSize="16"
            onClick={submitTransfer}
            isLoading={isPending}
          >
            Submit
          </MyButton>
        </div>

        <DateTime
          selectedDateTime={transferTime}
          setSelectedDateTime={setTransferTime}
          timeZoneId={timeZoneId}
          isEdit={false}
          category={signal("Transfers")}
          isDateShowing={isDateShowing}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
        />
      </div>
      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={currencySymbol}
      />
    </StyledTransferForm>
  );
}
