export function generateYearsArray(): number[] {
    const currentYear: number = new Date().getFullYear();
    const startYear: number = 1930;

    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    );
  }