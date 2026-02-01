import { BeautifulMentionsItem } from "lexical-beautiful-mentions";
import { FetchedPerson } from "../../../types";


export function updateMembersMentions(
  fetchedPeople: FetchedPerson[] |undefined,
  mentionItems: Record<string, BeautifulMentionsItem[]>
) {
  
  if (!fetchedPeople) {
    return; 
  }
 
  fetchedPeople.forEach((person) => {
    mentionItems["payer:"].push({
      value: person.value,
      memberId: person.id,
      $isUser:person.isUser
    });

    mentionItems["participant:"].push({
      value: person.value,
      memberId: person.id,
      $isUser:person.isUser
    });
    mentionItems["sender:"].push({
      value: person.value,
      memberId: person.id,
      $isUser:person.isUser
    });
    mentionItems["receiver:"].push({
      value: person.value,
      memberId: person.id,
      $isUser:person.isUser
    });
  });
}
