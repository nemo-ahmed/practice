export function yourOrderPlease(words: string): string {
  return words
    .split(' ')
    .sort((a, b) => Number(a.match(/[1-9]/g)) - Number(b.match(/[1-9]/g)))
    .join(' ');
}

console.log(yourOrderPlease('is2 Thi1s T4est 3a'), 'Thi1s is2 3a T4est');
console.log(
  yourOrderPlease('4of Fo1r pe6ople g3ood th5e the2'),
  'Fo1r the2 g3ood 4of th5e pe6ople',
);
console.log(yourOrderPlease(''), '');
