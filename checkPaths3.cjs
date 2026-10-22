const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let paths = code.match(/path:\s*['"`](.*?)['"`]/g);
console.log(paths);
