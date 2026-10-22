const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const filesToPatch = [
  path.join(__dirname, 'assets/index-v29-1790684309157.js'),
  path.join(__dirname, 'public/assets/index-v29-1790684309157.js')
];

filesToPatch.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }

  let code = fs.readFileSync(filePath, 'utf8');

  // Step 1: Replace search row with full-width search bar (removing Distributor Mode switch)
  const switchIdx = code.indexOf('children:`Distributor Mode:`');
  if (switchIdx !== -1) {
    const rowStart = code.lastIndexOf('(0,k.jsxs)(`div`,{className:`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3`', switchIdx);
    const rowEnd = code.indexOf('(0,k.jsxs)(`div`,{className:`relative pt-2.5', switchIdx);
    if (rowStart !== -1 && rowEnd !== -1) {
      const newSearchRow = `(0,k.jsxs)(\`div\`,{className:\`relative w-full\`,children:[(0,k.jsx)(Qi,{className:\`w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none\`}),(0,k.jsx)(\`input\`,{type:\`text\`,placeholder:\`Search products by name, flavour, or SKU (e.g. Cardamom, SK0001)...\`,value:o,onChange:e=>s(e.target.value),className:\`w-full pl-10 pr-9 py-2.5 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d92906]/20 focus:border-[#d92906] transition-all\`}),o&&(0,k.jsx)(\`button\`,{onClick:()=>s(\`\`),className:\`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-colors\`,title:\`Clear search\`,children:\`✕\`})]})`;
      code = code.substring(0, rowStart) + newSearchRow + ',' + code.substring(rowEnd);
      console.log('1. Removed Distributor Mode switch in', filePath);
    }
  }

  // Step 2: Remove Distributor Terms & Commercial Notes
  const termsIdx = code.indexOf('Distributor Terms & Commercial Notes');
  if (termsIdx !== -1) {
    const tStart = code.lastIndexOf(',!n&&(0,k.jsx)(oO,', termsIdx);
    const dOStart = code.indexOf('(0,k.jsx)(dO,', termsIdx);
    if (tStart !== -1 && dOStart !== -1) {
      const oOEnd = dOStart - 4; // removes up to closing of div.max-w-7xl
      code = code.substring(0, tStart) + code.substring(oOEnd);
      console.log('2. Removed Distributor Terms in', filePath);
    }
  }

  // Step 3: dO pricing (Product Quick View Modal)
  const dOIdx = code.indexOf('Retail Consumer MRP');
  if (dOIdx !== -1) {
    const dOStart = code.lastIndexOf('(0,k.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`', dOIdx);
    const dOEnd = code.indexOf('(0,k.jsxs)(`div`,{className:`p-4 bg-slate-50', dOIdx);
    if (dOStart !== -1 && dOEnd !== -1) {
      const dOPriceNew = `(0,k.jsxs)(\`div\`,{className:\`p-4 rounded-2xl border border-red-200/80 bg-red-50/30 flex items-center justify-between\`,children:[(0,k.jsxs)(\`div\`,{children:[(0,k.jsx)(\`span\`,{className:\`text-xs font-bold uppercase tracking-wider text-slate-600 block\`,children:\`Retail Consumer MRP\`}),(0,k.jsx)(\`p\`,{className:\`text-[11px] text-slate-500 mt-0.5\`,children:\`Maximum Retail Price (Inclusive of all taxes)\`})]}),(0,k.jsxs)(\`div\`,{className:\`text-3xl font-extrabold text-[#d92906]\`,children:[\`₹\`,m(e.mrp)]})]})`;
      code = code.substring(0, dOStart) + dOPriceNew + ',' + code.substring(dOEnd);
      console.log('3. Set dO pricing to retail only in', filePath);
    }
  }
  code = code.replace('m((s===`distributor`?e.distributorRate:e.mrp)*a)', 'm(e.mrp*a)');

  // Step 4: zO pricing (Product Page)
  const zOIdx = code.indexOf('Maximum Retail Price (MRP)');
  if (zOIdx !== -1) {
    const zOStart = code.lastIndexOf('(0,k.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`', zOIdx);
    const zOEnd = code.indexOf('(0,k.jsxs)(`div`,{className:`p-4 bg-slate-50', zOIdx);
    if (zOStart !== -1 && zOEnd !== -1) {
      const zOPriceNew = `(0,k.jsxs)(\`div\`,{className:\`p-4 rounded-2xl border border-red-200/80 bg-red-50/30 flex items-center justify-between\`,children:[(0,k.jsxs)(\`div\`,{children:[(0,k.jsx)(\`span\`,{className:\`text-xs font-bold uppercase tracking-wider text-slate-600 block\`,children:\`Retail Price (MRP)\`}),(0,k.jsx)(\`span\`,{className:\`text-[11px] text-slate-500 mt-0.5 block\`,children:\`Maximum Retail Price (Inclusive of all taxes)\`})]}),(0,k.jsxs)(\`div\`,{className:\`text-3xl font-extrabold text-[#d92906]\`,children:[\`₹\`,g(o.mrp)]})]})`;
      code = code.substring(0, zOStart) + zOPriceNew + ',' + code.substring(zOEnd);
      console.log('4. Set zO pricing to retail only in', filePath);
    }
  }
  code = code.replace('v=d===`distributor`&&o.distributorRate||o.mrp', 'v=o.mrp');
  code = code.replace('showDistributorPrice:u', 'showDistributorPrice:!1');

  // Validate syntax
  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Acorn: Syntax is 100% VALID for', filePath);
    fs.writeFileSync(filePath, code, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Acorn syntax error for', filePath, err.message);
    process.exit(1);
  }
});
