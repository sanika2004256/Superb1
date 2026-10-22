const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Revert flex-wrap to original overflow-x-auto
let wrapTarget = 'flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:overflow-x-auto py-0.5 scroll-smooth flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';
if (code.includes(wrapTarget)) {
    code = code.replace(wrapTarget, 'flex items-center gap-1.5 overflow-x-auto py-0.5 scroll-smooth flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden');
    console.log('Reverted to overflow-x-auto');
}

// Revert h=m back to slice
let sliceTarget = 'h=m;return(0,k.jsxs)(`section`,{className:`${n?`py-12 sm:py-16`:`pt-4 sm:pt-6 pb-16`} bg-slate-50`,id:`products`,children:[(0,k.jsx)(`div`,{className:`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`,children:(0,k.jsxs)(`div`,{className:`${n?``:`bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6`}`,children:[(0,k.jsxs)(`div`,{className:`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${n?`mb-8`:``}`,';
// Wait, regex might be safer here since the string is long. Let's just find 'h=m;' and replace it with 'h=n?m.slice(0,8):m;'
let hTarget = 'h=m;return(0,k.jsxs)(`section`';
if (code.includes(hTarget)) {
    code = code.replace(hTarget, 'h=n?m.slice(0,8):m;return(0,k.jsxs)(`section`');
    console.log('Reverted h=m to slice');
}

// Revert the hidden Explore Catalog button
let btnTarget = 'false&&(0,k.jsx)(`div`,{className:`text-center mt-14`,children:(0,k.jsxs)(`a`,{href:`/products`,className:`inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-all`';
if (code.includes(btnTarget)) {
    code = code.replace(btnTarget, 'n&&(0,k.jsx)(`div`,{className:`text-center mt-14`,children:(0,k.jsxs)(`a`,{href:`/products`,className:`inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-all`');
    console.log('Reverted hidden Explore Catalog button');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
