const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx = code.indexOf('Explore');
let lastIdx = code.lastIndexOf('div', idx);
console.log(code.substring(lastIdx - 100, idx + 200));
