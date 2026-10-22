const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx = code.indexOf('Explore');
let match = code.match(/className:[^>]*>Explore/g);
console.log(match);
