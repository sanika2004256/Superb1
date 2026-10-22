const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const regex = /\}\}\),\(\d,k\.jsx\)\(`span`,\{className:`absolute top-3 left-3[^\]]*e\.badge\|\|e\.categoryName\}\)/g;
const matches = code.match(regex);
console.log(matches);
