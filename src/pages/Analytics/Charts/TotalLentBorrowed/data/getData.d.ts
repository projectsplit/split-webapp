export declare const getData: (totalLentExt: number[] | undefined, totalBorrowedExt: number[] | undefined, labels: string[], pointRadius: number[], pointBackgroundColorTotalLent: string[], pointBackgroundColorTotalLentTotalBorrowed: string[]) => {
    labels: string[];
    datasets: ({
        label: string;
        data: number[] | undefined;
        borderColor: string;
        fill: string;
        tension: number;
        borderWidth: number;
        pointRadius: number[];
        pointBackgroundColor: string[];
        stepped: boolean;
        segment: {
            backgroundColor: (ctx: any) => "rgba(255, 74, 94, 0.23)" | "rgba(34, 135, 29,0.2)" | undefined;
        };
    } | {
        label: string;
        data: number[] | undefined;
        borderColor: string;
        fill: string;
        tension: number;
        borderWidth: number;
        pointRadius: number[];
        pointBackgroundColor: string[];
        stepped?: undefined;
        segment?: undefined;
    })[];
};
