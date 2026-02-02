import { BeautifulMentionsItem } from "lexical-beautiful-mentions";
import { FetchedLabel } from "../../../types";

export function updateFiltersMentions(
  fetchedLabels: FetchedLabel[] | undefined,
  mentionItems: Record<string, BeautifulMentionsItem[]>
) {

  if (!fetchedLabels) {
    return;
  }
  fetchedLabels.forEach((filter) => {
    mentionItems["category:"].push({
      value: filter.value,
      id: filter.id,
     color:filter.color
    });
  });
}
