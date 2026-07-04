export function formatDateIntoYMD(date, timeZone) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone,
    };
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    return formatter.format(date);
}
