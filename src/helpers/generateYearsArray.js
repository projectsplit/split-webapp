export function generateYearsArray() {
    const currentYear = new Date().getFullYear();
    const startYear = 1930;
    return Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
}
