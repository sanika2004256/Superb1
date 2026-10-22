const fs = require('fs');
const acorn = require('acorn');

const files = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

const target = '(0,k.jsx)(CO,{isHomePage:!0}),';

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');

  if (!content.includes(target)) {
    console.log(`Target not found in ${f}`);
    continue;
  }

  // Backup file
  fs.writeFileSync(`${f}.bak_before_remove_gallery_${Date.now()}`, content);

  content = content.replace(target, '');

  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Acorn validation passed for ${f}!`);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Successfully removed gallery from home page in ${f}`);
  } catch (err) {
    console.error(`Syntax error in ${f}:`, err);
    process.exit(1);
  }
}
