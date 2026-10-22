const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let p = code.split('category:`plus-premix`');
console.log(p[0].substring(p[0].length - 150));
