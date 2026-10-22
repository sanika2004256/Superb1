const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Find the products array
let p = code.split('id:`superb-karak-premium-1kg`');
if (p.length > 1) {
    console.log(p[0].substring(p[0].length - 30));
    console.log('id:`superb-karak-premium-1kg`' + p[1].substring(0, 150));
}
