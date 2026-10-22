const fs = require('fs');
const acorn = require('acorn');

const files = ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js'];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  const target = '(0,k.jsx)(`span`,{className:`card-label-short`,children:item.shortLabel||item.label})';
  const repl = '(0,k.jsx)(`span`,{className:`card-label-short`,children:item.key===`front`?`Front`:item.key===`back`?`Back`:`Box`})';

  if (!content.includes(target)) {
    console.error('Target not found in ' + f);
    process.exit(1);
  }
  content = content.replace(target, repl);
  acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
  fs.writeFileSync(f, content, 'utf8');
  console.log('Successfully updated ' + f);
}
console.log('Done!');
