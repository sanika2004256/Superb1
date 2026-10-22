const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Revert removing "All" from Ba
// Look for Ba=[{id:`karak-premium`
let baTarget = 'Ba=[{id:`karak-premium`';
if (code.includes(baTarget)) {
    code = code.replace(baTarget, 'Ba=[{id:`all`,name:`All Products (93)`,count:93},{id:`karak-premium`');
    console.log('Restored All in Ba');
}

// Revert NO default from 'karak-premium' to 'all'
let noTarget = 'n=t.get(`cat`)||`karak-premium`';
if (code.includes(noTarget)) {
    code = code.replace(noTarget, 'n=t.get(`cat`)||`all`');
    console.log('Restored NO default to all');
}

// Revert fO default from 'karak-premium' to 'all'
let foTarget = 'function fO({initialCategory:e=`karak-premium`';
if (code.includes(foTarget)) {
    code = code.replace(foTarget, 'function fO({initialCategory:e=`all`');
    console.log('Restored fO default to all');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
