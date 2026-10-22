const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('value:r.name');
console.log(code.substring(idx - 100, idx + 800));
