const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let regex = /className:`fixed[^`]+z-50[^`]+`/g;
let match = code.match(regex);
console.log(match);
