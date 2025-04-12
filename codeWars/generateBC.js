"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
function generateBC(url, separator) {
    const arr = url
        .replace('//', '')
        .split('/')
        .filter(x => x !== '' && !x.includes('index'));
    if (arr.length === 1 || arr[1].includes('index')) {
        return '<span class="active">HOME</span>';
    }
    return arr
        .map((bc, i) => {
        const text = bc.split(/[.?#]/)[0].replace(/-/g, ' ').toUpperCase();
        return i < arr.length - 1
            ? `<a href="/${i === 0 ? '' : arr.slice(1, i + 1).join('/') + '/'}">${i === 0 ? 'home' : text}</a>`
            : `<span class="active">${text}</span>`;
    })
        .join(separator);
}
function run() {
    //   console.log(
    //     generateBC('mysite.com/pictures/holidays.html', ' : '),
    //     '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>',
    //   );
    //   console.log(
    //     generateBC('www.codewars.com/users/GiacomoSorbi', ' / '),
    //     '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>',
    //   );
    //   console.log(
    //     generateBC(
    //       'www.microsoft.com/important/confidential/docs/index.htm#top',
    //       ' * ',
    //     ),
    //     '<a href="/">HOME</a> * <a href="/important/">IMPORTANT</a> * <a href="/important/confidential/">CONFIDENTIAL</a> * <span class="active">DOCS</span>',
    //   );
    //   console.log(
    //     generateBC(
    //       'mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp',
    //       ' > ',
    //     ),
    //     '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>',
    //   );
    console.log(generateBC('https://www.codewars.com/cauterization-biotechnology-uber-or-of-with/with-insider-surfer-the-bladder-kamehameha-diplomatic/games/images', ' >>> '));
    console.log(generateBC('github.com/pictures-you-wished-you-never-saw-but-you-cannot-unsee-now/profiles/for-in-a-for-insider-transmutation-immunity/paper-skin-insider-in-meningitis-or-with?previous=normalSearch&output=full', ' >>> '));
    console.log(generateBC('mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp', ' > '));
    console.log(generateBC('www.agcpartners.co.uk/', ' * '));
    console.log(generateBC('www.microsoft.com/important/confidential/docs/index.htm#top', ' * '));
    console.log(generateBC('linkedin.it/transmutation-biotechnology-of-skin-at-biotechnology/files/surfer-transmutation-insider/with-pippi-the-bladder-of-surfer', ' ; '));
}
