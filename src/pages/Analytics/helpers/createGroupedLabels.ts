export const createGroupedLabels = (dateNumbers: number[]) => {
  const groupedLabels: string[] = [];
  dateNumbers.forEach((dn, index) => {
    if (index % 7 === 0) {
      const start = dn;
      const end = Math.min(dn + 6, dateNumbers[dateNumbers.length - 1]);
      if (start !== end) {
        groupedLabels.push(
          `${start.toString().padStart(2, "0")}-${end
            .toString()
            .padStart(2, "0")}`
        );
      }
      if (start === end) {
        groupedLabels.push(
          `${start.toString().padStart(2, "0")}`
        );
      }

    }
  });
  return groupedLabels;
};