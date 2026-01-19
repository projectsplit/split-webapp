export function getFirst<T>(arr: T[] | undefined): T {
  if (!arr) {
    return {} as T;
  }
  return arr[0];
}