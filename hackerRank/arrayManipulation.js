"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
function arrayManipulation(n, queries) {
    // Write your code here
    const arr = {};
    queries.forEach(([s, e, filler]) => {
        var _a;
        for (let i = s - 1; i < e; i++) {
            arr[i] = ((_a = arr[i]) !== null && _a !== void 0 ? _a : 0) + filler;
        }
    });
    console.log(arr);
    return Math.max(...Object.values(arr));
}
function main() {
    console.log(arrayManipulation(4, [
        [2, 3, 603],
        [1, 1, 286],
        [4, 4, 882],
    ]));
}
