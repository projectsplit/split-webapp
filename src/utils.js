import { DateTime as LuxonDateTime } from 'luxon';
export const mod = (x, y) => ((x % y) + y) % y;
export const calculateCircularDistance = (xIndex, yIndex, listLength) => {
    const forwardDistance = mod(xIndex - yIndex, listLength);
    const backwardsDistance = mod(yIndex - xIndex, listLength);
    return Math.min(forwardDistance, backwardsDistance);
};
export const closestMultiple = (x, y) => {
    const remainder = mod(x, y);
    const below = x - remainder;
    const above = below + y;
    const closestMultiple = x - below < above - x ? below : above;
    return closestMultiple;
};
export function round(number, increment) {
    return Math.round(number / increment) * increment;
}
// export const isNow = (dateTime: Dayjs) => dateTime.format('YYYYMMDDHHmm') == dayjs().format('YYYYMMDDHHmm')
export const isNow = (dateTimeIso) => {
    const dt = LuxonDateTime.fromISO(dateTimeIso);
    const now = LuxonDateTime.fromISO(new Date().toISOString());
    return dt.toFormat('yyyyMMddHHmm') === now.toFormat('yyyyMMddHHmm');
};
export const toLuxon = (utcString, timezoneId) => {
    return LuxonDateTime.fromISO(utcString, { zone: 'utc' }).setZone(timezoneId);
};
export const toUtcString = (dateTime) => {
    return dateTime.setZone('utc').toISO();
};
