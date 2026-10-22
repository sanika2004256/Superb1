const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Find the products array
let p = code.split('category:`karak-premium`');
if (p.length > 1) {
    console.log(p[0].substring(p[0].length - 30));
    console.log('category:`karak-premium`' + p[1].substring(0, 150));
}
