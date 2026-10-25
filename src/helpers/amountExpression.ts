import { significantDigitsFromTicker } from './openExchangeRates';

export type AmountOperator = '+' | '−' | '×' | '÷';

export const AMOUNT_OPERATORS: AmountOperator[] = ['+', '−', '×', '÷'];

const MAX_AMOUNT = 999999999999.99;

// Every key that types an operator, mapped to the sign the field shows. Android's decimal
// keyboard only has '-'; the others come from the operator bar or a physical keyboard.
const OPERATOR_KEYS = new Map<string, AmountOperator>([
  ['+', '+'],
  ['-', '−'],
  ['−', '−'],
  ['*', '×'],
  ['×', '×'],
  ['/', '÷'],
  ['÷', '÷'],
]);

const isOperandChar = (char: string) => /[\d.]/.test(char);

// Digits, points and operators. Spaces and thousands separators are only formatting.
const isSignificant = (char: string) =>
  isOperandChar(char) || OPERATOR_KEYS.has(char);

export const hasOperator = (text: string) =>
  [...text].some((char) => OPERATOR_KEYS.has(char));

export const isValidAmount = (value: number) =>
  value > 0 && value <= MAX_AMOUNT;

// Operands at the even indexes, operators at the odd ones. An operator with no operand before it
// is dropped, and a second operator in a row replaces the first, as on a calculator.
const tokenize = (text: string) => {
  const parts: string[] = [];
  for (const char of text) {
    const operator = OPERATOR_KEYS.get(char);
    const endsWithOperand = parts.length % 2 === 1;
    if (operator) {
      if (endsWithOperand) parts.push(operator);
      else if (parts.length > 0) parts[parts.length - 1] = operator;
    } else if (isOperandChar(char)) {
      if (endsWithOperand) parts[parts.length - 1] += char;
      else parts.push(char);
    }
  }
  return parts;
};

// The limits the plain amount mask applies: one decimal point, no leading zeros, and no more
// decimals than the currency has.
const cleanOperand = (operand: string, decimals: number) => {
  const [whole, ...fractions] = operand.split('.');
  const cleanWhole = whole.replace(/^0+(?=\d)/, '');
  if (fractions.length === 0 || decimals === 0) return cleanWhole;
  return `${cleanWhole}.${fractions.join('').slice(0, decimals)}`;
};

// Tokenizing the cleaned text again drops an operand that cleaning emptied, such as a lone point
// in a currency without decimals.
const parse = (text: string, decimals: number) =>
  tokenize(
    tokenize(text)
      .map((part, index) =>
        index % 2 === 0 ? cleanOperand(part, decimals) : part
      )
      .join('')
  );

const groupThousands = (operand: string) => {
  const [whole, ...fraction] = operand.split('.');
  return [whole.replace(/\B(?=(\d{3})+(?!\d))/g, ','), ...fraction].join('.');
};

const render = (parts: string[]) =>
  parts
    .map((part, index) =>
      index % 2 === 0 ? groupThousands(part) : ` ${part} `
    )
    .join('');

// The index of the one character `longer` adds to `shorter`, or -1 when the edit was anything else.
const addedAt = (shorter: string, longer: string) => {
  if (longer.length !== shorter.length + 1) return -1;
  let index = 0;
  while (index < shorter.length && shorter[index] === longer[index]) index++;
  return longer.slice(index + 1) === shorter.slice(index) ? index : -1;
};

const findSignificant = (text: string, from: number, step: 1 | -1) => {
  for (let index = from; index >= 0 && index < text.length; index += step) {
    if (isSignificant(text[index])) return index;
  }
  return -1;
};

// The position after the first `count` significant characters, stepping over the space after an
// operator so that typing carries on with the next operand.
const caretAfter = (text: string, count: number) => {
  let index = 0;
  for (let seen = 0; index < text.length && seen < count; index++) {
    if (isSignificant(text[index])) seen++;
  }
  if (OPERATOR_KEYS.has(text[index - 1])) {
    while (text[index] === ' ') index++;
  }
  return index;
};

