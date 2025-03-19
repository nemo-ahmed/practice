"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yourOrderPlease = yourOrderPlease;
function yourOrderPlease(words) {
    return words
        .split(' ')
        .sort((a, b) => Number(a.match(/[1-9]/g)) - Number(b.match(/[1-9]/g)))
        .join(' ');
}
