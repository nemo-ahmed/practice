const REPLACING_NUMBER = 9;

export const gridValidation = (
  matrix: number[][],
  fn?: (row: number[], i: number) => void,
) =>
  matrix.reduce((validation: boolean[], row, i) => {
    fn?.(row, i);

    const isRowValid = row.includes(0) && row.includes(1);
    if (!isRowValid) return validation;
    return [...validation, isRowValid];
  }, []).length === matrix.length;

function getPath(matrix: number[][]) {
  const solution = JSON.parse(JSON.stringify(matrix));
  const obj: Record<number, number[]> = {};

  const isValid = gridValidation(matrix, (row, i) => {
    // ? Walls are not needed to find the path.
    obj[i] = row.reduce((acc: number[], n, j) => {
      if (n === 0) {
        acc.push(j);
        return acc;
      }
      return acc;
    }, []);
  });

  if (!isValid) return matrix;

  let curr = -1;

  // ? finding the shortest paths
  for (const i in obj) {
    const row = obj[i];
    if (row.length === 1) {
      curr = row[0];
      solution[i][row[0]] = REPLACING_NUMBER;
      continue;
    } else if (Number(i) === matrix.length - 1) {
      obj[i] = [curr];
      solution[i][curr] = REPLACING_NUMBER;
      break;
    }

    const res = row.filter(
      (x, _, arr) =>
        // ? Straight
        obj[Number(i) + 1]?.includes(x) ||
        // ? Check if its surrounded with 3 walls
        ((!row.includes(x - 1) || !row.includes(x + 1)) &&
        !obj[Number(i) + 1].includes(x) &&
        obj[Number(i) - 1] &&
        !obj[Number(i) - 1]?.includes(x)
          ? false
          : (curr !== -1 && curr === x) ||
            ((arr.includes(x - 1) || arr.includes(x + 1)) && // ? Checking Side ways
              (row.includes(x + 1) || row.includes(x - 1)))),
    );
    obj[i] = res;
    res.forEach(n => {
      solution[i][n] = REPLACING_NUMBER;
    });
    curr = [...res].pop() ?? -1;
  }
  return solution;
}

export function run(matrix: number[][], answer: number[][]) {
  const res = getPath(matrix);
  const isIgnore = JSON.stringify(res) === JSON.stringify(matrix);
  if (isIgnore) return res;
  const isResolved = JSON.stringify(res) === JSON.stringify(answer);

  return [res, answer, {isResolved}];
}

console.log(
  run(
    [
      [1, 0, 1, 1, 0, 1],
      [1, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 1],
    ],
    [
      [1, REPLACING_NUMBER, 1, 1, 0, 1],
      [1, REPLACING_NUMBER, REPLACING_NUMBER, 1, 1, 0],
      [1, 1, REPLACING_NUMBER, 0, 1, 1],
      [1, 1, REPLACING_NUMBER, 1, 1, 1],
    ],
  ),
);
console.log(
  run(
    [
      [0, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
    ],
    [
      [REPLACING_NUMBER, 1, 1, 1],
      [REPLACING_NUMBER, REPLACING_NUMBER, 1, 1],
      [1, REPLACING_NUMBER, 1, 1],
      [1, REPLACING_NUMBER, 1, 1],
    ],
  ),
);
console.log(
  run(
    [
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1],
    ],
    [
      [REPLACING_NUMBER, 1, 1, 1, 1, 1, 1, 1],
      [
        REPLACING_NUMBER,
        REPLACING_NUMBER,
        REPLACING_NUMBER,
        REPLACING_NUMBER,
        1,
        1,
        1,
        1,
      ],
      [1, 1, 1, REPLACING_NUMBER, 1, 1, 1, 1],
      [1, 1, 1, REPLACING_NUMBER, 1, 1, 1, 1],
    ],
  ),
);

console.log(
  run(
    [
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1],
    ],
    [
      [1, 1, 1, REPLACING_NUMBER, 1, 1, 1, 1],
      [1, 1, REPLACING_NUMBER, REPLACING_NUMBER, 1, 1, 1, 1],
      [1, REPLACING_NUMBER, REPLACING_NUMBER, 1, 1, 1, 1, 1],
      [1, REPLACING_NUMBER, 1, 1, 1, 1, 1, 1],
    ],
  ),
);

console.log(
  run(
    [
      [1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
    ],
    [
      [1, 1, REPLACING_NUMBER, 1, 1, 1, 1, 1],
      [
        1,
        1,
        REPLACING_NUMBER,
        1,
        1,
        REPLACING_NUMBER,
        REPLACING_NUMBER,
        REPLACING_NUMBER,
      ],
      [
        1,
        0,
        REPLACING_NUMBER,
        REPLACING_NUMBER,
        REPLACING_NUMBER,
        REPLACING_NUMBER,
        1,
        REPLACING_NUMBER,
      ],
      [1, 1, 1, 1, 1, 1, 1, REPLACING_NUMBER],
    ],
  ),
);
