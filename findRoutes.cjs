const fs = require('fs');
const code = fs.readFileSync('./assets/index-v29-1790684309157.js', 'utf8');

for (const route of ['/contact', '/blogs']) {
  let pos = 0;
  console.log('=== ROUTE:', route, '===');
  while ((pos = code.indexOf(route, pos)) !== -1) {
    console.log(code.substring(Math.max(0, pos - 60), Math.min(code.length, pos + 100)));
    pos += route.length + 1;
  }
}
