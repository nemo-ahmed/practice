"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
function sss(text, markers) {
    const nMarkers = markers.filter(x => text.includes(x));
    if (nMarkers.length === 0) {
        return text.at(-2) !== '\n' ? text.trimEnd() : text;
    }
    const res = [];
    let isDeleting = false;
    const nText = text.split('');
    for (let x = 0; x < nText.length; x++) {
        const element = nText[x];
        if (element !== ' ' &&
            element === '\n' &&
            /\W|_/.test(element) &&
            !nMarkers.includes(element) &&
            isDeleting) {
            isDeleting = false;
            if (res.at(-1) === ' ') {
                res.pop();
            }
        }
        if (nMarkers.includes(element) && !isDeleting) {
            isDeleting = true;
        }
        else if (!isDeleting) {
            res.push(element);
        }
    }
    return res.at(-1) !== '\n' ? res.join('').trimEnd() : res.join('');
}
function runTest(text, markers, expected) {
    const actual = sss(text, markers);
    const title = `text = ${JSON.stringify(text)}, markers = ${JSON.stringify(markers)}, actual = ${JSON.stringify(actual)}, expected = ${JSON.stringify(expected)}, ${actual === expected}`;
    console.log(title);
}
const tests = [
    ['aa bb cc', [], 'aa bb cc'],
    ['aa bb cc  ', [], 'aa bb cc'],
    ['  aa bb cc', [], '  aa bb cc'],
    ['  aa # bb # cc  ', [], '  aa # bb # cc'],
    ['aa bb cc', ['#'], 'aa bb cc'],
    ['aa bb # cc', ['#'], 'aa bb'],
    ['aa# bb cc', ['#'], 'aa'],
    ['aa #bb cc', ['#'], 'aa'],
    ['aa # bb # cc', ['#'], 'aa'],
    ['#aa bb cc', ['#'], ''],
    ['#aa bb\ncc dd', ['#'], '\ncc dd'],
    ['aa # bb\ncc dd', ['#'], 'aa\ncc dd'],
    ['aa bb\n#cc dd', ['#'], 'aa bb\n'],
    ['aa bb\ncc # dd', ['#'], 'aa bb\ncc'],
    ['aa bb\ncc dd#', ['#'], 'aa bb\ncc dd'],
    ['aa bb\ncc dd', ['#', '!'], 'aa bb\ncc dd'],
    ['aa # bb\ncc dd', ['#', '!'], 'aa\ncc dd'],
    ['aa bb\ncc ! dd', ['#', '!'], 'aa bb\ncc'],
    ['#aa bb\n!cc dd', ['#', '!'], '\n'],
    ['aa ! bb\ncc # dd', ['#', '!'], 'aa\ncc'],
    ['aa bb#\ncc dd!', ['#', '!'], 'aa bb\ncc dd'],
    ['aa + bb\ncc - dd\nee * ff', ['+', '-', '*'], 'aa\ncc\nee'],
    ['aa / bb\ncc ^ dd\nee $ ff', ['/', '^', '$'], 'aa\ncc\nee'],
    ['aa # bb\ncc dd', ['#', '!'], 'aa\ncc dd'],
    [
        'PlXNo\\UcMI hetkkm Du q~-f\ncsH*!mJzRUdxK%NG- q!nlHGyLB/PDP\nolRNC~',
        ['~', '-', '#', '@', '\\', '%'],
        'PlXNo\ncsH*!mJzRUdxK\nolRNC',
    ],
];
function run() {
    tests.forEach(([text, markers, expected]) => runTest(text, markers, expected));
}
