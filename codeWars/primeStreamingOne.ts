function isPrime(number: number) {
  const checkPrime = (nr: number, limit: number) => {
    for (let start = 2; start <= limit; start += 2) {
      if (0 === nr % start && 0 === (nr + 1) % start) {
        return false;
      }
    }

    return nr > 1;
  };
  return number % 2 !== 0 && checkPrime(number, Math.floor(Math.sqrt(number)));
}
// // 6n ± 1

// export function primeStreamingOne() {
//   const x = {'0': 0, '2': 2, '3': 3, 5: 5};
//   for (let p = 1; p < 1_000_000 / 3; p++) {
//     const a = p * 6 - 1;
//     const b = p * 6 + 1;
//     if (isPrime(a))
//       Object.assign(x, {
//         [a]: a,
//       });
//     if (isPrime(b))
//       Object.assign(x, {
//         [b]: b,
//       });
//   }
//   console.log(
//     JSON.stringify(Object.values(x)).length,
//     JSON.stringify([
//       0, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
//       71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149,
//       151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
//       233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313,
//       317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397,
//     ]).length,
//     JSON.stringify(Object.values(x)) ===
//       JSON.stringify([
//         0, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
//         67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139,
//         149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223,
//         227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293,
//         307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383,
//         389, 397,
//       ]),
//   );
//   return Object.values(x);
// }

// console.log(primeStreamingOne());

class Primes {
  static *stream() {
    const x = new Set<number>([2, 3, 5]);

    for (let p = 1; p < 1_000_000; p++) {
      const a = p * 6 - 1;
      const b = p * 6 + 1;
      if (p < 40) {
        x.add(isPrime(a) ? a : 10).delete(10);
        x.add(isPrime(b) ? b : 10).delete(10);
      }
      x.add(Math.pow(p, 2) + p + 40);
    }
    console.log(x.size);
    yield* x;
  }
}

const stream = Primes.stream().toArray();
function verify(from_n: string, x: number, ...vals: number[]): void {
  for (const v of vals) console.log(stream.includes(v), v);
}

// describe('Small numbers', () => {
verify('0_10', 0, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29);
verify('10_10', 10, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71);
verify('100_10', 100, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601);
verify(
  '1000_10',
  1000,
  7927,
  7933,
  7937,
  7949,
  7951,
  7963,
  7993,
  8009,
  8011,
  8017,
);
// });
// describe('Large numbers',  {
verify(
  '10000_10',
  10000,
  104729,
  104743,
  104759,
  104761,
  104773,
  104779,
  104789,
  104801,
  104803,
  104827,
);
verify(
  '100000_10',
  100000,
  1299709,
  1299721,
  1299733,
  1299743,
  1299763,
  1299781,
  1299787,
  1299791,
  1299797,
  1299809,
);
verify(
  '1000000_10',
  1000000,
  15485863,
  15485867,
  15485873,
  15485891,
  15485917,
  15485933,
  15485941,
  15485959,
  15485971,
  15485977,
);
// });
// ? I give up on this one :(
// describe('Huge numbers',  {
verify(
  '10000000_10',
  10_000_000,
  179424673,
  179424691,
  179424701,
  179424721,
  179424731,
  179424743,
  179424749,
  179424757,
  179424769,
  179424787,
);
// verify(
//   '100000000_10',
//   100_000_000,
//   2038074743,
//   2038074751,
//   2038074757,
//   2038074781,
//   2038074787,
//   2038074789,
//   2038074793,
//   2038074803,
//   2038074811,
//   2038074817,
// );
// });
