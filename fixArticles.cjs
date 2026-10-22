const fs = require('fs');

let f = fs.readdirSync('public/assets').find(f => f.startsWith('index-v17'));
if (!f) throw new Error("Could not find index-v17.js");
let filePath = 'public/assets/' + f;
let code = fs.readFileSync(filePath, 'utf8');

// 1. Show all articles instead of slicing
code = code.replace(
  'i=e?EO.slice(0,3):EO',
  'i=EO'
);

// 2. Remove the "View All Articles" button
// The button is rendered via: e&&(0,k.jsx)(`div`,{className:`text-center mt-12`,children:(0,k.jsxs)(`a`,{href:`/blogs`,className:`inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm transition-all`,children:[(0,k.jsxs)(`span`,{children:[`View All `,EO.length,` Articles`]}),(0,k.jsx)(mr,{className:`w-4 h-4 text-[#d92906]`})]})})
code = code.replace(
  /e&&\(\d,k\.jsx\)\(`div`,{className:`text-center mt-12`,children:\(\d,k\.jsxs\)\(`a`,{href:`\/blogs`,className:`inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm transition-all`,children:\[\(\d,k\.jsxs\)\(`span`,{children:\[`View All `,EO\.length,` Articles`\]}\),\(\d,k\.jsx\)\([a-zA-Z0-9_]+,{className:`w-4 h-4 text-\[#d92906\]`}\)\]}\)}\)/g,
  'false'
);

fs.writeFileSync(filePath, code);
fs.writeFileSync('assets/' + f, code);
console.log('Articles view fixed!');
