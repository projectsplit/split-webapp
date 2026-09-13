import { useEffect } from 'react';
import { DateTime as LuxonDateTime } from 'luxon';
import { toLuxon, toUtcString } from '../helpers/dateTimeAndRounding';

const MINUTE_MS = 60_000;

export const useRealtimeClock = (
  enabled: boolean,
  timeZoneId: string,
  setSelectedDateTime: (updater: (prev: string) => string) => void
) => {
  useEffect(() => {
    if (!enabled) return;

    let timeout: ReturnType<typeof setTimeout>;

    const syncToNow = () => {
      setSelectedDateTime((prev) => {
        const now = LuxonDateTime.utc().setZone(timeZoneId);
        const updatedDateTime = toLuxon(prev, timeZoneId).set({
          hour: now.hour,
          minute: now.minute,
          second: now.second,
        });
        return toUtcString(updatedDateTime);
      });
    };

    const scheduleNextTick = () => {
      timeout = setTimeout(() => {
        syncToNow();
        scheduleNextTick();
      }, MINUTE_MS - (Date.now() % MINUTE_MS));
    };

    syncToNow();
    scheduleNextTick();

    return () => clearTimeout(timeout);
  }, [enabled, timeZoneId]);
};
