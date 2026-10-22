const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('Superb-main/assets/index-v29-1790684309157.js', 'utf8');

// Step 1: Replace search row with full-width search bar
const switchIdx = code.indexOf('children:`Distributor Mode:`');
const rowStart = code.lastIndexOf('(0,k.jsxs)(`div`,{className:`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3`', switchIdx);
const rowEnd = code.indexOf('(0,k.jsxs)(`div`,{className:`relative pt-2.5', switchIdx);

const newSearchRow = `(0,k.jsxs)(\`div\`,{className:\`relative w-full\`,children:[(0,k.jsx)(Qi,{className:\`w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none\`}),(0,k.jsx)(\`input\`,{type:\`text\`,placeholder:\`Search products by name, flavour, or SKU (e.g. Cardamom, SK0001)...\`,value:o,onChange:e=>s(e.target.value),className:\`w-full pl-10 pr-9 py-2.5 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d92906]/20 focus:border-[#d92906] transition-all\`}),o&&(0,k.jsx)(\`button\`,{onClick:()=>s(\`\`),className:\`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-colors\`,title:\`Clear search\`,children:\`✕\`})]})`;

code = code.substring(0, rowStart) + newSearchRow + ',' + code.substring(rowEnd);

try {
  acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Step 1 valid!');
} catch (e) {
  console.log('Step 1 error:', e.message);
  process.exit(1);
}

// Step 2: Remove terms by replacing with null
const termsIdx = code.indexOf('Distributor Terms & Commercial Notes');
const tStart = code.lastIndexOf(',!n&&(0,k.jsx)(oO,', termsIdx);
const dOStart = code.indexOf('(0,k.jsx)(dO,', termsIdx);
// Let's find where the oO component closes before dO
// Look at code between termsIdx and dOStart
console.log('Snippet between termsIdx and dOStart:');
console.log(JSON.stringify(code.slice(dOStart - 20, dOStart)));
// It has: "Va.authorityTitle]})]})]})})]}),(0,k.jsx)(dO,"
// So before "(0,k.jsx)(dO,", the string is ")]}),"
// ")]})" closes: children of div.max-w-7xl + div.max-w-7xl
// So the !n&&(0,k.jsx)(oO,...) ends right before ")]}),"
const oOEnd = dOStart - 4; // before ")]}),"
console.log('oOEnd snippet:', code.slice(oOEnd - 20, oOEnd + 10));

code = code.substring(0, tStart) + code.substring(oOEnd);

try {
  acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Step 2 valid!');
} catch (e) {
  console.log('Step 2 error:', e.message, 'at pos:', e.pos);
  console.log('Around error:', code.slice(e.pos - 50, e.pos + 50));
  process.exit(1);
}

// Step 3: dO pricing
const dOIdx = code.indexOf('Retail Consumer MRP');
if (dOIdx !== -1) {
  const dOStart = code.lastIndexOf('(0,k.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`', dOIdx);
  const dOEnd = code.indexOf('(0,k.jsxs)(`div`,{className:`p-4 bg-slate-50', dOIdx);
  const dOPriceNew = `(0,k.jsxs)(\`div\`,{className:\`p-4 rounded-2xl border border-red-200/80 bg-red-50/30 flex items-center justify-between\`,children:[(0,k.jsxs)(\`div\`,{children:[(0,k.jsx)(\`span\`,{className:\`text-xs font-bold uppercase tracking-wider text-slate-600 block\`,children:\`Retail Consumer MRP\`}),(0,k.jsx)(\`p\`,{className:\`text-[11px] text-slate-500 mt-0.5\`,children:\`Maximum Retail Price (Inclusive of all taxes)\`})]}),(0,k.jsxs)(\`div\`,{className:\`text-3xl font-extrabold text-[#d92906]\`,children:[\`₹\`,m(e.mrp)]})]})`;
  code = code.substring(0, dOStart) + dOPriceNew + ',' + code.substring(dOEnd);
}

code = code.replace('m((s===`distributor`?e.distributorRate:e.mrp)*a)', 'm(e.mrp*a)');

try {
  acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Step 3 valid!');
} catch (e) {
  console.log('Step 3 error:', e.message, 'at pos:', e.pos);
  process.exit(1);
}

// Step 4: zO pricing
const zOIdx = code.indexOf('Maximum Retail Price (MRP)');
if (zOIdx !== -1) {
  const zOStart = code.lastIndexOf('(0,k.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`', zOIdx);
  const zOEnd = code.indexOf('(0,k.jsxs)(`div`,{className:`p-4 bg-slate-50', zOIdx);
  const zOPriceNew = `(0,k.jsxs)(\`div\`,{className:\`p-4 rounded-2xl border border-red-200/80 bg-red-50/30 flex items-center justify-between\`,children:[(0,k.jsxs)(\`div\`,{children:[(0,k.jsx)(\`span\`,{className:\`text-xs font-bold uppercase tracking-wider text-slate-600 block\`,children:\`Retail Price (MRP)\`}),(0,k.jsx)(\`span\`,{className:\`text-[11px] text-slate-500 mt-0.5 block\`,children:\`Maximum Retail Price (Inclusive of all taxes)\`})]}),(0,k.jsxs)(\`div\`,{className:\`text-3xl font-extrabold text-[#d92906]\`,children:[\`₹\`,g(o.mrp)]})]})`;
  code = code.substring(0, zOStart) + zOPriceNew + ',' + code.substring(zOEnd);
}

code = code.replace('v=d===`distributor`&&o.distributorRate||o.mrp', 'v=o.mrp');
code = code.replace('showDistributorPrice:u', 'showDistributorPrice:!1');

try {
  acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Step 4 valid!');
  console.log('ALL STEPS 100% VALID!');
} catch (e) {
  console.log('Step 4 error:', e.message, 'at pos:', e.pos);
  process.exit(1);
}