/**
 * Reformats the field after an edit that involves arithmetic, such as `1,250 + 40 × 2`. Returns
 * null to reject an edit that makes an operand larger than an amount can be.
 *
 * `previous` is what the field showed before the edit. It tells a typed comma, which some
 * keyboards use as the decimal point, apart from the thousands separators the field adds itself.
 */
export const editAmountExpression = (
  raw: string,
  caret: number,
  previous: string,
  currency: string,
  isForwardDelete: boolean
): { text: string; caret: number } | null => {
  let text = raw;
  let at = caret;

  const typed = addedAt(previous, text);
  if (typed >= 0 && text[typed] === ',') {
    text = `${text.slice(0, typed)}.${text.slice(typed + 1)}`;
  }

  // Deleting a space or separator the field added would only see it come back, so the deletion
  // takes the character beyond it instead.
  const deleted = addedAt(text, previous);
  if (deleted >= 0 && !isSignificant(previous[deleted])) {
    const target = isForwardDelete
      ? findSignificant(text, deleted, 1)
      : findSignificant(text, deleted - 1, -1);
    if (target >= 0) {
      text = text.slice(0, target) + text.slice(target + 1);
      if (!isForwardDelete) at = target;
    }
  }

  const decimals = significantDigitsFromTicker(currency.toUpperCase());
  const parts = parse(text, decimals);
  if (
    parts.some((part, index) => index % 2 === 0 && Number(part) > MAX_AMOUNT)
  ) {
    return null;
  }

  const formatted = render(parts);
  const significantBeforeCaret = parse(text.slice(0, at), decimals).join('');
  return {
    text: formatted,
    caret: caretAfter(formatted, significantBeforeCaret.length),
  };
};

// Rounds half away from zero. toPrecision drops the binary noise first, so 1.005 (stored as
// 1.00499…) rounds up as it does on paper, and the exponent shifts the decimal point without
// multiplying that noise back in.
const roundToDecimals = (value: number, decimals: number) => {
  const magnitude = Math.abs(Number(value.toPrecision(15)));
  if (magnitude < 1e-6) return 0;
  const rounded = Number(
    `${Math.round(Number(`${magnitude}e${decimals}`))}e-${decimals}`
  );
  return value < 0 ? -rounded : rounded;
};

/**
 * What the text adds up to, rounded to the currency's decimals, or null when there is nothing to
 * add up yet or it divides by zero. Multiplication and division come first, as written on paper.
 * A trailing operator, or a last operand that is only a point so far, is left out.
 */
export const evaluateAmountExpression = (text: string, currency: string) => {
  const decimals = significantDigitsFromTicker(currency.toUpperCase());
  const parts = parse(text, decimals);
  while (parts.length > 0 && !/\d/.test(parts[parts.length - 1])) parts.pop();
  if (parts.length === 0) return null;

  let total = 0;
  let sign = 1;
  let term = Number(parts[0]);
  for (let index = 1; index < parts.length; index += 2) {
    const operand = Number(parts[index + 1]);
    switch (parts[index]) {
      case '×':
        term *= operand;
        break;
      case '÷':
        if (operand === 0) return null;
        term /= operand;
        break;
      default:
        total += sign * term;
        sign = parts[index] === '+' ? 1 : -1;
        term = operand;
    }
  }

  const result = roundToDecimals(total + sign * term, decimals);
  return Number.isFinite(result) ? result : null;
};

// Whether the text applies an operator to two numbers, rather than being a plain number or one
// still waiting for its second operand.
export const hasArithmetic = (text: string) => {
  const parts = tokenize(text);
  return parts.length >= 3 && /\d/.test(parts[parts.length - 1]);
};

export const formatAmountResult = (value: number) =>
  `${value < 0 ? '−' : ''}${groupThousands(String(Math.abs(value)))}`;
