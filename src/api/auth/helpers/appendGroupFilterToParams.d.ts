export declare const appendGroupFilterToParams: (groupId: string, filters: BaseFilters, options?: AppendFilterOptions) => URLSearchParams;
export interface BaseFilters {
    freeText?: string;
    before?: string | null;
    after?: string | null;
}
export interface ParamMapping {
    key: string;
    values: string[];
}
export interface AppendFilterOptions {
    pageSize?: number;
    next?: string;
    previous?: string;
    arrayMappings?: ParamMapping[];
}
