const fs = require('fs');
const acorn = require('acorn');

function patch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Desktop dropdown replacement
  const dStart = content.indexOf('(0,k.jsxs)(`div`,{ref:re,className:`relative shrink-0`,onMouseEnter:()=>f(!0)');
  const dEnd = content.indexOf('(0,k.jsxs)(T,{to:`/franchise`,className:ye(fe)', dStart);

  if (dStart === -1 || dEnd === -1) {
    console.log('Desktop target not found in', filePath, { dStart, dEnd });
    return;
  }

  // The replacement is a simple link for Products
  const newDesktopLink = '(0,k.jsx)(T,{to:`/products`,className:ye(de),children:(0,k.jsx)(`span`,{children:`Products`})}),';
  content = content.substring(0, dStart) + newDesktopLink + content.substring(dEnd);
  console.log('Replaced Desktop dropdown in', filePath);

  // 2. Mobile dropdown replacement
  const mStart = content.indexOf('(0,k.jsxs)(`div`,{children:[(0,k.jsxs)(`button`,{type:`button`,onClick:()=>c(!s)');
  const mEnd = content.indexOf('(0,k.jsxs)(T,{to:`/franchise`,onClick:()=>i(!1)', mStart);

  if (mStart !== -1 && mEnd !== -1) {
    const newMobileLink = '(0,k.jsx)(T,{to:`/products`,onClick:()=>i(!1),className:`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${de?`text-[#d92906] bg-red-50 font-bold`:`text-slate-800 hover:bg-slate-50`}`,children:(0,k.jsx)(`span`,{children:`Products`})}),';
    content = content.substring(0, mStart) + newMobileLink + content.substring(mEnd);
    console.log('Replaced Mobile dropdown in', filePath);
  }

  // Validate syntax
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Syntax is VALID for', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Syntax error when parsing patched code for', filePath, err);
  }
}

for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  patch(p);
}
