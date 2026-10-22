const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target1 = ',(0,k.jsxs)(div,{className:p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs,children:[';
const target2 = 'children:Demo Admin})]})]})';

let idx1 = code.indexOf(target1);
let idx2 = code.indexOf(target2, idx1);

if (idx1 !== -1 && idx2 !== -1) {
    let toRemove = code.substring(idx1, idx2 + target2.length);
    code = code.replace(toRemove, '');
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Successfully removed the entire demo block.');
} else {
    console.log('Could not find boundaries.', idx1, idx2);
}
