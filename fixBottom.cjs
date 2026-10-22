const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let target = 'className:`pt-4 border-t border-slate-200/70 flex items-center justify-between`';
let replacement = 'className:`pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0`';

if(code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log("Fixed bottom section layout");
} else {
    console.log("Target not found");
}
