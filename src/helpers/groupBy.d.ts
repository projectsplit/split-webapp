export declare const groupBy: <T, K extends keyof any>(arr: T[], key: (i: T) => K) => Record<K, T[]>;
