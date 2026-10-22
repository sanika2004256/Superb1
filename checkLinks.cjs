const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let links = code.match(/to:\"\/about\"/g);
console.log('to="/about" count:', links ? links.length : 0);
let ahref = code.match(/href:\"#about\"/g);
console.log('href="#about" count:', ahref ? ahref.length : 0);
