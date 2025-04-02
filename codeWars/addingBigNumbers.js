"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
function add(a, b) {
    const starter = a.length >= b.length ? a : b;
    const other = (a.length < b.length ? a : b).split('').reverse();
    let carry = 0;
    return starter
        .split('')
        .reverse()
        .reduce((acc, str, i, arr) => {
        var _a, _b;
        let sum = carry + Number(str) + Number((_a = other[i]) !== null && _a !== void 0 ? _a : 0);
        console.log({ sum, i, carry }, arr.length - 1, arr.length - 1 > i);
        carry = 0;
        if (sum > 9 && arr.length - 1 > i) {
            carry = Number((_b = sum.toString()[0]) !== null && _b !== void 0 ? _b : 0);
            sum = Number(sum.toString()[1]);
        }
        console.log({ sum, carry });
        return sum + acc;
    }, '');
}
function run() {
    const fn = (a, b, sol) => {
        const res = add(a, b);
        console.log(a, b, res, sol, res === sol);
    };
    fn('1', '1', '2');
    fn('123', '456', '579');
    fn('888', '222', '1110');
    fn('1372', '69', '1441');
    fn('12', '456', '468');
    fn('101', '100', '201');
    fn('63829983432984289347293874', '90938498237058927340892374089', '91002328220491911630239667963');
}
