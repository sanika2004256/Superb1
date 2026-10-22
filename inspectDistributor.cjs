const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(path.join(__dirname, 'assets/index-v29-1790684309157.js'), 'utf8');

// 1. Check Distributor Mode switch in fO
const switchIdx = code.indexOf('children:`Distributor Mode:`');
console.log('1. switchIdx:', switchIdx);
if (switchIdx !== -1) {
  const switchStart = code.lastIndexOf('(0,k.jsx)(`div`,{className:`flex items-center justify-between sm:justify-end', switchIdx);
  const switchEnd = code.indexOf(')]})})]}),(0,k.jsxs)(`div`,{className:`relative pt-2.5', switchIdx);
  console.log('switch bounds:', switchStart, switchEnd);
  console.log('switch text snippet:', code.slice(switchStart, switchEnd + 8));
}

// 2. Check Distributor Terms in fO
const termsIdx = code.indexOf('Distributor Terms & Commercial Notes');
console.log('2. termsIdx:', termsIdx);
if (termsIdx !== -1) {
  const termsStart = code.lastIndexOf('!n&&(0,k.jsx)(oO,', termsIdx);
  const termsEnd = code.indexOf('(0,k.jsx)(dO,', termsIdx);
  console.log('terms bounds:', termsStart, termsEnd);
  console.log('terms text length:', termsEnd - termsStart);
  console.log('terms text snippet:', code.slice(termsStart, termsStart + 80), '...', code.slice(termsEnd - 40, termsEnd));
}

// 3. Check pricing in dO
const dOIdx = code.indexOf('Retail Consumer MRP');
console.log('3. dOIdx (first):', dOIdx);
if (dOIdx !== -1) {
  const dOStart = code.lastIndexOf('(0,k.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`', dOIdx);
  const dOEnd = code.indexOf('(0,k.jsxs)(`div`,{className:`p-4 bg-slate-50', dOIdx);
  console.log('dO pricing bounds:', dOStart, dOEnd);
  console.log('dO text snippet:', code.slice(dOStart, dOStart + 80), '...', code.slice(dOEnd - 30, dOEnd));
}

// 4. Check pricing in zO
const zOIdx = code.lastIndexOf('Retail Consumer MRP');
console.log('4. zOIdx (second):', zOIdx);
if (zOIdx !== -1 && zOIdx !== dOIdx) {
  const zOStart = code.lastIndexOf('(0,k.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`', zOIdx);
  const zOEnd = code.indexOf('(0,k.jsxs)(`div`,{className:`p-4 bg-slate-50', zOIdx);
  console.log('zO pricing bounds:', zOStart, zOEnd);
  console.log('zO text snippet:', code.slice(zOStart, zOStart + 80), '...', code.slice(zOEnd - 30, zOEnd));
}
