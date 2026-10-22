const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('vizuki-agro');
let componentStart = code.lastIndexOf('function', idx);
if (componentStart === -1) componentStart = code.lastIndexOf('const ', idx);
console.log(code.substring(componentStart, idx + 1000));
