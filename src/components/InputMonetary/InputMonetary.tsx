import React from "react";
import { StyledInput, StyledInputMonetary } from "./InputMonetary.styled";
import { getSymbolFromCurrency } from "../../helpers/currency-symbol-map";
import { InputMonetaryProps } from "../../interfaces";
import { Currency } from "../../types";
import { currencyData } from "../../helpers/openExchangeRates";
import { useSignal } from "@preact/signals-react";

import { FaAngleDown } from "react-icons/fa";

export default React.forwardRef(function InputMonetary(
  {
    onBlur,
    onFocus,
    onChange,
    value,
    $inputError,
    // setMenu,
    currencyMenu,
    currency,
    autoFocus,
  }: InputMonetaryProps,
  ref: React.Ref<HTMLInputElement>
) {
  const allCurrencies = useSignal<Currency[]>(currencyData);

  const selectedCurrency = allCurrencies.value.find(
    (c) => c.symbol === currency
  );

  return (
    <StyledInputMonetary $inputError={$inputError}>
      <div className="currencySelectorWrapper">
        <div
          className="currencySelector"
          onClick={() => (currencyMenu.value = "currencyOptions")}
        >
          <div className={selectedCurrency?.flagClass} />
          <div>{selectedCurrency?.symbol}</div>
          <FaAngleDown className="angleDown" />
        </div>
      </div>
     
        <StyledInput
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={getSymbolFromCurrency(selectedCurrency?.symbol) + "0"}
          spellCheck="false"
          autoComplete="off"
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          value={value}
          autoFocus={autoFocus}
        
        />
      
    </StyledInputMonetary>
  );
});
