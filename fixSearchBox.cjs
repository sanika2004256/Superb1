
const fs = require('fs');
let content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');

const target = '(0,k.jsxs)(\div\,{className:\g-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3\,children:[(0,k.jsxs)(\div\,{className:\lex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3\,children:[(0,k.jsxs)(\div\,{className:\elative flex-1\';
const replacement = '(0,k.jsxs)(\div\,{className:\g-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3\,children:[(0,k.jsxs)(\div\,{className:\lex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3\,children:[(0,k.jsxs)(\div\,{className:\elative w-full max-w-md\';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('assets/index-v29-1790684309157.js', content);
    console.log('Patched flex-1 to w-full max-w-md');
} else {
    console.log('Target not found');
}

