const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
console.log('Includes login block:', code.includes('u(`/login`)'));
