import { BeautifulMentionsItemData } from "lexical-beautiful-mentions";
import { FetchedMembers } from "../../../types";


export const handleInputChange = (searchTerm: string,setFilteredResults: React.Dispatch<React.SetStateAction<{
    [key: string]: BeautifulMentionsItemData;
    value: string;
}[]>>, fetchedMembers:FetchedMembers) => {

    if (!searchTerm) {

      setFilteredResults([]);
      return;
    }

    const filtered = fetchedMembers.filter((member) =>
      member.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  };