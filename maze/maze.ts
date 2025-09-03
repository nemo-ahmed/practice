const REPLACING_NUMBER = 9;

function notSoBad(matrix: number[][]) {
  const obj: Record<number, number[]> = {};
  matrix.map((elements, x) => {
    return elements.reduce((acc: number[], n, i) => {
      if (
        n === 0 &&
        ((x < matrix.length && x > 0) ||
          (matrix[x + 1] && matrix[x + 1][i] === 0) ||
          (matrix[x][i + 1] && matrix[x][i + 1] === 0) ||
          (matrix[x][i - 1] && matrix[x][i - 1] === 0)) &&
        (x === 0 ||
          obj[x - 1].includes(i) ||
          (i < elements.length && obj[x - 1].includes(i + 1)) ||
          (i > 0 && obj[x - 1].includes(i - 1)) ||
          obj[x].includes(i - 1))
      ) {
        acc.push(i);
        matrix[x][i] = REPLACING_NUMBER;
      }
      obj[x] = acc;
      return acc;
    }, []);
  });

  return matrix;
}

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
  const solution = [...matrix];
  const obj: Record<number, number[]> = {};
  const isValid = gridValidation(matrix, (row, i) => {
    obj[i] = row.reduce((acc: number[], n, j) => {
      if (n === 0) {
        acc.push(j);
        return acc;
      }
      return acc;
    }, []);
  });

  if (!isValid) return matrix;

  // ? Walls are not needed to find the path.
  // ? Removing far away paths
  let curr = -1;
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
        obj[Number(i) + 1]?.includes(x) ||
        (arr.length === 0
          ? (curr !== -1 && curr === x) ||
            (i === '0' && obj[Number(i) + 1]?.includes(x)) // ? First row or same column
          : (curr !== -1 && curr === x) ||
            ((arr.includes(x - 1) || arr.includes(x + 1)) && // ? Checking Side ways
              (row.includes(x + 1) ||
                row.includes(x - 1) ||
                // ? Checking Bottom
                obj[Number(i) + 1]?.includes(x)))),
    );
    obj[i] = res;
    res.forEach(n => {
      solution[i][n] = REPLACING_NUMBER;
    });
    curr = [...res].pop() ?? -1;
  }
}

export function run(matrix: number[][], answer: number[][]) {
  const res = getPath(matrix);
  const isIgnore = JSON.stringify(res) === JSON.stringify(matrix);
  if (isIgnore) return res;
  const isResolved = JSON.stringify(res) === JSON.stringify(answer);
  // ? This check is for helping making a satisfying result
  const isTrash =
    matrix.filter(row => row.filter(x => x === 0)).length === matrix.length
      ? false
      : JSON.stringify(res) ===
        JSON.stringify(matrix).replace(/0/g, REPLACING_NUMBER.toString());
  const isMeh = JSON.stringify(notSoBad(matrix)) === JSON.stringify(answer);
  return [res, answer, {isResolved, isMeh, isTrash}];
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
      [1, 1, REPLACING_NUMBER, REPLACING_NUMBER, 1, 1],
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
        REPLACING_NUMBER,
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
