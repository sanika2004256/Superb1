const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx = code.indexOf('let isMr = document.cookie');
console.log(code.substring(idx - 150, idx + 400));
