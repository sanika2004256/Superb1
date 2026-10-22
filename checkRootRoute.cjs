const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let match = code.match(/\{path:"\/",element:.*?\},\{path:"\/about"/);
console.log(match ? 'Found root route' : 'No root route');
