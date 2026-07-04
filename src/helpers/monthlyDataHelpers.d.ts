export declare const getAllDaysInMonth: (month: number, year: number) => Date[];
export declare const getNameForCurrentMonth: (year: number, monthIndex: number, date?: number | undefined) => string;
export declare const monthMap: {
    [key: string]: string;
};
export declare function convertToFullMonthNames(arrayOfWeeks: string[][]): string[][];
