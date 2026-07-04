import { DateTime as LuxonDateTime } from 'luxon';
export declare const mod: (x: number, y: number) => number;
export declare const calculateCircularDistance: (xIndex: number, yIndex: number, listLength: number) => number;
export declare const closestMultiple: (x: number, y: number) => number;
export declare function round(number: number, increment: number): number;
export declare const isNow: (dateTimeIso: string) => boolean;
export declare const toLuxon: (utcString: string, timezoneId: string) => LuxonDateTime;
export declare const toUtcString: (dateTime: LuxonDateTime) => string;
