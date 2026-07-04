import { BeautifulMentionsItemData } from 'lexical-beautiful-mentions';
import { FetchedLabel, FetchedMembers } from '../../../types';
export declare const handleInputChange: (searchTerm: string, setFilteredResults: React.Dispatch<React.SetStateAction<{
    [key: string]: BeautifulMentionsItemData;
    value: string;
}[]>>, fetchedMembers: FetchedMembers, labels: FetchedLabel[]) => void;
