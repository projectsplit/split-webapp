import InputMonetary from "@/components/InputMonetary/InputMonetary";
import { StyledInputAndErrorsWrapper } from "./InputAndErrorsWrapper.styled";
import { handleInputChange } from "@/helpers/handleInputChange";
import { Signal } from "@preact/signals-react";
import { TransferState } from "../formStore/formStoreTypes";

interface InputAndErrorsWrapperProps {
  currencyMenu: Signal<string | null>;
  displayedAmount: Signal<string>;
  data: Pick<TransferState, 'currencySymbol' | 'errors'>;
  actions: Pick<TransferState, 'setAmount' | 'setError'>;
  handleInputBlur: () => void;
}

export const InputAndErrorsWrapper = ({ currencyMenu, displayedAmount, data, actions, handleInputBlur }: InputAndErrorsWrapperProps) => {
  return (
    <StyledInputAndErrorsWrapper>
      <InputMonetary
        currencyMenu={currencyMenu}
        value={displayedAmount.value}
        onChange={(e) => {
          handleInputChange(e, data.currencySymbol, displayedAmount, actions.setAmount);
          actions.setError('showAmountError', false);
          actions.setError('showSamePersonError', false);
          actions.setError('isSameUserError', "");
          actions.setError('recipientError', "");
        }}
        onBlur={handleInputBlur}
        currency={data.currencySymbol}
        autoFocus={true}
        $inputError={data.errors.showAmountError && !!data.errors.amountError}
      />
      <span className="errorMsg">
        {data.errors.showAmountError && data.errors.amountError ? data.errors.amountError : ""}
      </span>
    </StyledInputAndErrorsWrapper>
  );
};