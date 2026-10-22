const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// The card div is: (0,k.jsxs)(`div`,{className:`group bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-red-200 transition-all duration-300 hover:shadow-xl card-lift flex flex-col justify-between relative overflow-hidden h-full`,children:[(0,k.jsx)(`div`,{className:`absolute top-0
let target = '(0,k.jsxs)(`div`,{className:`group bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-red-200 transition-all duration-300 hover:shadow-xl card-lift flex flex-col justify-between relative overflow-hidden h-full`';
let replacement = '(0,k.jsxs)(T,{to:e.targetRoute,className:`block group bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-red-200 transition-all duration-300 hover:shadow-xl card-lift flex flex-col justify-between relative overflow-hidden h-full text-left`';

if (code.includes(target)) {
    code = code.replace(target, replacement);
    console.log('Replaced div with T (Link)');
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
} else {
    console.log('Target not found!');
}
