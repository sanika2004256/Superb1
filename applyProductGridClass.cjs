const fs = require('fs');
const acorn = require('acorn');

const files = [
  'public/assets/index-v29-1790684309157.js',
  'assets/index-v29-1790684309157.js'
];

files.forEach(f => {
  let code = fs.readFileSync(f, 'utf8');

  const target = 'className:n?`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5`:`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5`';
  const repl = 'className:`products-grid-5`';

  if (!code.includes(target)) {
    console.error(`Target not found in ${f}`);
    return;
  }

  code = code.replace(target, repl);

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
