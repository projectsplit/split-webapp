export const groupExpensesPerWeek = (arr: number[] | undefined) => {
  if (arr === undefined) return [];
  const newArr = [];
  const num_of_groups = Math.floor(arr.length / 7);
  for (let i = 0; i < num_of_groups; i++) {
    const start = i * 7;
    const end = start + 6;

    const sum = arr
      .slice(start, end + 1)
      .reduce((acc: number, num: number) => acc + num, 0);

    newArr.push(Math.round(sum * 100) / 100);
  }
  if (arr.length % 7 !== 0) {
    const remainingStart = num_of_groups * 7;
    const remainingEnd = arr.length - 1;
    const remainingSum = arr
      .slice(remainingStart, remainingEnd + 1)
      .reduce((acc: number, num: number) => acc + num, 0);
    newArr.push(Math.round(remainingSum * 100) / 100);
  }
  return newArr;
};
