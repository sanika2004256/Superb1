const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let links = code.match(/to:\"\/[^\"]*\"/g);
console.log(links ? links.slice(0, 20) : 'none');
