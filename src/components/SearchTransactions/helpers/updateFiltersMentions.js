export function updateFiltersMentions(fetchedLabels, mentionItems) {
    if (!fetchedLabels) {
        return;
    }
    fetchedLabels.forEach((filter) => {
        mentionItems['category:'].push({
            value: filter.value,
            id: filter.id,
            isPersonal: filter.isPersonal ?? false,
            color: filter.color,
        });
    });
}
