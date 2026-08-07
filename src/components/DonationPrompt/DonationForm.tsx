import { useState } from 'react';
import { DonationPromptInfo } from '../../types';
import { useCreateDonationCheckout } from '../../api/auth/CommandHooks/useCreateDonationCheckout';
import MyButton from '../MyButton/MyButton';
import PuppyEyes from './PuppyEyes';
import {
  AmountRow,
  CustomAmount,
  CustomAmountRow,
  Disclaimer,
  ErrorText,
  Footnote,
  Headline,
  MonthlyRow,
  Preset,
  PuppyFrame,
  StyledDonationForm,
  Subhead,
} from './DonationPrompt.styled';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

/**
 * The ask itself. Shared by the occasional prompt and the permanent settings entry so there is one
 * place where the wording, the amounts and the bounds live.
 */

const MINOR_UNITS_PER_MAJOR = 100;

const formatAmount = (minor: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency.toUpperCase(),
    // Whole amounts read as prices with the trailing zeroes and as asks without them.
    minimumFractionDigits: minor % MINOR_UNITS_PER_MAJOR === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(minor / MINOR_UNITS_PER_MAJOR);

const currencySymbol = (currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .formatToParts(0)
    .find((part) => part.type === 'currency')?.value ?? '';

interface DonationFormProps {
  info: DonationPromptInfo;
  /** Shown above the amounts. Differs between being asked and choosing to give unprompted. */
  headline: string;
  subhead: string;
  showPuppy?: boolean;
}

export default function DonationForm({
  info,
  headline,
  subhead,
  showPuppy = true,
}: DonationFormProps) {
  // The recommended amount starts selected. It is an anchor, and one that has to be easy to move
  // off — every preset and the free-text field are one tap away.
  const [amountMinor, setAmountMinor] = useState(info.suggestedAmountMinor);
  const [customText, setCustomText] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);

  const checkout = useCreateDonationCheckout();

  const isPreset = info.presetAmountsMinor.includes(amountMinor);

  const handleCustomChange = (raw: string) => {
    // Digits and one separator only. A number input would be the obvious choice but its spinners
    // are already stripped globally, and this keeps the mobile keypad without the stepper.
    const cleaned = raw.replace(/[^0-9.,]/g, '').replace(',', '.');

    setCustomText(cleaned);

    // Emptying the field falls back to the suggested amount rather than leaving whatever was typed
    // last standing behind a blank input, which would have the button offering an amount that is
    // written down nowhere on screen.
    if (cleaned === '') {
      setAmountMinor(info.suggestedAmountMinor);
      return;
    }

    const parsed = Number.parseFloat(cleaned);

    if (Number.isFinite(parsed)) {
      setAmountMinor(Math.round(parsed * MINOR_UNITS_PER_MAJOR));
    }
  };

  const isAmountValid =
    amountMinor >= info.minAmountMinor && amountMinor <= info.maxAmountMinor;

  const amountError =
    customText !== '' && !isAmountValid
      ? `Please enter between ${formatAmount(info.minAmountMinor, info.currency)} and ${formatAmount(
          info.maxAmountMinor,
          info.currency
        )}`
      : null;

  // The server's message names minor units, which is right for an API and wrong for a person.
  const requestError = checkout.isError
    ? 'Could not open the payment page. Please try again.'
    : null;

  return (
    <StyledDonationForm>
      {showPuppy && (
        <PuppyFrame>
          <PuppyEyes />
        </PuppyFrame>
      )}

      <Headline>{headline}</Headline>
      <Subhead>{subhead}</Subhead>

      <AmountRow>
        {info.presetAmountsMinor.map((preset) => (
          <Preset
            key={preset}
            type="button"
            $selected={amountMinor === preset && customText === ''}
            onClick={() => {
              setAmountMinor(preset);
              setCustomText('');
            }}
          >
            {formatAmount(preset, info.currency)}
            {preset === info.suggestedAmountMinor && <span>Suggested</span>}
          </Preset>
        ))}
      </AmountRow>

      <CustomAmountRow $active={customText !== '' || !isPreset}>
        <span className="symbol">{currencySymbol(info.currency)}</span>
        <CustomAmount
          inputMode="decimal"
          placeholder="Other amount"
          value={customText}
          onChange={(event) => handleCustomChange(event.target.value)}
        />
      </CustomAmountRow>

      <MonthlyRow>
        <div className="label">
          <span>Give this every month</span>
          <span className="hint">Cancel any time, from your receipt email</span>
        </div>
        <ToggleSwitch isOn={isMonthly} onToggle={() => setIsMonthly(!isMonthly)} />
      </MonthlyRow>

      {amountError && <ErrorText>{amountError}</ErrorText>}
      {requestError && <ErrorText>{requestError}</ErrorText>}

      <MyButton
        variant="primary"
        disabled={!isAmountValid || checkout.isPending}
        isLoading={checkout.isPending}
        onClick={() =>
          checkout.mutate({ amountMinor, monthly: isMonthly })
        }
      >
        {isMonthly
          ? `Give ${formatAmount(amountMinor, info.currency)} monthly`
          : `Give ${formatAmount(amountMinor, info.currency)}`}
      </MyButton>

      <Disclaimer>
        Payment is handled by Stripe. Buqs never sees your card details.
      </Disclaimer>
      <Footnote>
        Buqs is free, and stays free whether or not you give.
      </Footnote>
    </StyledDonationForm>
  );
}
