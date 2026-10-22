const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx = code.indexOf('Sign Out');
let before = code.substring(idx - 600, idx);
console.log(before.substring(before.lastIndexOf('onClick')));
