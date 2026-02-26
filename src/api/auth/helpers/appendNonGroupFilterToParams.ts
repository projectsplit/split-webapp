import { reformatDate } from "@/components/SearchTransactions/helpers/reformatDate";
import { DateTime } from "luxon";
import { AppendFilterOptions, BaseFilters } from "./appendGroupFilterToParams";

export const appendNonGroupFilterToParams = (
  filters: BaseFilters,
  options: AppendFilterOptions = {}
): URLSearchParams => {
  const { pageSize, next, previous, arrayMappings = [] } = options;
  const { freeText, before, after } = filters;
  const params = new URLSearchParams();

  if (pageSize) params.append("pageSize", pageSize.toString());
  if (next) params.append("next", next);
  if (previous) params.append("previous", previous);
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