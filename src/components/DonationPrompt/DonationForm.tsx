import { useEffect, useState } from 'react';
import {
  DonationProduct,
  DonationPromptInfo,
  DonationTier,
  DonationTierKind,
} from '../../types';
import { useDonate } from '../../api/auth/CommandHooks/useDonate';
import { useDonationTiers } from '../../api/auth/QueryHooks/useDonationTiers';
import { useGetMe } from '@/api/auth/QueryHooks/useGetMe';
import { loadDonationTiers } from '@/helpers/playBilling';
import { isNativeApp } from '@/helpers/platform';
import MyButton from '../MyButton/MyButton';
import Spinner from '../Spinner/Spinner';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import PuppyEyes from './PuppyEyes';
import {
  AmountRow,
  Disclaimer,
  ErrorText,
  Footnote,
  Headline,
  OtherAmount,
  Preset,
  PuppyFrame,
  StyledDonationForm,
  Subhead,
  ThankYou,
} from './DonationPrompt.styled';

/**
 * The ask itself, shown in the support sheet. One place where the wording, the tiers and the flow
 * live.
 *
 * Google Play only sells products defined in the Play Console, at prices it sets per country, so
 * every figure here is Play's own, in the reader's currency. "Other amount" works within that rule:
 * there is one product per whole amount, and the typed figure picks which one to buy. Play's own
 * checkout then shows the exact price before anything is charged.
 */

/** Stands in for a product id while "Other amount" is the selection. */
const OTHER = 'other';

/** 1700 as "17", 1750 as "17.50": decimals only when there are any. */
const formatMinor = (minor: number) =>
  minor % 100 === 0 ? String(minor / 100) : (minor / 100).toFixed(2);

/**
 * What may be typed: digits with at most one decimal point and two places after it. A comma counts
 * as the point, since many keyboards offer only that.
 */
const cleanTypedAmount = (raw: string) => {
  const [whole, ...rest] = raw
    .replace(/,/g, '.')
    .replace(/[^\d.]/g, '')
    .split('.');
  return rest.length ? `${whole}.${rest.join('').slice(0, 2)}` : whole;
};

/** The symbol for a currency code in the reader's locale, e.g. "£" for GBP. Empty if unknown. */
const currencySymbol = (currencyCode: string | undefined) => {
  if (!currencyCode) return '';

  try {
    return (
      new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol',
      })
        .formatToParts(0)
        .find((part) => part.type === 'currency')?.value ?? ''
    );
  } catch {
    return '';
  }
};

interface DonationFormProps {
  info: DonationPromptInfo;
  /** Shown above the amounts. Differs for someone who has given before or gives monthly. */
  headline: string;
  subhead: string;
  showPuppy?: boolean;
  /** Called once a gift has actually been recorded. */
  onGiven?: () => void;
}

