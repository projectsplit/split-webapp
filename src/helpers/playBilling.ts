import {
  NativePurchases,
  PURCHASE_TYPE,
  type Product,
} from '@capgo/native-purchases';
import { DonationProduct, DonationTier, DonationTierKind } from '../types';
import { isNativeApp } from './platform';

/**
 * Everything that talks to Google Play from the client.
 *
 * Two rules hold this together. Play owns the price — it is set per country in the Play Console and
 * read off the device here, so the only figure anyone is ever shown is the one they will actually be
 * charged. And Play owns the outcome — a purchase produces a token that means nothing until the
 * server has taken it to Google, so nothing here treats a resolved promise as a donation received.
 *
 * The same bundle also runs as the ordinary web PWA, where the plugin is an unimplemented stub that
 * throws on every call. Every function below is gated on that rather than assuming.
 */

/** Google's cap on the obfuscated account id. User ids are far shorter, but the purchase is rejected outright if one ever is not. */
const MAX_ACCOUNT_TOKEN_LENGTH = 64;

export const isBillingAvailable = async (): Promise<boolean> => {
  if (!isNativeApp()) return false;

  try {
    const { isBillingSupported } = await NativePurchases.isBillingSupported();

    return isBillingSupported;
  } catch (error) {
    console.error('Could not ask Google Play whether billing works:', error);

    return false;
  }
};

const toTier = (
  product: DonationProduct,
  playProduct: Product
): DonationTier => ({
  productId: product.productId,
  kind: product.kind,
  basePlanId: product.basePlanId,
  // Play's own formatting, in the buyer's currency and locale. Deliberately passed through
  // untouched rather than reformatted from the numeric price: Play is the authority on how a price
  // reads in a given country, down to which symbol and where the separators go.
  priceString: playProduct.priceString,
  price: playProduct.price,
  currencyCode: playProduct.currencyCode,
  offerToken: playProduct.offerToken,
});

/**
 * Puts prices on the tiers the server offers.
 *
 * A tier Play does not know about is dropped rather than shown priceless — that is what an id
 * configured on the server but never created in the Play Console looks like, and a button that
 * cannot say what it costs is worse than no button.
 */
export const loadDonationTiers = async (
  products: DonationProduct[]
): Promise<DonationTier[]> => {
  if (!isNativeApp() || products.length === 0) return [];

  // Queried in two calls, one per product type, because Play returns in-app products and
  // subscriptions from separate catalogues. Sequential on purpose: the native billing client
  // races against itself when two queries overlap.
  const oneTime = products.filter((x) => x.kind === DonationTierKind.OneTime);
  const monthly = products.filter((x) => x.kind === DonationTierKind.Monthly);

  const byId = new Map<string, Product>();

  for (const [group, type] of [
    [oneTime, PURCHASE_TYPE.INAPP],
    [monthly, PURCHASE_TYPE.SUBS],
  ] as const) {
    if (group.length === 0) continue;

    try {
      const { products: found } = await NativePurchases.getProducts({
        productIdentifiers: group.map((x) => x.productId),
        productType: type,
      });

      for (const product of found) byId.set(product.identifier, product);
    } catch (error) {
      console.error(`Could not load ${type} products from Google Play:`, error);
    }
  }

  return products
    .map((product) => {
      const playProduct = byId.get(product.productId);

      return playProduct ? toTier(product, playProduct) : null;
    })
    .filter((tier): tier is DonationTier => tier !== null);
};

export type PurchaseOutcome =
  | { ok: true; purchaseToken: string }
  | { ok: false; cancelled: boolean };

/**
 * Opens Play's payment sheet and returns the token it issues.
 *
 * Acknowledgement is left to the server, which is why `autoAcknowledgePurchases` is off: Play
 * refunds anything unacknowledged after three days, so acknowledging here would mean the money
 * sticking whether or not the gift ever reached the ledger. The server acknowledges as part of
 * recording it, and the two therefore cannot come apart.
 */
export const purchaseDonation = async (
  tier: DonationTier,
  userId: string
): Promise<PurchaseOutcome> => {
  if (!isNativeApp()) return { ok: false, cancelled: false };

  if (userId.length > MAX_ACCOUNT_TOKEN_LENGTH) {
    console.error('User id is too long to attach to a Google Play purchase');

    return { ok: false, cancelled: false };
  }

  try {
    const transaction = await NativePurchases.purchaseProduct({
      productIdentifier: tier.productId,
      productType:
        tier.kind === DonationTierKind.Monthly
          ? PURCHASE_TYPE.SUBS
          : PURCHASE_TYPE.INAPP,
      // Play needs to know which plan of a subscription product to bill; ignored for a one-off.
      ...(tier.basePlanId ? { planIdentifier: tier.basePlanId } : {}),
      ...(tier.offerToken ? { offerToken: tier.offerToken } : {}),
      // Comes back to the server on the verified purchase, which is how a gift is tied to an
      // account without trusting the client to say whose it is. An opaque internal id, never an
      // email or a name — Play blocks purchases carrying identifiable information in the clear.
      appAccountToken: userId,
      autoAcknowledgePurchases: false,
    });

    // Android always carries one on a completed purchase. Its absence means the sheet returned
    // something this code does not understand, which must not be reported as a gift.
    if (!transaction.purchaseToken) {
      console.error('Google Play returned a purchase with no token');

      return { ok: false, cancelled: false };
    }

    return { ok: true, purchaseToken: transaction.purchaseToken };
  } catch (error) {
    // Dismissing the sheet throws here just as a real failure does. Treating the two alike would
    // show an error every time someone changed their mind, so cancellation is reported separately.
    const message = error instanceof Error ? error.message.toLowerCase() : '';
    const cancelled =
      message.includes('cancel') || message.includes('canceled');

    if (!cancelled) {
      console.error('Google Play purchase failed:', error);
    }

    return { ok: false, cancelled };
  }
};

/**
 * Gifts that were paid for but never recorded — the app was closed mid-flight, or the network
 * dropped between Play taking the money and the server being told.
 *
 * Unacknowledged is the test, and it is exact: the server acknowledges as the last step of
 * recording a gift, so anything Play still reports as unacknowledged is one that did not get that
 * far. It also matters that these are found quickly, because Play refunds an unacknowledged
 * purchase after three days.
 *
 * Re-posting one costs nothing if it turns out to be known: the server keys on the purchase token,
 * so a second registration overwrites the row it already wrote rather than counting a second gift.
 */
export const findUnregisteredPurchases = async (): Promise<
  { productId: string; purchaseToken: string }[]
> => {
  if (!isNativeApp()) return [];

  try {
    const { purchases } = await NativePurchases.getPurchases();

    return purchases
      .filter(
        (purchase) =>
          Boolean(purchase.purchaseToken) &&
          purchase.isAcknowledged === false &&
          // Pending on Android, where the money has not arrived yet. Play will send the server its
          // own notification when it does, so there is nothing for the app to report.
          purchase.purchaseState === '1'
      )
      .map((purchase) => ({
        productId: purchase.productIdentifier,
        purchaseToken: purchase.purchaseToken as string,
      }));
  } catch (error) {
    console.error('Could not read purchases back from Google Play:', error);

    return [];
  }
};

/** Opens Play's own subscription management page, the only place a monthly gift can be stopped. */
export const openSubscriptionManagement = async (): Promise<void> => {
  if (!isNativeApp()) return;

  try {
    await NativePurchases.manageSubscriptions();
  } catch (error) {
    console.error('Could not open Google Play subscription management:', error);
  }
};
