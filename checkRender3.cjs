const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('function lO');
console.log(code.substring(idx + 2000, idx + 3000));
