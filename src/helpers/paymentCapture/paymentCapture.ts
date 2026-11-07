import { PluginListenerHandle, registerPlugin } from '@capacitor/core';
import { isAndroidApp } from '../platform';

/** A notification the listener kept, as the phone stored it. */
export type CapturedPayment = {
  /** Derived from the notification itself, and used as the expense's id once it is filed. */
  id: string;
  packageName: string;
  appName: string;
  title: string;
  text: string;
  /** When Android says it was posted, in milliseconds. */
  postedAt: number;
};

export type PaymentCaptureStatus = {
  /** Whether the person has given Buqs notification access in Android's settings. */
  access: boolean;
  /** Whether the person has turned this on in Buqs. */
  enabled: boolean;
  /** Whether Android has the listener bound right now. */
  connected: boolean;
  /** When a payment was last kept, in milliseconds, or 0 for never. */
  lastCapturedAt: number;
};

/** An app that has posted something that looked like a payment, whether or not it is read. */
export type SeenPaymentApp = {
  packageName: string;
  appName: string;
  count: number;
  lastSeenAt: number;
};

interface PaymentCapturePlugin {
  getStatus(): Promise<PaymentCaptureStatus>;
  setEnabled(options: { enabled: boolean }): Promise<void>;
  openAccessSettings(): Promise<void>;
  getSources(): Promise<{ packages: string[]; seen: SeenPaymentApp[] }>;
  setSources(options: { packages: string[] }): Promise<void>;
  getCaptures(): Promise<{ captures: CapturedPayment[] }>;
  removeCaptures(options: { ids: string[] }): Promise<void>;
  clear(): Promise<void>;
  addListener(
    eventName: 'captured',
    listener: () => void
  ): Promise<PluginListenerHandle>;
}

/**
 * The Android app's notification listener, through the plugin of the same name. Everything it holds
 * stays on the phone until the person files it as an expense.
 */
export const PaymentCapture =
  registerPlugin<PaymentCapturePlugin>('PaymentCapture');

/**
 * Apps read from the moment someone turns this on: the wallets and cards people pay with most where
 * Buqs is used. Any other app, a bank's included, is offered in settings once it has posted
 * something that looks like a payment.
 */
export const DEFAULT_PAYMENT_APPS = [
  'com.google.android.apps.walletnfcrel', // Google Wallet
  'com.revolut.revolut',
  'com.imaginecurve.curve.prd', // Curve
  'co.uk.getmondo', // Monzo
  'com.starlingbank.android',
  'com.transferwise.android', // Wise
  'de.number26.android', // N26
  'com.paypal.android.p2pmobile',
];

export const GOOGLE_WALLET = DEFAULT_PAYMENT_APPS[0];

let availability: Promise<boolean> | null = null;

/**
 * Whether this build can read notifications at all: only the Android app can, and only a version of
 * it with the listener. A shell without the plugin rejects the call, which counts as no.
 */
export const isPaymentCaptureAvailable = (): Promise<boolean> => {
  if (!isAndroidApp()) return Promise.resolve(false);

  availability ??= PaymentCapture.getStatus()
    .then(() => true)
    .catch(() => false);

  return availability;
};

/**
 * Turns collecting on. The first time, it starts from the default apps; after that the person's own
 * choice of apps is kept, so turning it off and on again changes nothing else.
 */
export const turnOnPaymentCapture = async () => {
  const { packages } = await PaymentCapture.getSources();
  if (packages.length === 0) {
    await PaymentCapture.setSources({ packages: DEFAULT_PAYMENT_APPS });
  }

  await PaymentCapture.setEnabled({ enabled: true });
};

/** For signing out: nothing collected, chosen or switched on survives it. */
export const clearPaymentCapture = async () => {
  if (await isPaymentCaptureAvailable()) await PaymentCapture.clear();
};
