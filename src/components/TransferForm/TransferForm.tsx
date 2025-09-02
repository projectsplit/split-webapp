import { IoClose } from "react-icons/io5";
import { TransferFormProps } from "../../interfaces";
import { StyledTransferForm } from "./TransferForm.styled";
import InputMonetary from "../InputMonetary/InputMonetary";
import { useCallback, useEffect, useMemo, useState } from "react";
import { signal, useSignal } from "@preact/signals-react";
import { handleInputChange } from "../../helpers/handleInputChange";
import { amountIsValid } from "../../helpers/amountIsValid";
import { DateTime } from "../DateTime";
import MyButton from "../MyButton/MyButton";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../Menus/MenuAnimations/CurrencyOptionsAnimation";
import { useOutletContext } from "react-router-dom";
import { CreateTransferRequest, UserInfo } from "../../types";
import { useTransfer } from "../../api/services/useTransfers";
import FormInput from "../FormInput/FormInput";

export default function TransferForm({
  group,
  timeZoneId,
  menu,
}: TransferFormProps) {
  const [currencySymbol, setCurrencySymbol] = useState<string>(group.currency);

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
  const [description, setDescription] = useState<string>("");
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  const [transferTime, setTransferTime] = useState<string>(
    new Date().toISOString()
  );
  const [senderId, setSenderId] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");

  const handleInputBlur = useCallback(() => {
    setShowAmountError(true);
    amountIsValid(amount, setAmountError);
  },[amount, setShowAmountError, setAmountError]);

  const allMembers = [...group.guests, ...group.members];
  const members = group?.members;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;
  const { mutate: createTransferMutation, isPending } = useTransfer(menu, group.id);

  const handldeCurrencyOptionsClick = (curr: string) => {
    setCurrencySymbol(curr);
    currencyMenu.value = null;
  };

  const submitTransfer = useCallback(() => {
    setShowAmountError(true);
    setShowIdError(true);
    if (!amountIsValid(amount, setAmountError)) return;
    if (!!idError.error) return;

    const createTransferRequest: CreateTransferRequest = {
      amount: Number(amount),
      groupId: group.id,
      currency: currencySymbol,
      receiverId: receiverId,
      senderId: senderId,
      occurred: transferTime,
      description: description,
    };

    createTransferMutation(createTransferRequest);
  },[setShowAmountError, setShowIdError, amount, idError.error, group.id, currencySymbol, receiverId, senderId,transferTime, description]);

  const sortedMembers =useMemo(()=>[...allMembers].sort((a, b) => {
    if (a.id === userMemberId) return -1;
    if (b.id === userMemberId) return 1;
    return 0;
  }),[allMembers]) 

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
    <StyledTransferForm inputError={showIdError}>
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
      <div className="sendMenuWrapper">
        <div
          className="sendMenu"
          style={{
            borderColor:
              idError.isSenderError && showIdError ? "#ba5d5d" : "#000000",
          }}
        >
          <div className="title">Sent from</div>
          <div className="options">
            {sortedMembers.map((m, i) => (
              <div
                key={i}
                className="name"
                style={{
                  backgroundColor: senderId === m.id ? "white" : "",
                  color: senderId === m.id ? "#26272B" : "",
                }}
                onClick={() => {
                  setSenderId((prev) => (prev === m.id ? "" : m.id));
                  setShowIdError(false);
                }}
              >
                {m.id === userMemberId ? "You" : m.name}
              </div>
            ))}
          </div>
        </div>
        <span className="errorMsg">
          {idError.isSenderError && showIdError ? idError.error : ""}
        </span>
      </div>
      <div className="sendMenuWrapper">
        <div
          className="sendMenu"
          style={{
            borderColor:
              idError.isReceiverError && showIdError ? "#ba5d5d" : "#000000",
          }}
        >
          <div className="title">Sent to</div>
          <div className="options">
            {sortedMembers.map((m, i) => (
              <div
                key={i}
                className="name"
                style={{
                  backgroundColor: receiverId === m.id ? "white" : "",
                  color: receiverId === m.id ? "#26272B" : "",
                }}
                onClick={() => {
                  setReceiverId((prev) => (prev === m.id ? "" : m.id));
                  setShowIdError(false);
                }}
              >
                {m.id === userMemberId ? "You" : m.name}
              </div>
            ))}
          </div>
        </div>
        <span className="errorMsg">
          {idError.isReceiverError && showIdError ? idError.error : ""}
        </span>
      </div>
      <FormInput
        description="Description"
        placeholder="e.g. Settle up"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <DateTime
        selectedDateTime={transferTime}
        setSelectedDateTime={setTransferTime}
        timeZoneId={timeZoneId}
        isEdit={false}
        category={signal("Transfers")}
       
      />
      <div className="spacer"></div>
      <MyButton fontSize="16" onClick={submitTransfer} isLoading={isPending}>
        Submit
      </MyButton>
      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={currencySymbol}
      />
    </StyledTransferForm>
  );
}
