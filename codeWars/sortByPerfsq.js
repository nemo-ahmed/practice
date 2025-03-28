"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByPerfsq = sortByPerfsq;
function sortByPerfsq(arr) {
    const obj = arr
        .sort((a, b) => a - b)
        .reduce((acc, item) => {
        acc[item] = 0;
        const intStr = item.toString();
        const len = intStr.length;
        const list = [];
        for (let n = 0; n <= len; n++) {
            const intArr = intStr.split('');
            const b = intArr[0];
            intArr[0] = intArr[n];
            intArr[n] = b;
            for (let x = 1; x <= len; x++) {
                if (n === item.toString().indexOf(intArr[n])) {
                    x++;
                }
                const arr = intArr;
                const a = arr[x];
                arr[x] = arr[n];
                arr[n] = a;
                const newN = Number(intArr.join(''));
                if (!list.includes(newN)) {
                    console.log(newN, Math.sqrt(newN) % 1);
                    list.push(newN);
                    if (Math.sqrt(newN) % 1 === 0) {
                        acc[item]++;
                    }
                }
            }
        }
        console.log(list.sort((a, b) => a - b));
        return acc;
    }, {});
    console.log(obj);
    return arr.sort((a, b) => obj[b] - obj[a]);
}
// console.log(sortByPerfsq([715, 112, 136, 169, 144]), [169, 144, 112, 136, 715]);
// console.log(
//   sortByPerfsq([234, 61, 16, 441, 144, 728]),
//   [144, 441, 16, 61, 234, 728],
// );
// console.log(
//   sortByPerfsq([4468, 446689, 169, 4477, 1345689]),
//   [1345689, 169, 4468, 4477, 446689],
// );
