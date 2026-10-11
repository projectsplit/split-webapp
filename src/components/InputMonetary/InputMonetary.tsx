import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { StyledInput, StyledInputMonetary } from './InputMonetary.styled';
import { getSymbolFromCurrency } from '../../helpers/currency-symbol-map';
import { InputMonetaryProps } from '../../interfaces';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import CalculatorBar from './CalculatorBar/CalculatorBar';
import {
  AmountOperator,
  evaluateAmountExpression,
  formatAmountResult,
  hasArithmetic,
  hasOperator,
  isValidAmount,
} from '../../helpers/amountExpression';

// How long typing has to pause before the result of a sum appears under it.
const RESULT_DELAY_MS = 350;

// How far the viewport has to grow back to count as the keyboard closing, rather than the
// keyboard switching to a shorter layout.
const KEYBOARD_CLOSED_GROWTH_PX = 150;

// Sets the text the way typing does, so the form's own onChange formats it and updates the
// amount. Going through the prototype's setter keeps React from treating the event as a
// non-change, since React tracks values set through the element itself.
const typeIntoInput = (
  input: HTMLInputElement,
  text: string,
  caret = text.length
) => {
  Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  )?.set?.call(input, text);
  if (input === document.activeElement) input.setSelectionRange(caret, caret);
  input.dispatchEvent(new Event('input', { bubbles: true }));
};

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
    calculatorBarHost,
  }: InputMonetaryProps,
  _ref: React.Ref<HTMLInputElement>
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const hideBarTimer = useRef(0);
  const currency = selectedCurrency?.symbol ?? '';
  const text = value ?? '';

  const result = hasOperator(text)
    ? evaluateAmountExpression(text, currency)
    : null;
  const canApplyResult = result !== null && isValidAmount(result);
  const preview =
    hasArithmetic(text) && result !== null
      ? `= ${formatAmountResult(result)}`
      : '';
  const [settledPreview, setSettledPreview] = useState('');
  const isPreviewShown = preview !== '' && preview === settledPreview;

  useEffect(() => {
    const timer = window.setTimeout(
      () => setSettledPreview(preview),
      RESULT_DELAY_MS
    );
    return () => window.clearTimeout(timer);
  }, [preview]);

  // Replaces a sum with its result, which the form already holds as the amount.
  const applyResult = () => {
    const input = inputRef.current;
    if (!input || !hasOperator(input.value)) return;
    const sum = evaluateAmountExpression(input.value, currency);
    if (sum !== null && isValidAmount(sum)) typeIntoInput(input, String(sum));
  };

  const insertOperator = (operator: AmountOperator) => {
    const input = inputRef.current;
    if (!input || input.value === '') return;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    typeIntoInput(
      input,
      input.value.slice(0, start) + operator + input.value.slice(end),
      start + 1
    );
  };

  const handleFocus = () => {
    window.clearTimeout(hideBarTimer.current);
    setIsFocused(true);
    // A tap on the empty side of the right-aligned field would leave the caret at the start,
    // where an operator from the bar has nothing before it. Typing carries on from the end
    // instead; a tap once the field is focused still places the caret where it lands.
    window.setTimeout(() => {
      const input = inputRef.current;
      if (input && input === document.activeElement) {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  };

  const handleBlur = () => {
    applyResult();
    // The bar goes on a later task so the tap that moved focus lands first. Removing the bar
    // moves the footer above it, which would slide Submit out from under that tap.
    hideBarTimer.current = window.setTimeout(() => setIsFocused(false));
  };

  useEffect(() => {
    // autoFocus can focus the field before React is listening for it.
    if (document.activeElement === inputRef.current) setIsFocused(true);
    return () => window.clearTimeout(hideBarTimer.current);
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    // Dismissing the keyboard on Android leaves the field focused, which would keep the bar up
    // with nothing under it. The page growing back is the one sign of that both the app and the
    // browser get. This reads the layout viewport: while the keyboard opens, the WebView briefly
    // reports a visual viewport far shorter than the keyboard leaves, and the recovery from that
    // looked like the keyboard closing again.
    let smallest = window.innerHeight;
    const blurIfKeyboardClosed = () => {
      smallest = Math.min(smallest, window.innerHeight);
      if (window.innerHeight - smallest > KEYBOARD_CLOSED_GROWTH_PX) {
        inputRef.current?.blur();
      }
    };
    window.addEventListener('resize', blurIfKeyboardClosed);
    return () => window.removeEventListener('resize', blurIfKeyboardClosed);
  }, [isFocused]);

  return (
    <StyledInputMonetary $inputError={$inputError}>
      <div className="currencySelectorWrapper">
        <CurrencySelector
          code={selectedCurrency?.symbol}
          onClick={() => (currencyMenu.value = 'currencyOptions')}
        />
      </div>

      <div
        className="amountField"
        style={
          {
            '--amount-length': Math.max(text.length, 1),
          } as React.CSSProperties
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <StyledInput
          ref={inputRef}
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
        <span
          className={`result${isPreviewShown ? ' shown' : ''}${
            canApplyResult ? '' : ' invalid'
          }`}
        >
          {preview}
        </span>
      </div>

      {isFocused &&
        calculatorBarHost &&
        createPortal(
          <CalculatorBar
            onOperator={insertOperator}
            onEquals={applyResult}
            canAddOperator={text !== ''}
            canApplyResult={canApplyResult}
          />,
          calculatorBarHost
        )}
    </StyledInputMonetary>
  );
});
