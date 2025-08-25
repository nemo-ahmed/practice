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

function getPath(matrix: number[][]) {
  const obj: Record<number, number[]> = {};
  const isValid =
    matrix.filter((row, i) => {
      obj[i] = row.reduce((acc: number[], n, j) => {
        if (n === 0) {
          acc.push(j);
          return acc;
        }
        return acc;
      }, []);
      return row.includes(0);
    }).length < matrix.length;
  console.log(obj);

  // ? Walls are not needed to find the path.
  // ? Removing far away paths
  Object.values(obj).reduce((prev, curr, i, xxx) => {
    if (i === xxx.length - 1) return curr;

    const res = curr.filter(
      x =>
        // ? Checking Side ways
        curr.includes(x - 1) ||
        curr.includes(x + 1) ||
        // ? Checking Bottom
        (obj[i + 1]?.length &&
          (obj[i + 1].includes(x) ||
            (obj[i + 1].includes(x) && obj[i + 1].includes(x - 1)) ||
            (obj[i + 1].includes(x) && obj[i + 1].includes(x + 1)))) ||
        // ? Checking Top
        (obj[i - 1]?.length &&
          (obj[i - 1].includes(x) ||
            (obj[i - 1].includes(x) && obj[i - 1].includes(x - 1)) ||
            (obj[i - 1].includes(x) && obj[i - 1].includes(x + 1)))),
    );
    obj[i] = res;
    return res;
  }, [] as number[]);

  // ! Next step mapping the matrix with the found path
  return Object.entries(obj).map(([x, arr]) => {
    return matrix[Number(x)].map((n, i) =>
      arr.includes(i) ? REPLACING_NUMBER : n,
    );
  }, []);

  console.log(obj);
  if (!isValid) return matrix;
  return matrix;
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
