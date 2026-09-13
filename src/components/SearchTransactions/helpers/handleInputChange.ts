import { BeautifulMentionsItemData } from 'lexical-beautiful-mentions';
import { EnhancedPeopleWithProps, FetchedLabel } from '../../../types';

export const handleInputChange = (
  searchTerm: string,
  setFilteredResults: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: BeautifulMentionsItemData;
        value: string;
      }[]
    >
  >,
  fetchedMembers: EnhancedPeopleWithProps,
  labels: FetchedLabel[]
) => {
  if (!searchTerm) {
    setFilteredResults([]);
    return;
  }

  const filteredmembers = fetchedMembers.filter((member) =>
    member.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLabels = labels.filter((label) =>
    label.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const combinedResults = [...filteredmembers, ...filteredLabels];
  setFilteredResults(combinedResults);
};
