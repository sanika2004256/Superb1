const fs = require('fs');
const acorn = require('acorn');

const files = [
  'public/assets/index-v29-1790684309157.js',
  'assets/index-v29-1790684309157.js'
];

files.forEach(f => {
  let code = fs.readFileSync(f, 'utf8');
  const target = ',(0,k.jsxs)(`div`,{className:`hidden`,children:[(0,k.jsxs)(T,{to:n.primaryCta.link';
  const replacement = ',(0,k.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3`,children:[(0,k.jsxs)(T,{to:n.primaryCta.link';

  if (!code.includes(target)) {
    console.error(`Target not found in ${f}`);
    return;
  }

  code = code.replace(target, replacement);

  // Validate syntax
  try {
    const tOStart = code.indexOf('function tO({onOpenEnquiry:e}){');
    const tOEnd = code.indexOf('function nO(', tOStart);
    const snippet = code.slice(tOStart, tOEnd);
    acorn.parse(snippet, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Hero syntax valid for ${f}`);
    fs.writeFileSync(f, code, 'utf8');
    console.log(`Updated ${f}`);
  } catch (err) {
    console.error(`Acorn parse error in ${f}:`, err.message);
    process.exit(1);
  }
});
