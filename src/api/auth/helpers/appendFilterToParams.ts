import { reformatDate } from "@/components/SearchTransactions/helpers/reformatDate";
import { DateTime } from "luxon";

interface BaseFilters {
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
  arrayMappings?: ParamMapping[];
}

export const appendFilterToParams = (
  groupId: string,
  filters: BaseFilters,
  options: AppendFilterOptions = {}
): URLSearchParams => {
  const { pageSize, next, arrayMappings = [] } = options;
  const { freeText, before, after } = filters;
  const params = new URLSearchParams();

  params.append("groupId", groupId);
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (next) params.append("next", next);
  if (freeText) params.append("searchTerm", freeText);

  if (before && after && before === after) {
    const nextDay = DateTime.fromFormat(before, "dd-MM-yyyy")
      .plus({ days: 1 })
      .toFormat("dd-MM-yyyy");

    params.append("before", reformatDate(nextDay));
    params.append("after", reformatDate(after));
  } else {
    if (before) params.append("before", reformatDate(before));
    if (after) params.append("after", reformatDate(after));
  }

  arrayMappings.forEach(({ key, values }) => {
    values.forEach((id) => params.append(key, id));
  });

  return params;
};