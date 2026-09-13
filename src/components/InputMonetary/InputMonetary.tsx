import React from 'react';
import { StyledInput, StyledInputMonetary } from './InputMonetary.styled';
import { getSymbolFromCurrency } from '../../helpers/currency-symbol-map';
import { InputMonetaryProps } from '../../interfaces';
import CurrencySelector from '../CurrencySelector/CurrencySelector';

export default React.forwardRef(function InputMonetary(
  {
    onBlur,
    onFocus,
    onChange,
    value,
    $inputError,
    currencyMenu,
    selectedCurrency,
    autoFocus,
  }: InputMonetaryProps,
  _ref: React.Ref<HTMLInputElement>
) {

  return (
    <StyledInputMonetary $inputError={$inputError}>
      <div className="currencySelectorWrapper">
        <CurrencySelector
          code={selectedCurrency?.symbol}
          onClick={() => (currencyMenu.value = 'currencyOptions')}
        />
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
