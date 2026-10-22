const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let p = code.split('id:`superb-karak-premium-1kg`');
if (p.length > 1) {
    let before = p[0];
    console.log(before.substring(before.length - 100));
}
