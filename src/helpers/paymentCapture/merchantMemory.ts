import { Label } from '@/types';
import { Destination, evenly } from '../expenseSplit';
import { MerchantChoice } from './reviewItems';

const STORAGE_KEY = 'paymentCaptureMerchants';

/** Enough for every place someone pays at regularly, without the list growing forever. */
const MAX_MERCHANTS = 300;

type Remembered = MerchantChoice & { at: number };

const keyOf = (merchant: string) => merchant.trim().toLowerCase();

const read = (): Record<string, Remembered> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
};

/** For signing out, which leaves nothing behind on the device, how merchants were filed included. */
export const forgetMerchants = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage that is blocked holds nothing to forget.
  }
};

/** What the person did with this merchant's payments last time, if anything. */
export const recallMerchant = (merchant: string): MerchantChoice | undefined =>
  read()[keyOf(merchant)];

/**
 * Remembers, per merchant, how the person filed the expense: what they called it, so
 * "SQ *COFFEE CORNER" they renamed "Coffee" comes back as "Coffee"; where it went and who shared
 * it, so Lidl keeps going to the flat's group between the same people; and its labels. Also that
 * they left it out, so next time it starts
 * unticked. Only unticking a row Buqs had ticked counts as leaving one out: a row that started
 * unticked, because it looked already in Buqs or was not spending, says nothing about the merchant.
 *
 * Kept on this device only. Losing it costs a few choices made again, nothing more.
 */
export const rememberMerchants = (
  choices: {
    merchant: string;
    description: string;
    destination: Destination;
    labels: Label[];
    added: boolean;
    deliberate: boolean;
  }[]
) => {
  const remembered = read();
  const now = Date.now();

  for (const choice of choices) {
    const { merchant, description, destination, labels, added, deliberate } =
      choice;
    if (!merchant) continue;

    const key = keyOf(merchant);

    if (added) {
      remembered[key] = {
        description: description === merchant ? undefined : description,
        // Who shared it, not the amounts: the next payment's amount will differ.
        destination: destination.kind === 'personal' ? undefined : evenly(destination),
        labels:
          labels.length > 0
            ? labels.map(({ text, color }) => ({ text, color }))
            : undefined,
        at: now,
      };
    } else if (deliberate) {
      remembered[key] = { ...remembered[key], skip: true, at: now };
    }
  }

  const newest = Object.entries(remembered)
    .sort(([, a], [, b]) => b.at - a.at)
    .slice(0, MAX_MERCHANTS);

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Object.fromEntries(newest))
    );
  } catch {
    // Storage full or blocked. Nothing is remembered this time, and nothing else depends on it.
  }
};
