import { useEffect, useState } from 'react';
import {
  DonationPromptInfo,
  DonationTier,
  DonationTierKind,
} from '../../types';
import { useDonate } from '../../api/auth/CommandHooks/useDonate';
import { useDonationTiers } from '../../api/auth/QueryHooks/useDonationTiers';
import { useGetMe } from '@/api/auth/QueryHooks/useGetMe';
import { isNativeApp } from '@/helpers/platform';
import MyButton from '../MyButton/MyButton';
import Spinner from '../Spinner/Spinner';
import PuppyEyes from './PuppyEyes';
import {
  AmountRow,
  Disclaimer,
  ErrorText,
  Footnote,
  Headline,
  Preset,
  PuppyFrame,
  StyledDonationForm,
  Subhead,
  ThankYou,
} from './DonationPrompt.styled';

/**
 * The ask itself. Shared by the occasional prompt and the permanent settings entry so there is one
 * place where the wording, the tiers and the flow live.
 *
 * The amounts are fixed rather than typed in, and that is Google Play's rule rather than a choice:
 * Play only sells products defined in the Play Console, at prices it sets per country. The upside
 * is that every price shown here is Play's own, in the reader's currency, and is exactly what they
 * will be charged.
 */

interface DonationFormProps {
  info: DonationPromptInfo;
  /** Shown above the amounts. Differs between being asked and choosing to give unprompted. */
  headline: string;
  subhead: string;
  showPuppy?: boolean;
  /** Called once a gift has actually been recorded, so a prompt can close itself. */
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

  const selected: DonationTier | undefined = tiers?.find(
    (tier) => tier.productId === selectedProductId
  );

  const handleGive = () => {
    if (!selected) return;

    donate.mutate(selected, {
      onSuccess: (outcome) => {
        if (outcome !== 'given') return;

        setHasGiven(true);
        onGiven?.();
      },
    });
  };

  // Only ever shown once the server has confirmed the gift, which it does by verifying the purchase
  // with Google before answering. Nothing here is a guess about whether the money arrived.
  if (hasGiven) {
    return (
      <StyledDonationForm>
        {showPuppy && (
          <PuppyFrame>
            <PuppyEyes />
          </PuppyFrame>
        )}

        <ThankYou>
          <div className="title">Thank you</div>
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
              {tier.kind === DonationTierKind.Monthly && (
                <span>Every month</span>
              )}
            </Preset>
          ))}
        </AmountRow>
      )}

      {requestError && <ErrorText>{requestError}</ErrorText>}

      {selected && (
        <MyButton
          variant="primary"
          disabled={donate.isPending}
          isLoading={donate.isPending}
          onClick={handleGive}
        >
          {selected.kind === DonationTierKind.Monthly
            ? `Give ${selected.priceString} monthly`
            : `Give ${selected.priceString}`}
        </MyButton>
      )}

      <Disclaimer>
        Payment is handled by Google Play. Buqs never sees your card details.
      </Disclaimer>
      <Footnote>
        Buqs is free, and stays free whether or not you give.
        {selected?.kind === DonationTierKind.Monthly &&
          ' A monthly gift can be cancelled any time from Google Play.'}
      </Footnote>
    </StyledDonationForm>
  );
}
