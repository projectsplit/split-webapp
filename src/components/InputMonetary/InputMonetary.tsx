import React from 'react';
import { StyledInput, StyledInputMonetary } from './InputMonetary.styled';
import { getSymbolFromCurrency } from '../../helpers/currency-symbol-map';
import { InputMonetaryProps } from '../../interfaces';
import { FaAngleDown } from 'react-icons/fa';

export default React.forwardRef(function InputMonetary(
  {
    onBlur,
    onFocus,
    onChange,
    value,
    $inputError,
    // setMenu,
    currencyMenu,
    selectedCurrency,
    autoFocus,
  }: InputMonetaryProps,
  ref: React.Ref<HTMLInputElement>
) {


  return (
    <StyledInputMonetary $inputError={$inputError}>
      <div className="currencySelectorWrapper">
        <div
          className="currencySelector"
          onClick={() => (currencyMenu.value = 'currencyOptions')}
        >
          <div className={selectedCurrency?.flagClass} />
          <div>{selectedCurrency?.symbol}</div>
          <FaAngleDown className="angleDown" />
        </div>
      </div>

      <StyledInput
        type="text"
        inputMode="decimal"
        placeholder={getSymbolFromCurrency(selectedCurrency?.symbol) + '0'}
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
