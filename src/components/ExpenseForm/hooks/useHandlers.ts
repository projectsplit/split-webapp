import { amountIsValid } from "@/helpers/amountIsValid";
import { handleInputChange } from "@/helpers/handleInputChange";
import { PickerMember } from "@/types";
import { Signal } from "@preact/signals-react";
import { useCallback } from "react";

export const useHandlers = (
  participants: PickerMember[],
  payers: PickerMember[],
  setShowAmountError: (show: boolean) => void,
  amount: string,
  setAmountError: (msg: string) => void,
  setCurrencySymbol: (value: string) => void,
  currencyMenu: Signal<string | null>,
  displayedAmount: Signal<string>,
  setAmount: (value: string) => void,
  setParticipantsError: (msg: string) => void,
  setPayersError: (msg: string) => void,
  isInitialRender: React.MutableRefObject<boolean>,
  validateForm: (options: { showErrors: boolean }) => void,
  isCreateExpense: boolean,
  setDescription: (value: string) => void,
  setDescriptionError: (msg: string) => void,
  currencySymbol: string
) => {
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
      displayedAmount.value = "";
    },
    [currencyMenu]
  );

  const handleInputChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(e, currencySymbol, displayedAmount, setAmount);
      setShowAmountError(false);
      setAmountError("");
      setParticipantsError("");
      setPayersError("");
      if (!isInitialRender.current) validateForm({ showErrors: true });
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
  return {
    handleInputBlur,
    handleCurrencyOptionsClick,
    handleInputChangeCallback,
    handleDescriptionChange,
  };
};
