const fs = require('fs');

const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');

const coIdx = content.indexOf('Company Overview');
console.log('coIdx:', coIdx);
if (coIdx !== -1) {
  const dStart = content.lastIndexOf('(0,k.jsxs)(`div`,{ref:', coIdx);
  const dEnd = content.indexOf('(0,k.jsx)(T,{to:`/products`', coIdx);
  console.log('dStart:', dStart, 'dEnd:', dEnd);
  console.log('Desktop snippet:\n', content.substring(dStart, dStart + 120), '\n...\n', content.substring(dEnd - 40, dEnd));
}

let mIdx = content.indexOf('Company Overview', coIdx + 1);
if (mIdx === -1) {
  // Mobile might use be.map directly
  mIdx = content.indexOf('be.map', coIdx + 500);
}
console.log('mobile be.map idx:', mIdx);
if (mIdx !== -1) {
  const mStart = content.lastIndexOf('(0,k.jsxs)(`div`,{children:[(0,k.jsxs)(`button`', mIdx);
  const mEnd = content.indexOf('(0,k.jsx)(T,{to:`/products`', mIdx);
  console.log('mStart:', mStart, 'mEnd:', mEnd);
  console.log('Mobile snippet:\n', content.substring(mStart, mStart + 120), '\n...\n', content.substring(mEnd - 40, mEnd));
}
