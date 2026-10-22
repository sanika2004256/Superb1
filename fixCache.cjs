const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
code = code.replace("script.src = '/assets/index-BM-yEkkk.js';", "script.src = '/assets/index-BM-yEkkk.js?v=' + Date.now();");
fs.writeFileSync('index.html', code);
console.log('Cache buster added to index.html!');
