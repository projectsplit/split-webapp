export function updateMembersMentions(fetchedPeople, mentionItems) {
    if (!fetchedPeople) {
        return;
    }
    fetchedPeople.forEach((person) => {
        mentionItems['payer:'].push({
            value: person.value,
            id: person.id,
            $isUser: person.isUser,
        });
        mentionItems['participant:'].push({
            value: person.value,
            id: person.id,
            $isUser: person.isUser,
        });
        mentionItems['sender:'].push({
            value: person.value,
            id: person.id,
            $isUser: person.isUser,
        });
        mentionItems['receiver:'].push({
            value: person.value,
            id: person.id,
            $isUser: person.isUser,
        });
    });
}
