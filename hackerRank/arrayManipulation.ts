function arrayManipulation(n: number, queries: number[][]): number {
  // Write your code here
  const arr: number[] = new Array(n + 1).fill(0);
  let max = Number.MIN_VALUE;
  for (let index = 0; index < queries.length; index++) {
    const [s, e, filler] = queries[index];
    arr[s] += filler;
    if (e + 1 in arr) arr[e + 1] -= filler;
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (sum > max) {
      max = sum;
    }
  }
  return max;
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
