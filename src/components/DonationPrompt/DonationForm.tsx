import { useEffect, useRef, useState } from 'react';
import {
  DonationPromptInfo,
  DonationTier,
  DonationTierKind,
} from '../../types';
import { useDonate } from '../../api/auth/CommandHooks/useDonate';
import { useDonationAmounts } from '../../api/auth/QueryHooks/useDonationAmounts';
import { useDonationTiers } from '../../api/auth/QueryHooks/useDonationTiers';
import { useGetMe } from '@/api/auth/QueryHooks/useGetMe';
import { isNativeApp } from '@/helpers/platform';
import MyButton from '../MyButton/MyButton';
import Spinner from '../Spinner/Spinner';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import PuppyEyes from './PuppyEyes';
import {
  AmountRange,
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
 * The ask itself. Shared by the occasional prompt and the permanent support sheet so there is one
 * place where the wording, the tiers and the flow live.
 *
 * Google Play only sells products defined in the Play Console, at prices it sets per country, so
 * every figure here is Play's own, in the reader's currency. "Other amount" works within that rule:
 * there is one product per whole amount, Play prices each of them for the reader's country, and the
 * typed figure picks the one whose price is nearest. The button shows that price, and Play's own
 * checkout confirms it before anything is charged.
 */

/** Stands in for a product id while "Other amount" is the selection. */
const OTHER = 'other';

/** The nearest ancestor that scrolls its own content: the sheet the form sits in. */
const scrollingAncestor = (element: HTMLElement | null) => {
  for (let node = element?.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === 'auto' || overflowY === 'scroll') return node;
  }

  return null;
};

/**
 * The amount to buy for a typed figure: the one whose price here is nearest to it. In dollars,
 * euros, pounds and Swiss francs that is the figure itself; elsewhere each amount costs Play's
 * conversion of that many dollars, so the nearest is as close as Play can sell. A figure below the
 * cheapest or above the dearest matches nothing, rather than being quietly moved into range.
 * Expects the amounts cheapest first.
 */
