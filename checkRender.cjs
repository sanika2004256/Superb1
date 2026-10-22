const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('function lO');
console.log(code.substring(idx, idx + 1000));
