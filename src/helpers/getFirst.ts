export function getFirst<T>(arr: T[] | undefined): T {
  if (!arr) {
    throw new Error("Array is undefined");
  }
  return arr[0];
}