const nearestAmount = (amounts: DonationTier[], typed: number) => {
  if (
    amounts.length === 0 ||
    typed < amounts[0].price ||
    typed > amounts[amounts.length - 1].price
  ) {
    return null;
  }

  return amounts.reduce((nearest, amount) =>
    Math.abs(amount.price - typed) < Math.abs(nearest.price - typed)
      ? amount
      : nearest
  );
};

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
  /** Shown above the amounts. Differs between being asked and choosing to give unprompted. */
  headline: string;
  subhead: string;
  showPuppy?: boolean;
  /** Called once a gift has actually been recorded, so a prompt can stop offering to dismiss. */
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

  const offersMonthly = Boolean(customAmount?.monthlyMaxMinor);
  const isOtherMonthlyKind = isOtherMonthly && offersMonthly;

  // Two hundred prices nobody needs until "Other amount" is picked, so they are asked for only then.
  const { data: amounts, isPending: isLoadingAmounts } = useDonationAmounts(
    customAmount,
    isOtherMonthlyKind ? DonationTierKind.Monthly : DonationTierKind.OneTime,
    isOther && info.isAvailable
  );
  const cheapest = amounts?.[0];
  const dearest =
    amounts && amounts.length > 0 ? amounts[amounts.length - 1] : undefined;

  // The currency Play quotes is the one it charges in, so that is the symbol beside the box.
  const symbol = currencySymbol(
    cheapest?.currencyCode ?? tiers?.[0]?.currencyCode
  );

  // A trailing point is a decimal still being typed, so "12." already counts as 12.
  const typedValue = /^\d+(\.\d{0,2})?$/.test(typedAmount)
    ? Number(typedAmount)
    : null;
  const matched =
    typedValue !== null && amounts ? nearestAmount(amounts, typedValue) : null;
  const isBelowRange =
    typedValue !== null && cheapest !== undefined && typedValue < cheapest.price;
  const isAboveRange =
    typedValue !== null && dearest !== undefined && typedValue > dearest.price;

  // What the button buys and prices: Play's figure for exactly that product, so a typed amount shows
  // as the nearest one Play sells rather than as typed.
  const toBuy = isOther ? matched : selected;

  const otherRef = useRef<HTMLDivElement>(null);

  // The keyboard opens straight onto the amount box and shrinks the sheet around it, which otherwise
  // leaves the box half hidden and the button that answers it under the keyboard. Centring the box
  // keeps the range above it and the button below it in view, as MemberPicker does for its rows.
  useEffect(() => {
    if (!isOther) return;

    let frame = 0;

    const revealAmount = () => {
      const box = otherRef.current?.querySelector('.amountInput');
      if (!box || !box.contains(document.activeElement)) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        box.scrollIntoView({ block: 'center' });
      });
    };

    // The sheet's height is a share of the viewport, and it can settle a frame after the viewport
    // reports the keyboard. Centring on the viewport event alone then sometimes measured the sheet
    // before it had shrunk, so its own size change triggers it too.
    const sheetResized = new ResizeObserver(revealAmount);
    const sheet = scrollingAncestor(otherRef.current);
    if (sheet) sheetResized.observe(sheet);

    document.addEventListener('focusin', revealAmount);
    window.visualViewport?.addEventListener('resize', revealAmount);
    return () => {
      cancelAnimationFrame(frame);
      sheetResized.disconnect();
      document.removeEventListener('focusin', revealAmount);
      window.visualViewport?.removeEventListener('resize', revealAmount);
    };
  }, [isOther]);

  const give = (tier: DonationTier) => {
    donate.mutate(tier, {
      onSuccess: (outcome) => {
        if (outcome !== 'given') return;

        setHasGiven(true);
        onGiven?.();
      },
    });
  };

  const handleGive = () => {
    if (toBuy) give(toBuy);
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
    ? isOtherMonthlyKind
    : selected?.kind === DonationTierKind.Monthly;

  // Below the cheapest is often a figure still being typed ("1" on the way to "150"), so only the
  // button says so; past the dearest no further digit can help, so the range line turns red too.
  const giveLabel = toBuy
    ? `Give ${toBuy.priceString}${isMonthly ? ' monthly' : ''}`
    : !isOther
      ? ''
      : isBelowRange && cheapest
        ? `Minimum ${cheapest.priceString}`
        : isAboveRange && dearest
          ? `Maximum ${dearest.priceString}`
          : 'Enter an amount';

  const isBusy = donate.isPending;

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
              style={{ flexBasis: '100%' }}
              $selected={isOther}
              onClick={() => setSelectedProductId(OTHER)}
            >
              Other amount
            </Preset>
          )}
        </AmountRow>
      )}

      {isOther && customAmount && (
        <OtherAmount ref={otherRef}>
          {isLoadingAmounts ? (
            <div className="loading">
              <Spinner />
            </div>
          ) : !cheapest || !dearest ? (
            <ErrorText>
              Other amounts are unavailable right now. Please try again later.
            </ErrorText>
          ) : (
            <>
              {/* Above the box rather than under it: the keyboard opens straight onto the box, and
                  anything below it starts out hidden behind the keyboard. */}
              <AmountRange $outside={isAboveRange}>
                From {cheapest.priceString} to {dearest.priceString}
              </AmountRange>
              <label className="amountInput">
                <span className="currency">{symbol}</span>
                <input
                  type="text"
                  inputMode={
                    amounts?.every((amount) => Number.isInteger(amount.price))
                      ? 'numeric'
                      : 'decimal'
                  }
                  autoFocus
                  aria-label="Amount to give"
                  value={typedAmount}
                  onChange={(event) =>
                    setTypedAmount(cleanTypedAmount(event.target.value))
                  }
                />
              </label>
              {/* Within half a cent counts as exact: both sides are decimals stored as floats. */}
              {matched &&
                typedValue !== null &&
                Math.abs(typedValue - matched.price) >= 0.005 && (
                <Disclaimer>
                  The nearest amount Google Play offers is {matched.priceString}.
                </Disclaimer>
              )}
            </>
          )}
          {offersMonthly && (
            <div className="monthlyRow">
              <span>Make it monthly</span>
              <ToggleSwitch
                isOn={isOtherMonthly}
                onToggle={() => setIsOtherMonthly((value) => !value)}
              />
            </div>
          )}
          <Disclaimer>
            Google Play shows the final price before you pay.
          </Disclaimer>
        </OtherAmount>
      )}

      {requestError && <ErrorText>{requestError}</ErrorText>}

      {(selected || isOther) && (
        <MyButton
          variant="primary"
          disabled={isBusy || !toBuy}
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
