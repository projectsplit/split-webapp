import { useState } from 'react';
import { PlusOffer, PlusPlan } from '@/types';
import { useGetMe } from '@/api/auth/QueryHooks/useGetMe';
import { usePlusPlans } from '@/api/auth/QueryHooks/usePlusPlans';
import { useSubscribeToPlus } from '@/api/auth/CommandHooks/useSubscribeToPlus';
import { isNativeApp } from '@/helpers/platform';
import {
  annualPricePerMonth,
  annualSavingPercent,
  planPeriod,
} from '@/helpers/plusPlans';
import MyButton from '../MyButton/MyButton';
import Spinner from '../Spinner/Spinner';
import { StyledPlusPlans } from './PlusPlans.styled';

/**
 * The two ways to pay for Plus, and the button that buys the chosen one.
 *
 * Every figure is Google Play's own, in the reader's currency: the server names the plans, Play
 * prices them per country, and the saving on the annual plan is worked out from those two prices
 * rather than written down anywhere. The annual plan starts selected. Play's own sheet confirms
 * the price again before anything is charged.
 */

interface PlusPlansProps {
  offer: PlusOffer;
  /** A sentence for above the plans, for when the moment needs one. */
  note?: string;
}

export default function PlusPlans({ offer, note }: PlusPlansProps) {
  const { data: userInfo } = useGetMe();
  const {
    data: plans,
    isPending,
    isError,
  } = usePlusPlans(offer, isNativeApp());

  const [selectedPlan, setSelectedPlan] = useState<PlusPlan>('annual');

  const subscribe = useSubscribeToPlus(userInfo?.userId);

  // The web build has no Play Billing, and the same bundle serves both. Saying where it can be
  // done beats a button that throws on tap.
  if (!isNativeApp()) {
    return (
      <StyledPlusPlans>
        <p className="pitch">
          Plus is bought through Google Play, so subscribing is done from the
          Buqs Android app. Sign in there with this account, and Plus works
          here too.
        </p>
      </StyledPlusPlans>
    );
  }

  if (isPending) {
    return (
      <StyledPlusPlans>
        <div className="loading">
          <Spinner />
        </div>
      </StyledPlusPlans>
    );
  }

  if (isError) {
    return (
      <StyledPlusPlans>
        <p className="unavailable">
          The Plus plans could not be loaded from Google Play. Please try again
          later.
        </p>
      </StyledPlusPlans>
    );
  }

  // Play knows the subscription under neither plan: it has not been created or switched on in the
  // Play Console. The sheet then reads exactly as it did before there was anything to buy.
  if (!plans?.length) return null;

  const annual = plans.find((plan) => plan.plan === 'annual');
  const monthly = plans.find((plan) => plan.plan === 'monthly');
  const chosen = plans.find((plan) => plan.plan === selectedPlan) ?? plans[0];

  const saving =
    annual && monthly ? annualSavingPercent(annual.price, monthly.price) : null;
  const annualPerMonth = annual
    ? annualPricePerMonth(annual.price, annual.currencyCode)
    : null;

  const isBusy = subscribe.isPending;

  return (
    <StyledPlusPlans>
      {note && <p className="pitch">{note}</p>}

      <div className="plans" role="radiogroup" aria-label="Plus plan">
        {plans.map((plan) => {
          const isAnnual = plan.plan === 'annual';
          const isSelected = plan.plan === chosen.plan;

          return (
            <button
              key={plan.basePlanId}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`plan${isSelected ? ' selected' : ''}`}
              disabled={isBusy}
              onClick={() => setSelectedPlan(plan.plan)}
            >
              <span className="radio" />
              <span className="planBody">
                <span className="planName">
                  {isAnnual ? 'Annual' : 'Monthly'}
                  {isAnnual && saving !== null && (
                    <span className="saving">Save {saving}%</span>
                  )}
                </span>
                <span className="planNote">
                  {isAnnual
                    ? annualPerMonth
                      ? `${annualPerMonth} a month, billed once a year`
                      : 'Billed once a year'
                    : 'Billed every month'}
                </span>
              </span>
              <span className="planPrice">
                <span className="amount">{plan.priceString}</span>
                <span className="period">{planPeriod(plan.plan)}</span>
              </span>
            </button>
          );
        })}
      </div>

      {subscribe.isError && <p className="error">{subscribe.error.message}</p>}

      <MyButton
        variant="primary"
        disabled={isBusy}
        isLoading={isBusy}
        onClick={() => subscribe.mutate(chosen)}
      >
        Subscribe for {chosen.priceString} {planPeriod(chosen.plan)}
      </MyButton>

      <p className="terms">
        Renews automatically every {chosen.plan === 'annual' ? 'year' : 'month'}{' '}
        at {chosen.priceString} until you cancel. Cancel any time in Google
        Play, which handles the payment.
      </p>
    </StyledPlusPlans>
  );
}
