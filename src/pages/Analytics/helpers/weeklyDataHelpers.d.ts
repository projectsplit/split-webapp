export declare const getMonthWeek: (year: number, week: number) => Date;
export declare const getWeekDates: (year: number, week: number) => string[];
export declare const generateAllWeeksPerYear: (year: number) => Date[][];
export declare function findIndexForCurrentDate(dateArray: Date[][], date: Date): number;
export declare const weeksToDateString: (weeks: Date[][]) => string[][];
export declare const dateStringToMonthAndDay: (weeks: string[][]) => string[][];
export declare function keepMonthAndNumberOfDay(dateArray: string[]): string[];
export declare const getWeekNumber: (d: Date) => [number, number];
export declare const numberOfweeksInYear: (year: number) => number;
