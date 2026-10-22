const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let p = code.split('category:`karak-premium`');
if (p.length > 1) {
    let before = p[0];
    console.log(before.substring(before.length - 100));
}
