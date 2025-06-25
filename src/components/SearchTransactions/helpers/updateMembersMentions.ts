import { BeautifulMentionsItem } from "lexical-beautiful-mentions";
import { FetchedMembers } from "../../../types";


export function updateMembersMentions(
  fetchedMembers: FetchedMembers |undefined,
  mentionItems: Record<string, BeautifulMentionsItem[]>
) {
  
  if (!fetchedMembers) {
    return; 
  }
 
  fetchedMembers.forEach((member) => {
    mentionItems["payer:"].push({
      value: member.value,
      memberId: member.memberId,
      isUser:member.isUser
    });

    mentionItems["participant:"].push({
      value: member.value,
      memberId: member.memberId,
      isUser:member.isUser
    });
    mentionItems["sender:"].push({
      value: member.value,
      memberId: member.memberId,
      isUser:member.isUser
    });
    mentionItems["receiver:"].push({
      value: member.value,
      memberId: member.memberId,
      isUser:member.isUser
    });
  });
}
