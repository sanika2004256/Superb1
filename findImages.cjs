const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let m = code.match(/https:\/\/superbmegacorp\.com\/wp-content\/uploads\/[^`'"]+/g);
if(m) console.log(Array.from(new Set(m)).join('\n'));
