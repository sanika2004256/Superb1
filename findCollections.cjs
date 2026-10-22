const fs = require('fs');
const content = fs.readFileSync('assets/' + fs.readdirSync('assets').find(f => f.startsWith('index') && f.endsWith('.js')), 'utf8');
const matches = content.match(/collection\([a-zA-Z0-9_]+,\s*['"]([^'"]+)['"]/g);
console.log([...new Set(matches)]);
