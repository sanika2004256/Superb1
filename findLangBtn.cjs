const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx = code.indexOf('let isMr = document.cookie');
if (idx !== -1) {
    let startIdx = code.lastIndexOf(',(0,k.jsxs)(`button`', idx);
    let endIdx = code.indexOf(']})', idx) + 3;
    console.log(code.substring(startIdx, endIdx));
}
