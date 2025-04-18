"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
function arrayManipulation(n, queries) {
    // Write your code here
    const arr = [...Array(n).fill(0)];
    queries.forEach(([s, e, filler]) => {
        for (let i = s - 1; i < e; i++) {
            arr[i] = arr[i] + filler;
        }
    });
    return Math.max(...arr);
}
function main() {
    console.log(arrayManipulation(4, [
        [2, 3, 603],
        [1, 1, 286],
        [4, 4, 882],
    ]));
}
