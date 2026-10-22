const fs = require('fs');

let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// 1. Change initialCategory to 'all'
code = code.replace('{initialCategory:e=`karak-premium`', '{initialCategory:e=`all`');

// 2. Add 'all' tab back to Ba
let baIndex = code.indexOf('Ba=[{id:`karak-premium`');
if (baIndex !== -1) {
    code = code.replace('Ba=[{id:`karak-premium`', 'Ba=[{id:`all`,name:`All Products`,count:93},{id:`karak-premium`');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
console.log('Fixed 0 products bug and restored All tab.');
