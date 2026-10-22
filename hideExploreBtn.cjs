const fs = require('fs');

let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let btnTarget = 'n&&(0,k.jsx)(`div`,{className:`mt-8 sm:mt-12 text-center`,children:(0,k.jsxs)(T,{to:`/products`,onClick:()=>window.scrollTo(0,0),className:`inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-all`,children:[(0,k.jsxs)(`span`,{children:[`Explore Complete Catalog & Commercial Price List (`,Ha.length,` SKUs)`]}),(0,k.jsx)(mr,{className:`w-4 h-4 text-amber-400`})]})})';

if (code.includes(btnTarget)) {
    code = code.replace(btnTarget, 'n&&(0,k.jsx)(`div`,{className:`hidden`})');
    console.log('Hid Explore button.');
} else {
    console.log('Could not find Explore button.');
}

// And also replace `text-sm font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 shrink-0` with hidden for the who we are? Wait, the user didn't mention it, but previously I did hide it. I'll leave it as is unless they complain.

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
