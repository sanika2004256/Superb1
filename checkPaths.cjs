const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let matches = code.match(/path:\s*['"`](.*?)['"`]/g);
console.log(matches ? matches.slice(0, 10) : 'No paths found');
