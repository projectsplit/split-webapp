import { BeautifulMentionsItemData } from "lexical-beautiful-mentions";
import { FetchedLabel, FetchedMembers } from "../../../types";

export const handleInputChange = (//TODO keep this in mind in case we need to differentiate between transfer and expense search terms
  searchTerm: string,
  setFilteredResults: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: BeautifulMentionsItemData;
        value: string;
      }[]
    >
  >,
  fetchedMembers: FetchedMembers,
  labels: FetchedLabel[]
) => {
  if (!searchTerm) {
    setFilteredResults([]);
    return;
  }

  const filteredmembers = fetchedMembers.filter((member) =>
    member.value.toLowerCase().includes(searchTerm.toLowerCase())
  );
   const filteredLabels = labels
    .filter((label) =>
      label.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  const combinedResults = [...filteredmembers, ...filteredLabels];
  setFilteredResults(combinedResults);
};
