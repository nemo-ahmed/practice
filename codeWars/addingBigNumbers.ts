function add(a: string, b: string) {
  const starter = a.length >= b.length ? a : b;
  const other = (a.length < b.length ? a : b).split('').reverse();
  let carry = 0;
  return starter
    .split('')
    .reverse()
    .reduce((acc, str, i, arr) => {
      let sum = carry + Number(str) + Number(other[i] ?? 0);
      carry = 0;
      if (sum > 9 && arr.length - 1 > i) {
        carry = Number(sum.toString()[0] ?? 0);
        sum = Number(sum.toString()[1]);
      }
      return sum + acc;
    }, '');
}

export function run() {
  const fn = (a: string, b: string, sol: string) => {
    const res = add(a, b);
    console.log(a, b, res, sol, res === sol);
  };
  fn('1', '1', '2');
  fn('123', '456', '579');
  fn('888', '222', '1110');
  fn('1372', '69', '1441');
  fn('12', '456', '468');
  fn('101', '100', '201');
  fn(
    '63829983432984289347293874',
    '90938498237058927340892374089',
    '91002328220491911630239667963',
  );
}
