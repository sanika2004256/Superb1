const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// 1. Remove the slice limit so all products are shown
let target1 = 'h=n?m.slice(0,8):m;';
if (code.includes(target1)) {
    code = code.replace(target1, 'h=m;');
    console.log('Removed product slice limit');
} else {
    console.log('Slice limit not found!');
}

// 2. Hide the Explore Complete Catalog button
let target2 = 'n&&(0,k.jsx)(`div`,{className:`text-center mt-14`,children:(0,k.jsxs)(`a`,{href:`/products`,className:`inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-all`';
if (code.includes(target2)) {
    code = code.replace(target2, 'false&&(0,k.jsx)(`div`,{className:`text-center mt-14`,children:(0,k.jsxs)(`a`,{href:`/products`,className:`inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-all`');
    console.log('Hid Explore Catalog button');
} else {
    console.log('Button target not found!');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
