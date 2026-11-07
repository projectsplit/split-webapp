import { useCallback, useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import {
  isPaymentCaptureAvailable,
  PaymentCapture,
  PaymentCaptureStatus,
} from '@/helpers/paymentCapture/paymentCapture';

/**
 * Where payments from notifications stand on this phone, or null where they cannot exist (the web
 * app, or a version of the Android app from before them). Read again whenever the app comes back to
 * the front, since notification access is switched in Android's settings, outside the app.
 */
export const usePaymentCaptureStatus = () => {
  const [status, setStatus] = useState<PaymentCaptureStatus | null>(null);

  const refresh = useCallback(async () => {
    if (!(await isPaymentCaptureAvailable())) return;

    setStatus(await PaymentCapture.getStatus());
  }, []);

  useEffect(() => {
    let removed = false;
    let remove: (() => void) | null = null;

    void (async () => {
      if (!(await isPaymentCaptureAvailable())) return;

      void refresh();

      const handle = await App.addListener('resume', () => void refresh());
      if (removed) void handle.remove();
      else remove = () => void handle.remove();
    })();

    return () => {
      removed = true;
      remove?.();
    };
  }, [refresh]);

  return { status, refresh };
};
