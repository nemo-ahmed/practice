'use strict';

/*
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

const alphabets = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export function caesarCipher(s: string, k: number): string {
  // Write your code here
  let kFixed = k;
  while (kFixed > alphabets.length) {
    kFixed -= alphabets.length;
  }
  return s.split('').reduce((acc, ele) => {
    let index = alphabets.indexOf(ele.toUpperCase());
    if (index === -1) return acc + ele;
    index += kFixed;
    if (index > alphabets.length - 1) index -= alphabets.length;
    return (
      acc +
      (/[A-Z]/.test(ele) ? alphabets[index] : alphabets[index].toLowerCase())
    );
  }, '');
}
