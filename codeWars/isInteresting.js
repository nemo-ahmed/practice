"use strict";
// ? Interesting numbers are 3-or-more digit numbers that meet one or more of the following criteria:
// ? - Any digit followed by all zeros: 100, 90000
// ? - Every digit is the same number: 1111
// ? - The digits are sequential, incementing†: 1234
// ? - The digits are sequential, decrementing‡: 4321
// ? - The digits are a palindrome: 1221 or 73837
// ? - The digits match one of the values in the awesomePhrases array
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFn = void 0;
exports.isInteresting = isInteresting;
// ? † For incrementing sequences, 0 should come after 9, and not before 1, as in 7890.
// ? ‡ For decrementing sequences, 0 should come after 1, and not before 9, as in 3210.
function isInteresting(number, awesomePhrases) {
    if (number <= 9) {
        return 0;
    }
    if (awesomePhrases.includes(number)) {
        return 2;
    }
    const nStr = number.toString();
    const nArr = nStr.split('');
    const nStrMin = [...nArr];
    nStrMin[nStrMin.length - 1] = '0';
    const nStrMax = [...nArr];
    nStrMax[nStrMax.length - 1] = '9';
    for (let index = 0; index < awesomePhrases.length; index++) {
        const n = awesomePhrases[index];
        if (Number(nStrMin.join('')) <= n && Number(nStrMax.join('')) >= n) {
            return 1;
        }
    }
    const sorted = [...nArr].sort((a, b) => Number(a) - Number(b));
    const isIncremental = nArr.at(-1) === '0'
        ? Number(sorted.join('')) ===
            Number(nArr.slice(0, nArr.length - 1).join(''))
        : Number(sorted.join('')) === number;
    console.log(number, awesomePhrases, nArr.slice(-2), nArr.slice(-2).join('') === '09', Number(sorted.join('')), Number(nArr.slice(0, nArr.length - 1).join('')), Number(sorted.join('')), number);
    const isDecremental = Number(sorted.reverse().join('')) === number;
    const allTheSame = nArr.filter(val => val === nArr[0]).length === nArr.length;
    const isHundreds = nArr.length > 2 &&
        Number(nArr[0]) > 0 &&
        nArr.filter(val => val === '0').length === nArr.length - 1;
    const half = nArr.length / 2;
    const isPalindrome = Number(nArr.slice(0, Math.floor(half)).reverse().join('')) ===
        Number(nArr.slice(-Math.floor(half)).join(''));
    if (isDecremental ||
        isIncremental ||
        allTheSame ||
        isHundreds ||
        isPalindrome)
        return 2;
    if (nStr.includes('09') || nStr.includes('10')) {
        return 1;
    }
    return 0;
}
const runFn = () => {
    console.log(isInteresting(3, [1337, 256]), 0);
    console.log(isInteresting(1336, [1337, 256]), 1);
    console.log(isInteresting(1337, [1337, 256]), 2);
    console.log(isInteresting(11208, [1337, 256]), 0);
    console.log(isInteresting(11209, [1337, 256]), 1);
    console.log(isInteresting(11211, [1337, 256]), 2);
    console.log(isInteresting(3, [1337, 256]), 0);
    console.log(isInteresting(3236, [1337, 256]), 0);
    // progress as we near an "interesting" number
    console.log(isInteresting(11207, []), 0);
    console.log(isInteresting(11208, []), 0);
    console.log(isInteresting(11209, []), 1);
    console.log(isInteresting(11210, []), 1);
    console.log(isInteresting(11211, []), 2);
    // nearing a provided "awesome phrase"
    console.log(isInteresting(1335, [1337, 256]), 1);
    console.log(isInteresting(1336, [1337, 256]), 1);
    console.log(isInteresting(1337, [1337, 256]), 2);
    console.log(isInteresting(99919911, []), 0);
    console.log(isInteresting(101, []), 2);
    console.log(isInteresting(67890, []), 2);
    console.log(isInteresting(98, []), 1);
    console.log(isInteresting(3208, []), 1);
    console.log(isInteresting(119, []), 1);
    console.log(isInteresting(122, []), 1);
    console.log(isInteresting(442, []), 1);
    console.log(isInteresting(30, []), 0);
};
exports.runFn = runFn;
