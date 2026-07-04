import { BeautifulMentionsItem } from 'lexical-beautiful-mentions';
import { FetchedPerson } from '../../../types';
export declare function updateMembersMentions(fetchedPeople: FetchedPerson[] | undefined, mentionItems: Record<string, BeautifulMentionsItem[]>): void;
