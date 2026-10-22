const fs = require('fs');
const acorn = require('acorn');

const files = [
  'public/assets/index-v29-1790684309157.js',
  'assets/index-v29-1790684309157.js'
];

files.forEach(f => {
  let code = fs.readFileSync(f, 'utf8');

  // 1. Hide category scroll arrows
  const leftBtnTarget = 'onClick:()=>p(`left`),className:`hidden sm:flex w-6 h-6';
  const leftBtnRepl = 'onClick:()=>p(`left`),className:`hidden w-6 h-6';
  const rightBtnTarget = 'onClick:()=>p(`right`),className:`hidden sm:flex w-6 h-6';
  const rightBtnRepl = 'onClick:()=>p(`right`),className:`hidden w-6 h-6';

  if (code.includes(leftBtnTarget)) {
    code = code.replace(leftBtnTarget, leftBtnRepl);
  }
  if (code.includes(rightBtnTarget)) {
    code = code.replace(rightBtnTarget, rightBtnRepl);
  }

  // 2. Update grid to 5 columns on lg+ screens for both home and products
  const gridTarget = 'className:n?`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6`:`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6`';
  const gridRepl = 'className:n?`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5`:`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5`';

  if (code.includes(gridTarget)) {
    code = code.replace(gridTarget, gridRepl);
    console.log(`Updated grid in ${f}`);
  }

  // Validate syntax
  try {
    const pOStart = code.indexOf('function pO({');
    const pOEnd = code.indexOf('function mO(', pOStart);
    const snippet = code.slice(pOStart, pOEnd);
    acorn.parse(snippet, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`pO syntax valid for ${f}`);
    fs.writeFileSync(f, code, 'utf8');
    console.log(`Updated ${f}`);
  } catch (err) {
    console.error(`Acorn parse error in ${f}:`, err.message);
    process.exit(1);
  }
});
