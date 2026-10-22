const fs = require('fs');
const code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const idx = code.indexOf('function uO');
const uOCode = code.substring(idx, idx + 2000);
console.log(uOCode);
