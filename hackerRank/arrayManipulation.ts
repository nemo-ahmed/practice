function arrayManipulation(n: number, queries: number[][]): number {
  // Write your code here
  const arr: Record<string, number> = {};
  queries.forEach(([s, e, filler]) => {
    for (let i = s - 1; i < e; i++) {
      arr[i] = (arr[i] ?? 0) + filler;
    }
  });
  return Math.max(...Object.values(arr));
}

export function main() {
  console.log(
    arrayManipulation(4, [
      [2, 3, 603],
      [1, 1, 286],
      [4, 4, 882],
    ]),
  );
}
