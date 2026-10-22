const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target1 = 'className:`text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 shrink-0`,children:e.tagline';
if (code.includes(target1)) {
    code = code.replace(target1, 'className:`hidden`,children:e.tagline');
    console.log('Badge hidden on cards');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
