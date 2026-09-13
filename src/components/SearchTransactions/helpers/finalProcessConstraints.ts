import { DateConstraint } from '../../../types';
import { deduplicateFromEndofArr } from './deduplicateFromEndofArr';
import { duringDay, getDateIntersection } from './getDateIntersection';
import { parseDate } from './parseDate';

export const finalProcessConstraints = (array: DateConstraint[]) => {
  const dedupedArray = deduplicateFromEndofArr(array);
  if (dedupedArray.length === 1) {
    if (dedupedArray[0].trigger === 'during:') {
      return [
        { trigger: 'before:', value: dedupedArray[0].value },
        { trigger: 'after:', value: dedupedArray[0].value },
      ];
    }
    return dedupedArray;
  }
  if (dedupedArray.length === 2) {
    return getDateIntersection(dedupedArray[0], dedupedArray[1]);
  }
  if (dedupedArray.length === 3) {
    const during = dedupedArray.find((c) => c.trigger === 'during:')!;
    const [first, second] = dedupedArray.filter(
      (c) => c.trigger !== 'during:'
    );
    const range = getDateIntersection(first, second);

    if (range.length === 1) {
      return getDateIntersection(range[0], during);
    }

    const day = parseDate(during.value);
    const after = parseDate(range.find((c) => c.trigger === 'after:')!.value);
    const before = parseDate(
      range.find((c) => c.trigger === 'before:')!.value
    );
    return day >= after && day < before ? duringDay(during.value) : range;
  }
};
