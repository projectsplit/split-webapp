export function formatDateIntoYMD(date: Date, timeZone: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone,
    };
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    return formatter.format(date);
}