export default function DonationForm({
  info,
  headline,
  subhead,
  showPuppy = true,
  onGiven,
}: DonationFormProps) {
  const { data: userInfo } = useGetMe();

  const { data: tiers, isPending: isLoadingTiers } = useDonationTiers(
    info.products,
    info.isAvailable
  );

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [typedAmount, setTypedAmount] = useState('');
  const [isOtherMonthly, setIsOtherMonthly] = useState(false);
  const [isFindingAmount, setIsFindingAmount] = useState(false);
  const [otherError, setOtherError] = useState<string | null>(null);
  const [hasGiven, setHasGiven] = useState(false);

  const donate = useDonate(userInfo?.userId);

  // The cheapest one-off starts selected. An anchor rather than a recommendation, and one that is
  // always one tap from any other — picking the largest by default would read as a shakedown.
  useEffect(() => {
    if (selectedProductId !== null || !tiers?.length) return;

    const oneTime = tiers.filter((x) => x.kind === DonationTierKind.OneTime);
    const cheapest = (oneTime.length ? oneTime : tiers).reduce((low, tier) =>
      tier.price < low.price ? tier : low
    );

    setSelectedProductId(cheapest.productId);
  }, [tiers, selectedProductId]);

  const customAmount = info.customAmount;
  const isOther = selectedProductId === OTHER;
  const selected: DonationTier | undefined = tiers?.find(
    (tier) => tier.productId === selectedProductId
  );

  // The products for typed amounts are priced as the same number in each currency, so the reader's
  // currency is whatever Play quotes the fixed tiers in.
  const symbol = currencySymbol(tiers?.[0]?.currencyCode);

  // In minor units, and only when it is one of the amounts that exist as products.
  const typedMinor = /^\d+(\.\d{1,2})?$/.test(typedAmount)
    ? Math.round(Number(typedAmount) * 100)
    : null;
  const otherAmount =
    customAmount &&
    typedMinor !== null &&
    typedMinor >= customAmount.stepMinor &&
    typedMinor <= customAmount.maxMinor &&
    typedMinor % customAmount.stepMinor === 0
      ? typedMinor
      : null;

  const give = (tier: DonationTier) => {
    donate.mutate(tier, {
      onSuccess: (outcome) => {
        if (outcome !== 'given') return;

        setHasGiven(true);
        onGiven?.();
      },
    });
  };

  const handleGive = async () => {
    if (!isOther) {
      if (selected) give(selected);
      return;
    }

    if (!customAmount || otherAmount === null) return;

    const product: DonationProduct = isOtherMonthly
      ? {
          productId: `${customAmount.monthlyProductPrefix}${otherAmount}`,
          kind: DonationTierKind.Monthly,
          basePlanId: customAmount.monthlyBasePlanId,
        }
      : {
          productId: `${customAmount.oneTimeProductPrefix}${otherAmount}`,
          kind: DonationTierKind.OneTime,
          basePlanId: null,
        };

    // Asked for on demand rather than loaded with the tiers: there is a product for every amount,
    // and only the one typed is ever needed.
    setOtherError(null);
    setIsFindingAmount(true);
    const [tier] = await loadDonationTiers([product]);
    setIsFindingAmount(false);

    if (!tier) {
      setOtherError(
        "That amount isn't available right now. Please try another."
      );
      return;
    }

    give(tier);
  };

  // Only ever shown once the server has confirmed the gift, which it does by verifying the purchase
  // with Google before answering. Nothing here is a guess about whether the money arrived.
  if (hasGiven) {
    return (
      <StyledDonationForm>
        {showPuppy && (
          <PuppyFrame>
            <PuppyEyes mood="happy" />
          </PuppyFrame>
        )}

        <ThankYou>
          <div className="title">
            {userInfo?.username
              ? `Thank you, ${userInfo.username}`
              : 'Thank you'}
          </div>
          <div className="body">
            That genuinely helps keep the server running. Google Play will email
            you a receipt.
          </div>
        </ThankYou>
      </StyledDonationForm>
    );
  }

  // The web build has no Play Billing, and the same bundle serves both. Saying where it can be done
  // beats a button that throws on tap.
  if (!isNativeApp()) {
    return (
      <StyledDonationForm>
        {showPuppy && (
          <PuppyFrame>
            <PuppyEyes />
          </PuppyFrame>
        )}

        <Headline>{headline}</Headline>
        <Subhead>{subhead}</Subhead>

        <Footnote>
          Contributions go through Google Play, so they can only be made from
          the Buqs Android app. Buqs is free either way.
        </Footnote>
      </StyledDonationForm>
    );
  }

  const requestError = donate.isError
    ? 'The payment could not be completed. Please try again.'
    : null;

  // Play knows about none of the configured tiers. Almost always a build talking to a Play account
  // where the products do not exist yet, and there is nothing a person can do about it.
  const hasNoTiers = !isLoadingTiers && !tiers?.length;

  const isMonthly = isOther
    ? isOtherMonthly
    : selected?.kind === DonationTierKind.Monthly;

  const giveLabel = isOther
    ? otherAmount === null
      ? 'Enter an amount'
      : `Give ${symbol}${formatMinor(otherAmount)}${isOtherMonthly ? ' monthly' : ''}`
    : !selected
      ? ''
      : isMonthly
        ? `Give ${selected.priceString} monthly`
        : `Give ${selected.priceString}`;

  const isBusy = donate.isPending || isFindingAmount;

  return (
    <StyledDonationForm>
      {showPuppy && (
        <PuppyFrame>
          <PuppyEyes />
        </PuppyFrame>
      )}

      <Headline>{headline}</Headline>
      <Subhead>{subhead}</Subhead>

      {isLoadingTiers && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {hasNoTiers && (
        <ErrorText>
          Contributions are unavailable right now. Please try again later.
        </ErrorText>
      )}

      {!isLoadingTiers && Boolean(tiers?.length) && (
        <AmountRow>
          {tiers?.map((tier) => (
            <Preset
              key={tier.productId}
              type="button"
              $selected={tier.productId === selectedProductId}
              onClick={() => setSelectedProductId(tier.productId)}
            >
              {tier.priceString}
              {tier.kind === DonationTierKind.Monthly && <span>Monthly</span>}
            </Preset>
          ))}
          {/* On its own row under the amounts, whatever the count above, so it never ends up as
              the one tier left dangling on a second line. */}
          {customAmount && (
            <Preset
              type="button"
              style={{ gridColumn: '1 / -1' }}
              $selected={isOther}
              onClick={() => setSelectedProductId(OTHER)}
            >
              Other amount
            </Preset>
          )}
        </AmountRow>
      )}

      {isOther && customAmount && (
        <OtherAmount>
          <label className="amountInput">
            <span className="currency">{symbol}</span>
            <input
              type="text"
              inputMode="decimal"
              autoFocus
              placeholder={`${formatMinor(customAmount.stepMinor)} to ${formatMinor(customAmount.maxMinor)}`}
              aria-label="Amount to give"
              value={typedAmount}
              onChange={(event) => {
                setTypedAmount(cleanTypedAmount(event.target.value));
                setOtherError(null);
              }}
            />
          </label>
          {typedAmount !== '' && otherAmount === null && (
            <ErrorText>
              Enter an amount from {formatMinor(customAmount.stepMinor)} to{' '}
              {formatMinor(customAmount.maxMinor)}, in steps of{' '}
              {formatMinor(customAmount.stepMinor)}.
            </ErrorText>
          )}
          <div className="monthlyRow">
            <span>Make it monthly</span>
            <ToggleSwitch
              isOn={isOtherMonthly}
              onToggle={() => setIsOtherMonthly((value) => !value)}
            />
          </div>
          <Disclaimer>
            Google Play shows the final price before you pay.
          </Disclaimer>
        </OtherAmount>
      )}

      {otherError && <ErrorText>{otherError}</ErrorText>}
      {requestError && <ErrorText>{requestError}</ErrorText>}

      {(selected || isOther) && (
        <MyButton
          variant="primary"
          disabled={isBusy || (isOther && otherAmount === null)}
          isLoading={isBusy}
          onClick={handleGive}
        >
          {giveLabel}
        </MyButton>
      )}

      <Disclaimer>
        Payment is handled by Google Play. Buqs never sees your card details.
      </Disclaimer>
      <Footnote>
        Everything that is free in Buqs today will always be free, whether or
        not you give. New features that depend on a third-party provider may
        need a paid subscription.
        {isMonthly &&
          ' A monthly gift can be cancelled any time from Google Play.'}
      </Footnote>
    </StyledDonationForm>
  );
}
