const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx = code.indexOf('Explore `');
let wrapperStart = code.lastIndexOf('className:', idx);
wrapperStart = code.lastIndexOf('className:', wrapperStart - 1);
console.log(code.substring(wrapperStart, idx + 100));
