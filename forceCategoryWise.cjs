const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// 1. Remove "All" from Ba
let baTarget = '{id:`all`,name:`All Products (93)`,count:93},';
if (code.includes(baTarget)) {
    code = code.replace(baTarget, '');
    console.log('Removed All from Ba');
}

// 2. Change default cat in NO from 'all' to 'karak-premium'
let noTarget = 'n=t.get(`cat`)||`all`';
if (code.includes(noTarget)) {
    code = code.replace(noTarget, 'n=t.get(`cat`)||`karak-premium`');
    console.log('Changed NO default to karak-premium');
}

// 3. Change default in fO from 'all' to 'karak-premium'
let foTarget = 'function fO({initialCategory:e=`all`';
if (code.includes(foTarget)) {
    code = code.replace(foTarget, 'function fO({initialCategory:e=`karak-premium`');
    console.log('Changed fO default to karak-premium');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
