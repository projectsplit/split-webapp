export const handleInputChange = (searchTerm, setFilteredResults, fetchedMembers, labels) => {
    if (!searchTerm) {
        setFilteredResults([]);
        return;
    }
    const filteredmembers = fetchedMembers.filter((member) => member.value.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredLabels = labels.filter((label) => label.value.toLowerCase().includes(searchTerm.toLowerCase()));
    const combinedResults = [...filteredmembers, ...filteredLabels];
    setFilteredResults(combinedResults);
};
